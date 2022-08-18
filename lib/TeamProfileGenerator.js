// Native
const fs = require("fs");
// Third Party
const inquirer = require("inquirer");
const chalk = require("chalk");
// Custom
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const Manager = require("./Manager");

class TeamProfileGenerator {
  constructor() {
    this.employees = [];

    this.commonQuestions = [
      {
        type: "input",
        message: "Please provide the employee's name:",
        name: "name",
      },
      {
        type: "input",
        message: "Please describe the employee's id number:",
        name: "id",
        validate: function (id) {
          // Need to ensure the id is a non-negative number
          if (!(parseInt(id) > 0)) {
            return false;
          }

          // Need to ensure that the id is not already used.
          if (this.employees) {
            for (const employee of this.employees) {
              if (employee.id === parseInt(id)) {
                console.log(".  Employee id already used.");
                return false;
              }
            }
          }
          return true;
        },
      },
      {
        type: "input",
        message: "Please provide the employee's email address:",
        name: "email",
        validate: function (email) {
          //gist.github.com/Amitabh-K/ae073eea3d5207efaddffde19b1618e8
          const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            email
          );

          if (valid) {
            return true;
          } else {
            console.log(".  Please enter a valid email.");
            return false;
          }
        },
      },
    ];
  }

  start() {
    this.requestManagerInfo();
  }

  requestManagerInfo() {
    // name, employee ID, email address, and office number
    const managerQuestions = [
      ...this.commonQuestions,
      {
        type: "input",
        message: "Please provide an office number:",
        name: "officeNumber",
      },
    ];

    console.log(`\n---- Manager Info ----\n`);

    inquirer.prompt(managerQuestions).then((answers) => {
      // Create a Manager object
      this.employees.push(
        new Manager(
          answers.name,
          parseInt(answers.id),
          answers.email,
          answers.officeNumber
        )
      );

      // go to employee menu
      this.requestEmployeeMenu();
    });
  }

  requestEmployeeMenu() {
    // Engineer, Intern, or Finish

    console.log(`\n---- Employee Menu ----\n`);

    const menu = [
      {
        type: "list",
        message:
          "Would you like to enter an Engineer, Intern, or are you finished building your team?",
        choices: ["Engineer", "Intern", "Finished"],
        name: "choice",
      },
    ];
    inquirer.prompt(menu).then((answer) => {
      switch (answer.choice) {
        case "Engineer":
          this.requestEngineerInfo();
          break;
        case "Intern":
          this.requestInternInfo();
          break;
        case "Finished":
          this.generateTeamProfile();
          break;
        default:
          console.log(
            "\nSomehow you picked something that wasn't a choice.  Let's try again."
          );
          this.requestEmployeeMenu();
          break;
      }
    });
  }

  requestEngineerInfo() {
    // name, ID, email, and GitHub username
    const engineerQuestions = [
      ...this.commonQuestions,
      {
        type: "input",
        message: "Please provide a GitHub username:",
        name: "github",
      },
    ];

    console.log(`\n---- Engineer Info ----\n`);

    inquirer.prompt(engineerQuestions).then((answers) => {
      // Create an Engineer object
      this.employees.push(
        new Engineer(
          answers.name,
          parseInt(answers.id),
          answers.email,
          answers.github
        )
      );

      // go back to employee menu
      this.requestEmployeeMenu();
    });
  }

  requestInternInfo() {
    // name, ID, email, and school
    const internQuestions = [
      ...this.commonQuestions,
      {
        type: "input",
        message: "Please provide the intern's school:",
        name: "school",
      },
    ];

    console.log(`\n---- Intern Info ----\n`);

    inquirer.prompt(internQuestions).then((answers) => {
      // Create an Intern object
      this.employees.push(
        new Intern(
          answers.name,
          parseInt(answers.id),
          answers.email,
          answers.school
        )
      );

      // go back to employee menu
      this.requestEmployeeMenu();
    });
  }

  generateTeamProfile() {
    // Build the HTML page to ./dist/ unique file name

    console.log(`\n---- Generating Team Profile ----\n`);

    console.log(JSON.stringify(this.employees));
  }
}

module.exports = TeamProfileGenerator;
