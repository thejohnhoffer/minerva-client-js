global.fetch = require('node-fetch')
global.navigator = {};
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

// 2: Create user pool for use in the application
var poolData = {
    UserPoolId : 'us-east-1_d9h9zgWpx',
    ClientId : '5m75aiie05v28astdpu2noap6m'
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var userData = {
    Username : '5d948445-b44b-4b2b-ac46-ce2528d56c88',
    Pool : userPool
};

// 3: User Sign up
// var attributeList = [];
//
// var dataEmail = {
//     Name : 'email',
//     Value : '...' // your email here
// };
// var dataPhoneNumber = {
//     Name : 'phone_number',
//     Value : '...' // your phone number here with +country code and no delimiters in front
// };
// var attributeEmail =
// new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
// var attributePhoneNumber =
// new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);
//
// attributeList.push(attributeEmail);
// attributeList.push(attributePhoneNumber);
//
// var cognitoUser;
// userPool.signUp('username', 'password', attributeList, null, function(err, result){
//     if (err) {
//         alert(err);
//         return;
//     }
//     cognitoUser = result.user;
//     console.log('user name is ' + cognitoUser.getUsername());
// });

// 3b: Manually build user
// var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
// var confirmationCode = '123456';
// var newPassword = '********';
// // Reset forgotten password
// var callback = {
//     onSuccess: function (result) {
//         console.log('call result: ' + result);
//     },
//     onFailure: function(err) {
//         console.error(err);
//     }
// };
// cognitoUser.confirmPassword(confirmationCode, newPassword, callback);


// 4: Confirm User user
// cognitoUser.confirmRegistration('123456', true, function(err, result) {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('call result: ' + result);
// });

// 5: Sign a user into the application
var authenticationData = {
  Username : 'dpwrussell@gmail.com',
  Password : 'g58!Zz&eGH',
};

var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
var authenticationDetails =
  new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
var verificationCode = null;

// cognitoUser.authenticateUser(authenticationDetails, {
//   onSuccess: function (result) {
//     // console.log('Success')
//     console.log('access token + ' + result.getAccessToken().getJwtToken());
//   },
//
//   onFailure: function(err) {
//     // console.log(new Error().stack);
//     console.error(err);
//   },
//   mfaRequired: function(codeDeliveryDetails) {
//     console.log('MFA verification code required');
//     return;
//     // cognitoUser.sendMFACode(verificationCode, this);
//   },
//   newPasswordRequired: function(fields, required) {
//     console.log('New Password Required');
//     console.log(fields);
//     console.log(required);
//     return;
//   }
// });



// const p = new Promise((resolve, reject) => {
//   resolve('test');
// });

// makeP('test2', 'test3')
//   .then(x => { console.log(x); });

// const callbackMapper = fn => (...fnArgs) => new Promise((resolve, reject)) => {
//   fn(...fnArgs, {
//     onSuccess: (...cbArgs) => resolve(cbArgs),
//     onFailure: (...cbArgs) => reject(cbArgs),
//     mfaRequired: (...cbArgs) => resolve(cbArgs),
//     newPasswordRequired: (...cbArgs) => resolve(cbArgs)
//   });
// };
//
// const authenticateUser = callbackMapper(cognitoUser.authenticateUser);

// const makeP = arg => {
//   return new Promise((resolve, reject) => {
//     resolve(arg);
//   });
// };
//
// const authenticateUser = authenticationDetails => {
//   return new Promise((resolve, reject) => {
//     cognitoUser.authenticateUser(authenticationDetails, {
//       onSuccess: result => resolve(result),
//       onFailure: err => reject(err),
//       mfaRequired: codeDeliveryDetails => resolve(codeDeliveryDetails),
//       newPasswordRequired: (fields, required) => resolve({fields, required})
//     });
//   });
// };
//
// const getUserAttributes = () => {
//   return new Promise((resolve, reject) => {
//
//   });
// };
//
// authenticateUser(authenticationDetails)
//   .then(session => {
//     cognitoUser.getUserAttributes()
//   })


cognitoUser.authenticateUser(
  authenticationDetails,
  {
    onSuccess: result => {
      console.log('access token + ' + result.getAccessToken().getJwtToken());
      cognitoUser.getUserAttributes(
        // {
        //   onSuccess: attrs => {
        //     console.log(attrs);
        //   },
        //   onFailure: err => {
        //     console.err(err);
        //   }
        // }
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log(result);
          }
        }
      );
    },
    onFailure: err => { console.error(err); },
    mfaRequired: codeDeliveryDetails => { console.log('MFA verification code required'); },
    newPasswordRequired: (fields, required) => {
      console.log('New Password Required');
      console.log(fields);
      console.log(required);
    }
  }
);
console.log('AFTER');
