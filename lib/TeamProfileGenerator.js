// Native
const fs = require("fs");
// Third Party
const inquirer = require("inquirer");
const chalk = require("chalk");
// Custom
//const employee = require("./Employee");
const manager = require("./Manager");
const engineer = require("./Engineer");
const intern = require("./intern");

class TeamProfileGenerator {
  constructor() {
    this.employees = [];
  }

  start() {
    requestManagerInfo();
  }

  requestManagerInfo() {
    // name, employee ID, email address, and office number

    // go to employee menu
    requestEmployeeMenu();
  }

  requestEmployeeMenu() {
    // Engineer, Intern, or Finish
  }

  requestEngineerInfo() {
    // name, ID, email, and GitHub username

    // go back to employee menu
    requestEmployeeMenu();
  }

  requestInternInfo() {
    // name, ID, email, and school

    // go back to employee menu
    requestEmployeeMenu();
  }
  
  generateTeamProfile() {
    // Build the HTML page to ./dist/ unique file name
  }
}

module.exports = TeamProfileGenerator;
