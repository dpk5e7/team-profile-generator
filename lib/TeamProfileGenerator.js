// Native
const fs = require("fs");
// Third Party
const inquirer = require("inquirer");
const chalk = require("chalk");
// Custom
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const Manager = require("./Manager");
const TestData = require("./TestData");

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
    //
    //
    //
    //
    //
    //
    //this.requestManagerInfo();
    //
    //
    //
    //
    //
    //
    this.generateWithTestData();
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

    //console.log(JSON.stringify(this.employees));

    this.buildHTML(this.employees);
  }

  generateWithTestData() {
    console.log(`\n---- Generating Team Profile with Test Data ----\n`);

    const testEmployees = new TestData().getTestEmployees();

    //console.log(testEmployees);

    this.buildHTML(testEmployees);
  }

  buildHTML(employees) {
    let pageHTML = `<!doctype html>
      <html lang="en">

      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Team Profile Generator</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
      </head>

      <body class="bg-secondary" style="--bs-bg-opacity: .5;">
        <h1 class="text-center text-success">Team Profile Generator</h1>

        <div class="container">
          <div class="row">`;

    // Look through the employees to make the cards
    for (const employee of employees) {
      let uniqueItem = "";

      if (employee instanceof Manager) {
        uniqueItem = `<li class="list-group-item">Office Number: ${employee.getOfficeNumber()}</li>`;
      } else if (employee instanceof Engineer) {
        uniqueItem = `<li class="list-group-item">Github: <a href="https://github.com/${employee.getGithub()}" class="card-link">${employee.getGithub()}</a></li>`;
      } else if (employee instanceof Intern) {
        uniqueItem = `<li class="list-group-item">School: ${employee.getSchool()}</li>`;
      }

      const cardHTML = `<div class="col-11 col-md-5 col-lg-4 col-xl-3 p-2 my-2 mx-auto">
        <div class="card border-success">
          <div class="card-header bg-success text-white">
            ${employee.getName()}
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${employee.getId()}</li>
            <li class="list-group-item">Email: <a href="mailto:${employee.getEmail()}" class="card-link">${employee.getEmail()}</a></li>
            ${uniqueItem}
          </ul>
        </div>
      </div>`;
      pageHTML += cardHTML;
    }

    pageHTML += `</div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
          crossorigin="anonymous"></script>
      </body>

      </html>`;

    // write that string to a file
    const fileName = this.getNextFileName();
    fs.writeFile(fileName, pageHTML, (err) =>
      err
        ? console.error(err)
        : console.log(`Success!  Open ${fileName} to see your results.`)
    );
  }

  /**
   * Function to return the next available filename with a base of "README".
   * This function protects from overwriting files that already exist, specifically the README for this program.
   * @returns {string} The next available filename
   */
  getNextFileName() {
    let base = "index";
    let fileName = base;
    let i = 1;
    while (fs.existsSync(`./dist/${fileName}.html`)) {
      fileName = base + i++;
    }
    return `./dist/${fileName}.html`;
  }
}

module.exports = TeamProfileGenerator;
