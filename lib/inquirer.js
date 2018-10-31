const inquirer = require('inquirer');
var fs = require('fs');

module.exports = {
  askWhatComponentsToScaffold: () => {
    const questions = [{
      type: 'checkbox',
      name: 'componentsToScaffold',
      message: 'What components do you want to scaffold?',
      choices: ['Button', 'ShoppingCart', 'Card']
    }];

    inquirer.prompt(questions).then(answers => {
      var componentsToScaffold = answers.componentsToScaffold;

      if(componentsToScaffold) {
        for (var i = 0; i < componentsToScaffold.length; i++) {
          fs.createReadStream('../components/Button.js').pipe(fs.createWriteStream(componentsToScaffold[i] + '.js'));
        }
      }
    });
  }
}