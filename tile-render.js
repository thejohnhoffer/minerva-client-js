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

const printRet = label => data => {
  console.log('=== ' + label + ' ===');
  console.log(data);
  console.log();
  return data;
};

const client = new Client(
  'us-east-1_d9h9zgWpx',
  '5m75aiie05v28astdpu2noap6m',
  'https://5yatimj9u4.execute-api.us-east-1.amazonaws.com/dev'
);

client.authenticate('dpwrussell@gmail.com', 'g58!Zz&eGH');

// Get an image
const imageUuid = 'c3c2fbfc-0881-40ed-ba0e-bb31ae5ef80c';
const imageDimensions = client.getImageDimensions(imageUuid);

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
  .then(printRet('Render a Tile'))
  .then(body => {
    const wstream = fs.createWriteStream('test.png');
    body.on('data', chunk => {
         wstream.write(chunk);
      }).on('end', () => {
         wstream.end();
      });
  });
