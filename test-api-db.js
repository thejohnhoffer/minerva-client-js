global.fetch = require('node-fetch')
global.navigator = {};
const { CognitoUserPool,
         CognitoUserAttribute,
         CognitoUser,
         AuthenticationDetails } = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk');
const fs = require('fs');
const { Client } = require('./index');

// const poolData = {
//     UserPoolId : 'us-east-1_d9h9zgWpx',
//     ClientId : '5m75aiie05v28astdpu2noap6m'
// };
//
// const userPool = new CognitoUserPool(poolData);
//
// const authenticateUser = (cognitoUser, authenticationDetails) => {
//   return new Promise((resolve, reject) => {
//     cognitoUser.authenticateUser(authenticationDetails, {
//       onSuccess: result => resolve(result),
//       onFailure: err => reject(err),
//       mfaRequired: codeDeliveryDetails => reject(codeDeliveryDetails),
//       newPasswordRequired: (fields, required) => reject({fields, required})
//     });
//   });
// };
//
// const setCredentials = token => {
//   return new Promise((resolve, reject) => {
//     // // const token = result.getAccessToken().getJwtToken();
//     // // const token = result.getIdToken().getJwtToken();
//     // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     //   IdentityPoolId: 'us-east-1:615f48bb-613f-46de-98b0-6e0b84f707f6',
//     //   Logins: {
//     //     'cognito-idp.us-east-1.amazonaws.com/us-east-1_d9h9zgWpx': token
//     //   }
//     // });
//     // AWS.config.region = 'us-east-1';
//     // // TODO Test to see if this was sucessful and reject if not?
//     //
//     // // Wait for credentials to be configured
//     // AWS.config.credentials.get(err => err ? reject(err) : resolve(token));
//     resolve(token);
//   });
// };
//
// const base = 'https://5yatimj9u4.execute-api.us-east-1.amazonaws.com/dev';
// const doFetch = (method, route, token, params=null, body=null) => {
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: token
//   };
//
//   let url = base + route;
//
//   if (params !== null) {
//     const queryParams = Object.keys(params)
//       .map(key => key + '=' + params[key])
//       .join('&');
//     if (queryParams.length > 0) {
//       url += '?' + queryParams
//     }
//   }
//
//   const args = {
//     method,
//     headers,
//     mode: 'cors',
//     cache: 'no-cache'
//   };
//
//   if (body !== null) {
//     args['body'] = JSON.stringify(body)
//   }
//
//   return fetch(url, args)
//     .then(response => {
//       console.log(response.status)
//       return response;
//     })
//     .then(response => {
//       if (response.status != 204) {
//         return response.json();
//       }
//       return {};
//     })
//     .then(data => {
//       console.log(JSON.stringify(data));
//       return data;
//     });
// };
//
// const doFetchBinary = (method, route, token, params=null, body=null) => {
//   const headers = {
//     'Content-Type': 'application/json',
//     'Accept': 'image/png',
//     Authorization: token
//   };
//
//   let url = base + route;
//
//   if (params !== null) {
//     const queryParams = Object.keys(params)
//       .map(key => key + '=' + params[key])
//       .join('&');
//     if (queryParams.length > 0) {
//       url += '?' + queryParams
//     }
//   }
//
//   const args = {
//     method,
//     headers,
//     mode: 'cors',
//     cache: 'no-cache'
//   };
//
//   if (body !== null) {
//     args['body'] = JSON.stringify(body)
//   }
//
//   return fetch(url, args)
//     .then(response => {
//       console.log(response.status)
//       return response;
//     })
//     .then(response => {
//       if (response.status != 204) {
//         const wstream = fs.createWriteStream('test.png');
//         response.body.on('data', chunk => {
//            wstream.write(chunk);
//            // console.log(chunk);
//         }).on('end', () => {
//            wstream.end();
//            // console.log('END');
//         })
//
//         return {};
//       }
//       return {};
//     });
// };
//
// const userData = {
//     Username : email,
//     Pool : userPool
// };
//
// const authenticationData = {
//   Username : email,
//   Password : password,
// };
//
// const cognitoUser = new CognitoUser(userData);
// const authenticationDetails = new AuthenticationDetails(authenticationData);
//
// // Authenticate
// const authenticated = authenticateUser(cognitoUser, authenticationDetails);
//
// // const id = new Date().getTime();
//
// const token = authenticated
//   .then(response => response.getIdToken().getJwtToken())
//   .then(setCredentials);

