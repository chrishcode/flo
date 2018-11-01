#!/usr/bin/env node
const functions = require('firebase-functions');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const fs = require('fs');
const request = require('request');
const git = require("nodegit");

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
  const appOrComponentQuestions = [
    {
      type: 'list',
      name: 'appOrComponent',
      message: 'Do you want scaffold a starter app or a component?',
      choices: ['Starter app', 'Component']
    }
  ];

  const starterAppQuestions = [
    {
      type: 'list',
      name: 'framework',
      message: 'What javascript framework do you want to use?',
      choices: ['React']
    },
    {
      type: 'list',
      name: 'starterAppToScaffold',
      message: 'What type of starter app do you want to scaffold?',
      choices: ['Default']
    },
    {
      type: 'input',
      name: 'nameOfProject',
      message: 'What do you want to call your new project?',
      choices: ['Name']
    }
  ];

  const componentQuestions = [
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

  inquirer.prompt(appOrComponentQuestions).then(answers => {
    var appOrComponentAnswer = answers.appOrComponent;

    if(appOrComponentAnswer == 'Component') {
      inquirer.prompt(componentQuestions).then(answers => {
        var framework = answers.framework.toLowerCase();
        var componentToScaffold = answers.componentToScaffold;

        request('https://raw.githubusercontent.com/chrishcode/flo/master/functions/components/' + framework + '/' + componentToScaffold + '.js').pipe(fs.createWriteStream(componentToScaffold + '.js'));
      });
    }

    if(appOrComponentAnswer == 'Starter app') {
      inquirer.prompt(starterAppQuestions).then(answers => {
        var framework = answers.framework.toLowerCase();
        var starterAppToScaffold = answers.starterAppToScaffold.toLowerCase();
        var nameOfProject = answers.nameOfProject.toLowerCase();
        // Clone a given repository into the `./flo` folder.
        git.Clone("https://github.com/chrishcode/mojifi-app", "./" + nameOfProject);
        console.log('Created a new ' + starterAppToScaffold + ' ' + framework + ' app');
      });
    }
  });
}

const run = async () => {
  const componentsToScaffold = await askWhatComponentsToScaffold();
}

run();
