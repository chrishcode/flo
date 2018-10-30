const functions = require('firebase-functions');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('../lib/files');
const inquirer = require('../lib/inquirer');
const touch = require("touch");
var fs = require('fs'); //https://node.readthedocs.io/en/latest/api/fs/

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

clear();
console.log(chalk.hex('#F50064')
  (figlet.textSync('flo', {
    font: 'Blocks',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  })
  )
);

const run = async () => {
  const componentsToScaffold = await inquirer.askWhatComponentsToScaffold();

  if(componentsToScaffold) {
    for (var i = 0; i < componentsToScaffold.length; i++) {
      console.log(componentsToScaffold[i]);
    }
  }
}

run();