// const email = 'dpwrussell@gmail.com';
// const password = 'g58!Zz&eGH';
//
// const poolData = {
//     UserPoolId : 'us-east-1_d9h9zgWpx',
//     ClientId : '5m75aiie05v28astdpu2noap6m'
// };

// Utility function to print results and pass along the data
const printRet = label => data => {
  console.log('=== ' + label + ' ===');
  console.log(data);
  console.log();
  return data;
};

const errExit = label => data => {
  console.error('EEE ' + label + ' EEE');
  console.error(data);
  console.error();
  process.exit();
}

const id = 1104;

const client = new Client(
  'us-east-1_d9h9zgWpx',
  '5m75aiie05v28astdpu2noap6m',
  'https://5yatimj9u4.execute-api.us-east-1.amazonaws.com/dev'
);

client.authenticate('dpwrussell@gmail.com', 'g58!Zz&eGH')
  .catch(errExit('Authenticating'));

// Create repository
const repository = client.createRepository({
  'name': 'Repository' + id,
  'raw_storage': 'Destroy'
})
  .then(printRet('Create Repository'))
  .catch(errExit('Create Repository'));

// Update repository name
// const updatedRepository = repository
//   .then(data => {
//     return client.updateRepository(
//       data['uuid'], {'name': data['name'] + '2'}
//     );
//   });

// updatedRepository
//   .then(data => {
//     return client.getRepository(data['uuid']);
//   }).then(printRet('Update Repository'));



// client.listRepositories()
//   .then(repos => {
//     console.log(repos);
//     // for (let repo of repos) {
//     //   console.log(repo);
//     // }
//   });

// Create an import
const import_ = repository
  .then(data => {
    return client.createImport({
      'name': 'Import' + id,
      'repository_uuid': data['uuid']
    });
  })
  .then(printRet('Create Import'))
  .catch(errExit('Create Import'));

// List imports in repository
Promise.all([repository, import_])
  .then(([data]) => {
    return client.listImportsInRepository(data['uuid']);
  })
  .then(printRet('List Imports in Repository'))
  .catch(errExit('List Imports in Repository'));

// Get the import credentials
const importCredentials = import_
  .then(data => {
    return client.getImportCredentials(data['uuid']);
  })
  .then(printRet('Get Import Credentials'))
  .catch(errExit('Get Import Credentials'));

// Use the temporary credentials to upload a file
const importUpload = importCredentials
  .then(data => {
    const credentials = new AWS.Credentials(
      data['credentials']['AccessKeyId'],
      data['credentials']['SecretAccessKey'],
      data['credentials']['SessionToken']
    );
    const s3 = new AWS.S3({
      credentials
    });
    const r = /^s3:\/\/([A-z0-9\-]+)\/([A-z0-9\-]+\/)$/;
    const m = r.exec(data['url'])
    const bucket = m[1];
    const prefix = m[2];

    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(
        '/Users/dpwrussell/Downloads/TestData/minerva/rcpnl/TONSIL-Scan_20160628_093314_01x4x00030.rcpnl'
      );
      fileStream.on('error', reject);

      s3.putObject(
        {
          Body: fileStream,
          Bucket: bucket,
          Key: prefix + 'rcpnl/TONSIL-Scan_20160628_093314_01x4x00030.rcpnl'
        },
        (err, data) => err ? reject(err) : resolve(data)
      );
    });
  })
  .then(printRet('Upload file'))
  .catch(errExit('Upload file'));

// Use the temporary credentials to list the import prefix
const importContents = Promise.all([importCredentials, importUpload])
  .then(([data]) => {
    const credentials = new AWS.Credentials(
      data['credentials']['AccessKeyId'],
      data['credentials']['SecretAccessKey'],
      data['credentials']['SessionToken']
    );
    const s3 = new AWS.S3({
      credentials
    });
    const r = /^s3:\/\/([A-z0-9\-]+)\/([A-z0-9\-]+\/)$/;
    const m = r.exec(data['url'])
    const bucket = m[1];
    const prefix = m[2];
    return new Promise((resolve, reject) => {
      s3.listObjectsV2(
        {
          Bucket: bucket,
          Prefix: prefix
        },
        (err, data) => err ? reject(err) : resolve(data)
      );
    });

  })
  .then(printRet('List Import Bucket'))
  .catch(errExit('List Import Bucket'));

// Set the import complete
const importComplete = Promise.all([import_, importUpload])
  .then(([data]) => {
    return client.updateImport(data['uuid'], {'complete': true});
  })
  .then(printRet('Set Import Complete'));

