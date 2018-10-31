const inquirer = require('inquirer');
const files = require('./files');
const touch = require("touch");
var fs = require('fs');

module.exports = {
  askWhatComponentsToScaffold: () => {
    const questions = [{
      type: 'checkbox',
      name: 'componentsToScaffold',
      message: 'What components do you want to scaffold?',
      choices: ['Button.js', 'ShoppingCart.js', 'Card.js']
    }];

    inquirer.prompt(questions).then(answers => {
      var componentsToScaffold = answers.componentsToScaffold;

      if(componentsToScaffold) {
        for (var i = 0; i < componentsToScaffold.length; i++) {
          fs.createReadStream('../components/Button.js').pipe(fs.createWriteStream(componentsToScaffold[i]));
        }
      }
    });
  }
}