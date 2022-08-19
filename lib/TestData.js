const Engineer = require("./Engineer");
const Intern = require("./Intern");
const Manager = require("./Manager");

class TestData {
  static getTestEmployees() {
    const testEmployees = [];
    testEmployees.push(
      new Manager("Luke Skywalker", 1, "luke@starwars.com", "1")
    );

    testEmployees.push(
      new Engineer("Leia Organa", 2, "leia@starwars.com", "princess")
    );

    testEmployees.push(
      new Intern("Han Solo", 3, "han@starwars.com", "Imperial Academy")
    );

    testEmployees.push(
      new Engineer("Chewbacca", 3, "chewy@starwars.com", "chewy")
    );

    testEmployees.push(
      new Intern("Obi-Wan Kenobi", 5, "ben@starwars.com", "Jedi Temple")
    );

    return testEmployees;
  }
}

module.exports = TestData;