// Wait for the import to have a BFU
const bfu = Promise.all([import_, importComplete])
  .then(([data]) => {
    return new Promise((resolve, reject) => {
      const wait_for_a_bfu = () => {
        client.listBFUsInImport(data['uuid'])
          .then(data => {
            if (data.length > 0 && data[0]['complete'] === true) {
              resolve(data[0]);
            } else {
              setTimeout(wait_for_a_bfu, 30000);
            }
          });
      };
      wait_for_a_bfu();
    });
  });

// Get an image associated with the BFU
const image = bfu
  .then(data => {
    return client.listImagesInBFU(data['uuid'])
  })
  .then(data => data[0])
  .then(printRet*('Get Image'))
  .catch(errExit('Get Image'));

// Get the image credentials
const imageCredentials = image
  .then(data => {
    return client.getImageCredentials(data['uuid']);
  })
  .then(printRet('Get Image Credentials'))
  .catch(errExit('Get Image Credentials'));

const imageDimensions = image
  .then(data => {
    return client.getImageDimensions(data['uuid']);
  })
  .then(printRet('Get Image Dimensions'))
  .catch(errExit('Get Image Dimensions'));

// Render a tile
const renderedTile = imageDimensions
  .then(data => {
    return client.getImageTileRendered(data['image']['uuid'], {
      x: 0,
      y: 0,
      z: 0,
      t: 0,
      level: 0,
      channels: [
        { id: 0, color: 123456, min: 0.05, max: 0.2 },
        { id: 1, color: 234567, min: 0.05, max: 0.2 }
      ]
    });
  })
  .then(body => {
    const wstream = fs.createWriteStream('test.png');
    body.on('data', chunk => {
         wstream.write(chunk);
      }).on('end', () => {
         wstream.end();
      });
  });

  // // Use the temporary credentials to download the metadata and some tiles
  // const bfu_download = Promise.all([token, imageCredentials])
  //   .then(([token, imageCredentials]) => {
  //     const credentials = new AWS.Credentials(
  //       imageCredentials['credentials']['AccessKeyId'],
  //       imageCredentials['credentials']['SecretAccessKey'],
  //       imageCredentials['credentials']['SessionToken']
  //     );
  //     const s3 = new AWS.S3({
  //       credentials
  //     });
  //     const r = /^s3:\/\/([A-z0-9\-]+)\/([A-z0-9\-]+\/)$/;
  //     const m = r.exec(imageCredentials['bfu_url'])
  //     const bucket = m[1];
  //     const prefix = m[2];
  //
  //     return new Promise((resolve, reject) => {
  //
  //       const fileStream = fs.createWriteStream('metadata.xml');
  //       s3.getObject(
  //         {
  //           Bucket: bucket,
  //           Key: prefix + 'metadata.xml'
  //         }
  //       ).createReadStream().pipe(fileStream);
  //     });
  //   });
  //   // .then(data => console.log(data));

// Create a group
// const group = Promise.all([token, { name: 'Group_' + id }])
//   .then(doFetchBody('POST', '/group'));
//
// // Get the group
// Promise.all([
//   token,
//   group.then(data => data.uuid)
// ])
//   .then(doFetchId('GET', '/group'));



