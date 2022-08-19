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
  /**
   * Constructor for the TeamProfileGenerator class.
   */
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
            console.log(".  Employee id must be a number.");
            return false;
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

  /**
   * Entry point for the application.
   */
  start() {
    //
    //
    //
    //
    //
    //
    this.requestManagerInfo();
    //
    //
    //
    //
    //
    //
    //this.generateWithTestData();
  }

  /**
   * Inquirer to call for the Manager's info.
   */
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

  /**
   * Inquirer to call for the Employee Menu.
   */
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

  /**
   * Inquirer to call for an Engineer's info.
   */
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

  /**
   * Inquirer to call for an Intern's info.
   */
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

  /**
   * Calls build HTML with command line input.
   */
  generateTeamProfile() {
    console.log(`\n---- Generating Team Profile ----\n`);

    this.buildHTML(this.employees);
  }

  /**
   * Calls buildHTML with test data.
   */
  generateWithTestData() {
    console.log(`\n---- Generating Team Profile with Test Data ----\n`);

    const testEmployees = new TestData().getTestEmployees();

    this.buildHTML(testEmployees);
  }

  /**
   * Builds the HTML page to ./dist/ with a unique file name
   * Input is an array of Employees.  The Employees can be instances of Manager, Engineer, or Intern.
   * @param {Employee} employees
   */
  buildHTML(employees) {
    // Build the HTML page to ./dist/ unique file name
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
      let icon8 = " ";

      if (employee instanceof Manager) {
        uniqueItem = `<li class="list-group-item">Office Number: ${employee.getOfficeNumber()}</li>`;
        icon8 = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACQUlEQVRIie2WO2hUURCGP/JyA0qyBkKCqKBFQAiESJo8YMsUFkEsFCTEUoj4KtVK1D5VgkIENUmRoK1FDAoWCiJqIYIYg7Aivi3EF7kW579wPDv37F2D2GRgGO6Zf/7/7Nw5Zy+s23+208Bn4DkwARRrqN0JLABvgLfAmWoFbcAc8AVIAr8HNOUQ3SKxsP4VsCuraNYo8H0sh/BkpP6GD6xTLAJ7I4QJsCGH8I5Irt9aHIjsNAFOCdcAHAUeAF+B18ARj6cA3Mzg+GYJ74uIPgHqgcYI6QpwWFztuMEMMU8t4f0R4RPCjFfpSgIMCnvJyD3zBdN3XG/tRnbf60o1O6h418j9soRjR+WdYkcO4a2KZSM3agm35yB7kUM4xWwO1u/gBrJCeHeEbEDxWg7h2xl8B0Jgg+Io7oCXgE5gj4dpU8zT6m2KP4N1q/UV1sif05i+/0ERZk30d6BH2JkgV/GLQ2sCpoKii7iLAeBCRPi8MK3AR1z3SsqtAvPAUChYAI7jLvMEWNL6kp6v6rkILBuiyxL0N3dMHmKvoFe8HXe4QyI8kVVgWGtdBlmXciXgh9ZG5FZ3TgJcNxLTIpr2hKe8DoX41C57az1yS/ghwHsjkf4FjgGLQJ9H3m3gu718P3AL1/rWDOFP1GAFbaRsEJWBQ0BzLYTVbCNwFnd1+mL+1Kb+ATgHbFqraAvuqrPalTW1iWpaYsR1saSIezNyL+WW9eI+GP7aHpN9YcSmNgEerUXY+pJIPTa1NU/uuv0z+w13ThapkzW9vQAAAABJRU5ErkJggg==">`;
      } else if (employee instanceof Engineer) {
        uniqueItem = `<li class="list-group-item">Github: <a href="https://github.com/${employee.getGithub()}" class="card-link">${employee.getGithub()}</a></li>`;
        icon8 = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACR0lEQVRIie3WsU5UQRQG4C+rGESMFKuNUKCAMQQlam2jNgatbPQBtBFIsFp9Bx/CQjsbCZYaCKXRRHwAK4WYoGCCCojFnXVnZ+9l7yqV8U8muffMmf/MmZnzz/AfxTiY/C9ioY3PX2MKW5gI/8PYCW042K4Hn7tlCPeXDNyLfXiC1xiP+l7hDc4Fn8MlOXPRJ8uyim7MamTYrj0LY45iOnCVxlQg+YyVDoLW20oYu4PJTgJXsZpDuIUZjOJQaKOBfCnHfzVwlUZ3kul3LIfv2wVjKrKDtaE58+4yAadwX/OebuAqbkRku+3bZXzTvOcPAncuemRLmS7XTOTzItgelkgg5dm0S51fw3rk/FZWInWcDZPbxCdZ9k9wMuGp4F3Es66hAYWYl58tnEomVm8fMZj4xlnPtws6grVowFjS/zTYZ3Ec/ZgLtkeJ71jEs6ahcC1YzMnkSOJTn1R/ZBvIGVfUfmt7JSL4WTSjPcROUceQcks9J8t6AM/lL/UZzUs91G5W8eG6l/SNyD9cH7Qerumov+3hSstpSXM5jWsup2U8xomEJy2nr7JrMxdFAhJn/VI5AYmzjXW+p2jAJGoymYslc0J5ybyiVTJrSj4Q0kvih3KXxHQSdEWBTBa9QHrRFf134Ri2ZS+MUbwP5IO4hDs4nfAcCFwbBXFasBcPgfp93tFDoE+2J1XZUv3J06caOFL16wg1jVtmXrPIfAm2ehnWyhBW2rsgq8Nt3MJFXIj6zgfbzeCzXpKzNNIaXNCqSHv+oP938Av24hGuk4RP8AAAAABJRU5ErkJggg==">`;
      } else if (employee instanceof Intern) {
        uniqueItem = `<li class="list-group-item">School: ${employee.getSchool()}</li>`;
        icon8 = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAA8ElEQVRIie2WPQ6CQBCFP42dtlRAaaVnsfRsXkGJlbZWxHgUC0NiTLTFwiHZwK6wy+JPwksmA7PLezM7EwB69PgQjkDekaWq0KAknHdRjU5vVLfBEyoFDT0LNMbPC6c4DlFbYRs4DWiRtW9UePse+0DfYy1chCMgAW5iW2DaNpG6o46AjOpAZUDYgrd2QyLrOxEKgb3E1l0K32RdrS6W2NWG19Tj8lGOJX4Xr/tsPsRPNM9XUBY+GRKZiz+IX/HqdyTX6trMwGHiboTiWHUW2xC5/GmYZsCK669eIF8VvgBLYAGc/aXzHhsgUO4DiVnhCSPscvITBoBDAAAAAElFTkSuQmCC">`;
      }

      const cardHTML = `<div class="col-11 col-md-5 col-lg-4 col-xl-3 p-2 my-2 mx-auto">
        <div class="card border-success">
          <div class="card-header bg-success text-white">
            ${icon8} ${employee.getName()}
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
