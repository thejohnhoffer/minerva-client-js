global.fetch = require('node-fetch')
global.navigator = {};
const { CognitoUserPool,
         CognitoUserAttribute,
         CognitoUser,
         AuthenticationDetails } = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk');
const fs = require('fs');
const { Client } = require('./index');

const email = 'dpwrussell@gmail.com';
const password = 'g58!Zz&eGH';

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

const client = new Client(
  'us-east-1_d9h9zgWpx',
  '5m75aiie05v28astdpu2noap6m',
  'https://5yatimj9u4.execute-api.us-east-1.amazonaws.com/dev'
);

client.authenticate('dpwrussell@gmail.com', 'g58!Zz&eGH');

// Get an image
const imageUuid = 'c3c2fbfc-0881-40ed-ba0e-bb31ae5ef80c';
const imageDimensions = client.getImageDimensions(imageUuid);

const id = 8;

// Create group
const group = client.createGroup({
  'name': 'Group' + id
})
  .then(printRet('Create Group'))
  .catch(errExit('Create Group'));

// Get membership
const membership = group
  .then(data => {
    return client.getMembership(data['uuid'],
                                '5d948445-b44b-4b2b-ac46-ce2528d56c88');
  })
  .then(printRet('Get Membership'))
  .catch(errExit('Get Membership'));

// Update current user to be a member, not an owner
const update_membership = membership
  .then(data => {
    return client.updateMembership(data['group_uuid'],
                                   data['user_uuid'],
                                   {membership_type:'Member'});
  })
  .then(printRet('Update Membership'))
  .catch(errExit('Update Membership'));

// Remove current user from this group
const delete_membership = update_membership
  .then(data => {
    return client.deleteMembership(data['group_uuid'],
                                   data['user_uuid']);
  })
  .then(printRet('Delete Membership'))
  .catch(errExit('Delete Membership'));