// // Create a repository
// const repository = token
//   .then(token => {
//     return doFetch('POST', '/repository/', token, null,
//                    {
//                      name:  'Repository' + id,
//                      raw_storage: 'Archive'
//                    })
//   });
//
// // Update a repository
// // const repository_updated = Promise.all([token, repository])
// //   .then(([token, repository]) => {
// //     return doFetch('PUT', '/repository/' + repository['uuid'], token, null,
// //                    {
// //                      name: repository['name'] + '-renamed',
// //                      raw_storage: 'Destroy'
// //                    })
// //   });
//
// // // Delete a repository
// // const repository_deleted = Promise.all([token, repository_updated])
// //   .then(([token, repository]) => {
// //     return doFetch('DELETE', '/repository/' + repository['uuid'], token, null,
// //                    null)
// //   });
// //
// // // Try and get deleted repository
// // const repository_got = Promise.all([token, repository_updated,
// //                                     repository_deleted])
// //   .then(([token, repository]) => {
// //     return doFetch('GET', '/repository/' + repository['uuid'], token, null,
// //                    null)
// //   })
// //   // Exit to test this works
// //   .then(() => {
// //     process.exit(1);
// //   });
//
// // Create an import
// const import_ = Promise.all([token, repository])
//   .then(([token, repository]) => {
//     return doFetch('POST', '/import/', token, null,
//                    {
//                      name:  'Import' + id,
//                      repository_uuid: repository['uuid']
//                    })
//   });
//
// // get the import credentials
// const importCredentials = Promise.all([token, import_])
//   .then(([token, import_]) => {
//     return doFetch('GET', '/import/' + import_['uuid'] + '/credentials',
//                    token)
//   });
//
// // Use the temporary credentials to upload a file
// const importUpload = Promise.all([token, importCredentials])
//   .then(([token, importCredentials]) => {
//     const credentials = new AWS.Credentials(
//       importCredentials['credentials']['AccessKeyId'],
//       importCredentials['credentials']['SecretAccessKey'],
//       importCredentials['credentials']['SessionToken']
//     );
//     const s3 = new AWS.S3({
//       credentials
//     });
//     const r = /^s3:\/\/([A-z0-9\-]+)\/([A-z0-9\-]+\/)$/;
//     const m = r.exec(importCredentials['url'])
//     const bucket = m[1];
//     const prefix = m[2];
//
//     return new Promise((resolve, reject) => {
//       const fileStream = fs.createReadStream(
//         '/Users/dpwrussell/Downloads/TestData/minerva/rcpnl/TONSIL-Scan_20160628_093314_01x4x00030.rcpnl'
//       );
//       fileStream.on('error', reject);
//
//       s3.putObject(
//         {
//           Body: fileStream,
//           Bucket: bucket,
//           Key: prefix + 'rcpnl/TONSIL-Scan_20160628_093314_01x4x00030.rcpnl'
//         },
//         (err, data) => err ? reject(err) : resolve(data)
//       );
//     });
//   })
//   .then(data => console.log(data));
//
// // Use the temporary credentials to list the import prefix
// const importContents = Promise.all([token, importCredentials, importUpload])
//   .then(([token, importCredentials]) => {
//     const credentials = new AWS.Credentials(
//       importCredentials['credentials']['AccessKeyId'],
//       importCredentials['credentials']['SecretAccessKey'],
//       importCredentials['credentials']['SessionToken']
//     );
//     const s3 = new AWS.S3({
//       credentials
//     });
//     const r = /^s3:\/\/([A-z0-9\-]+)\/([A-z0-9\-]+\/)$/;
//     const m = r.exec(importCredentials['url'])
//     const bucket = m[1];
//     const prefix = m[2];
//     return new Promise((resolve, reject) => {
//       s3.listObjectsV2(
//         {
//           Bucket: bucket,
//           Prefix: prefix
//         },
//         (err, data) => err ? reject(err) : resolve(data)
//       );
//     });
//
//   })
//   .then(data => console.log(data));
//
// // Set the import complete
// const importComplete = Promise.all([token, import_, importContents])
//   .then(([token, import_]) => {
//     return doFetch('PUT', '/import/' + import_['uuid'] + '/complete', token);
//   });
//
// // Wait for the import to have a BFU
// const bfu = Promise.all([token, import_, importComplete])
//   .then(([token, import_]) => {
//     return new Promise((resolve, reject) => {
//       const wait_for_a_bfu = () => {
//         doFetch('GET', '/import/' + import_['uuid'] + '/bfus', token)
//           .then(data => {
//             if (data.length > 0 && data[0]['complete'] === true) {
//               resolve(data[0]);
//             } else {
//               setTimeout(wait_for_a_bfu, 30000);
//             }
//           });
//       };
//       wait_for_a_bfu();
//     });
//   });
//
// // Get an image associated with the BFU
// const image = Promise.all([token, bfu])
//   .then(([token, bfu]) => {
//     return doFetch('GET', '/bfu/' + bfu['uuid'] + '/images',
//                    token)
//       .then(data => data[0]);
//   });
//
// // Get the image credentials
// const imageCredentials = Promise.all([token, image])
//   .then(([token, image]) => {
//     return doFetch('GET', '/image/' + image['uuid'] + '/credentials',
//                    token)
//   });
//
// const imageDimensions = Promise.all([token, image])
//   .then(([token, image]) => {
//     return doFetch('GET', '/image/' + image['uuid'] + '/dimensions',
//                    token)
//   });
//
// // Use the temporary credentials to download the metadata and some tiles
// const bfu_download = Promise.all([token, imageCredentials])
//   .then(([token, imageCredentials]) => {
//     const credentials = new AWS.Credentials(
//       imageCredentials['credentials']['AccessKeyId'],
//       imageCredentials['credentials']['SecretAccessKey'],
//       imageCredentials['credentials']['SessionToken']
//     );
//     const s3 = new AWS.S3({
//       credentials
//     });
//     const r = /^s3:\/\/([A-z0-9\-]+)\/([A-z0-9\-]+\/)$/;
//     const m = r.exec(imageCredentials['bfu_url'])
//     const bucket = m[1];
//     const prefix = m[2];
//
//     return new Promise((resolve, reject) => {
//
//       const fileStream = fs.createWriteStream('metadata.xml');
//       s3.getObject(
//         {
//           Bucket: bucket,
//           Key: prefix + 'metadata.xml'
//         }
//       ).createReadStream().pipe(fileStream);
//     });
//   });
//   // .then(data => console.log(data));

