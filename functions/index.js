#!/usr/bin/env node
const functions = require('firebase-functions');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const fs = require('fs');
const request = require('request');

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
  }))
);

function askWhatComponentsToScaffold() {
  const questions = [
    {
      type: 'list',
      name: 'framework',
      message: 'What javascript framework are you using?',
      choices: ['React']
    },
    {
      type: 'list',
      name: 'componentToScaffold',
      message: 'What component do you want to scaffold?',
      choices: ['Button']
    }
  ];

  inquirer.prompt(questions).then(answers => {
    var framework = answers.framework.toLowerCase();
    var componentToScaffold = answers.componentToScaffold;

    request('https://raw.githubusercontent.com/chrishcode/flo/master/functions/components/' + framework + '/' + componentToScaffold + '.js').pipe(fs.createWriteStream(componentToScaffold + '.js'));
  });
}

const run = async () => {
  const componentsToScaffold = await askWhatComponentsToScaffold();
}

run();
