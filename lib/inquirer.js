const inquirer = require('inquirer');
const files = require('./files');
const touch = require("touch");

module.exports = {
  askGithubCredentials: () => {
    const questions = [
      {
        type: 'checkbox',
        name: 'components',
        message: 'What components do you want to scaffold?',
        choices: ['Button', 'ShoppingCart', 'Card'],
        default: ['Button']
      }
    ];
    var answer = inquirer.prompt(questions);
    var component = 'Button' + '.js';
    touch(component);
    return answer.components
  }
}