// Render a tile
// const existing_image = {
//   uuid: '0004e5ba-02c0-4761-b8e4-8ae5454d32ee'
// }
// const rendered_tile = Promise.all([token, existing_image])
//   .then(([token, existing_image]) => {
//     return doFetchBinary('GET', '/image/' + existing_image['uuid'] + '/render-tile/0/0/0/0/0/0,123456,0.05,0.2/1,234567,0.05,0.2',
//                    token)
//       .then(() => {
//         console.log("DONE");
//       })
//   });

// // Use the temporary credentials to download the metadata and some tiles
// const bfu_download = Promise.all([token, imageCredentials])
//   .then(([token, imageCredentials]) => {
//     const credentials = new AWS.Credentials(
//       imageCredentials['credentials']['AccessKeyId'],
//       imageCredentials['credentials']['SecretAccessKey'],
//       imageCredentials['credentials']['SessionToken']
//     );
//     const s3 = new AWS.S3({
//       credentials
//     });
//     const r = /^s3:\/\/([A-z0-9\-]+)\/([A-z0-9\-]+\/)$/;
//     const m = r.exec(imageCredentials['bfu_url'])
//     const bucket = m[1];
//     const prefix = m[2];
//
//     return new Promise((resolve, reject) => {
//
//       const fileStream = fs.createWriteStream('metadata.xml');
//       s3.getObject({
//         Bucket: bucket,
//         Key: prefix + 'metadata.xml'
//       }).createReadStream().pipe(fileStream);
//
//     });
//   })
//   .then(data => console.log(data));

// bfu
//   .then((data) => {
//     console.log('BFU');
//     console.log(data)
//   })

// Wait for that BFU to be complete

// const import_keys = Promise.all([token, 'bf64b0ce-633f-437b-bbcb-e8578850f5d1'])
//   .then(([token, import_uuid]) => {
//     return doFetch('GET', '/import/' + import_uuid + '/keys',
//                    token)
//   });

// // Set the import complete
// const import_uuid = '72b75611-9b87-45f8-a031-0e50c965d306';
// // const import_ = token
// //   .then(token => {
// //     return doFetch('GET', '/import/' + import_uuid,
// //                    token)
// //   });
// const import_ = token
//   .then(token => {
//     return doFetch('PUT', '/import/' + import_uuid + '/complete',
//                    token)
//   });


// Get some of the dummy data for a given ID
// Get the repository
// const repository = token
//   .then(token => {
//     return doFetch('GET', '/repository/ca6a8081-438a-4a80-b2c2-f58a2c58524a',
//                    token)
//   });
//
// const imports = Promise.all([token, repository])
//   .then(([token, repository]) => {
//     return doFetch('GET', '/repository/' + repository['uuid'] + '/imports',
//                    token)
//   });
//
// const import_keys = Promise.all([token, imports])
//   .then(([token, imports]) => {
//     return doFetch('GET', '/import/' + imports[0]['uuid'] + '/keys',
//                    token)
//   });
//
// const bfus = Promise.all([token, imports])
//   .then(([token, imports]) => {
//     return doFetch('GET', '/import/' + imports[0]['uuid'] + '/bfus',
//                    token)
//   });
//
// const bfu_keys = Promise.all([token, bfus])
//   .then(([token, bfus]) => {
//     return doFetch('GET', '/bfu/' + bfus[0]['uuid'] + '/keys',
//                    token)
//   });
//
// const images = Promise.all([token, bfus])
//   .then(([token, bfus]) => {
//     return doFetch('GET', '/bfu/' + bfus[0]['uuid'] + '/images',
//                    token)
//   });
//
// const imageCredentials = Promise.all([token, images])
//   .then(([token, images]) => {
//     return doFetch('GET', '/image/' + images[0]['uuid'] + '/credentials',
//                    token)
//   });

// const group = Promise.all([
//   token,
//   group_id.then(data => ({
//     name: 'Repository_' + id,
//     user_uuid: ''
//   }))
//
// ])
//   .then(doFetch('POST', '/repository'));
