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
    // {
    //   type: 'list',
    //   name: 'starterAppOrComponent',
    //   message: 'Do you want to scaffold a starter app or a component?',
    //   choices: ['Starter app', 'Component']
    // },
    {
      type: 'checkbox',
      name: 'componentsToScaffold',
      message: 'What components do you want to scaffold?',
      choices: ['Button']
    }
  ];

  inquirer.prompt(questions).then(answers => {
    var componentsToScaffold = answers.componentsToScaffold;

    if(componentsToScaffold) {
      for (var i = 0; i < componentsToScaffold.length; i++) {
        request('https://raw.githubusercontent.com/chrishcode/flo/master/functions/components/react' + componentsToScaffold[i] + '.js').pipe(fs.createWriteStream(componentsToScaffold[i] + '.js'));
      }
    }
  });
}

const run = async () => {
  const componentsToScaffold = await askWhatComponentsToScaffold();
}

run();
