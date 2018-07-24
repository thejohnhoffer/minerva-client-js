const { CognitoUserPool,
         CognitoUserAttribute,
         CognitoUser,
         AuthenticationDetails } = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk');

// Authenticate
function authenticateUser(cognitoUser, authenticationDetails) {
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => resolve(result),
      onFailure: err => reject(err),
      mfaRequired: codeDeliveryDetails => reject(codeDeliveryDetails),
      newPasswordRequired: (fields, required) => reject({fields, required})
    });
  });
};

class Client {
  constructor(cognitoUserPoolId, clientId, baseUrl) {
    this.cognitoUserPool = new CognitoUserPool({
      UserPoolId : cognitoUserPoolId,
      ClientId : clientId
    });
    this.baseUrl = baseUrl;
  }

  authenticate(username, password) {

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.cognitoUserPool
    });

    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password
    });

    this._token = authenticateUser(cognitoUser, authenticationDetails)
      .then(response => response.getIdToken().getJwtToken());
      // Could setCredentials here if that is useful
      // .then(setCredentials);

    return this._token;
  }

  // Fetch
  apiFetch(method, route, params=null, body=null, accept_png=false) {

    return this.token
      .then(token => {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': token
        };

        if (accept_png) {
          headers['Accept'] = 'image/png'
        }

        let url = this.baseUrl + route;

        if (params !== null) {
          const queryParams = Object.keys(params)
            .map(key => key + '=' + params[key])
            .join('&');
          if (queryParams.length > 0) {
            url += '?' + queryParams
          }
        }

        const args = {
          method,
          headers,
          mode: 'cors',
          cache: 'no-cache'
        };

        if (body !== null) {
          args['body'] = JSON.stringify(body)
        }

        return fetch(url, args)
          .then(response => {

            // Turn HTTP error responses into rejected promises
            if (!response.ok) {
              return response.text()
                .then(text => {
                  return Promise.reject('Error' + response.status + ' ('
                                        + response.statusText + '): ' + text);
                });
            }

            if (accept_png) {
              return response.body;
            } else {
              return (response.status !== 204) ? response.json() : {};
            }
          });
      });
  }

  get token() {
    // TODO Handle unauthenticated or expired token
    return this._token;
  }

  createGroup(data) {
    return this.apiFetch('POST', '/group', null, data);
  }

  getGroup(uuid) {
    return this.apiFetch('GET', '/group' + uuid, null, null);
  }

  // Create a repository
  createRepository(data) {
    return this.apiFetch('POST', '/repository', null, data);
  }

  // List repositories
  listRepositories() {
    return this.apiFetch('GET', '/repository', null, null);
  }

  // Get repository
  getRepository(uuid) {
    return this.apiFetch('GET', '/repository/' + uuid, null, null);
  }

  // Update repository
  updateRepository(uuid, data) {
    return this.apiFetch('PUT', '/repository/' + uuid, null, data);
  }

  // Delete repository
  deleteRepository(uuid) {
    return this.apiFetch('DELETE', '/repository/' + uuid, null, null);
  }

  // Create import
  createImport(data) {
    return this.apiFetch('POST', '/import', null, data);
  }

  // List imports for a repository
  listImportsInRepository(uuid) {
    return this.apiFetch('GET', '/repository/' + uuid + '/imports', null, null);
  }

  // Get import
  getImport(uuid) {
    return this.apiFetch('GET', '/import/' + uuid, null, null);
  }

  // Get import credentials
  getImportCredentials(uuid) {
    return this.apiFetch('GET', '/import/' + uuid + '/credentials', null, null);
  }

  // Import update
  // TODO Replace setImportComplete with this
  updateImport(uuid, data) {
    return this.apiFetch('PUT', '/import/' + uuid, null, data);
  }

  // List BFUS in Import
  listBFUsInImport(uuid) {
    return this.apiFetch('GET', '/import/' + uuid + '/bfus', null, null);
  }

  // List keys in BFU
  listKeysInBFU(uuid) {
    return this.apiFetch('GET', '/bfu/' + uuid + '/keys', null, null);
  }

  // List images for a BFU
  listImagesInBFU(uuid) {
    return this.apiFetch('GET', '/bfu/' + uuid + '/images', null, null);
  }

  // Get Image
  getImageCredentials(uuid) {
    return this.apiFetch('GET', '/image/' + uuid, null, null);
  }

  // Get Image credentials
  getImageDimensions(uuid) {
    return this.apiFetch('GET', '/image/' + uuid + '/dimensions', null, null);
  }

  // Get rendered tile
  getImageTileRendered(uuid, data) {
    const { x, y, z, t, level, channels } = data;
    const channelPathParams = channels.map(channel => {
      return channel['id'] + ',' + channel['color'] + ',' + channel['min']
        + ',' + channel['max'];
    }).join('/');
    return this.apiFetch(
      'GET',
      '/image/' + uuid + '/render-tile/' + x + '/' + y + '/' + z + '/' + t
        + '/' + level + '/' + channelPathParams,
      null,
      null,
      true
    );
  }

}

module.exports = {
  Client
}