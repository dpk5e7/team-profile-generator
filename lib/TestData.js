const Engineer = require("./Engineer");
const Intern = require("./Intern");
const Manager = require("./Manager");

class TestData {
  constructor() {
    this.testEmployees = [
      { name: "Manager", id: 1, email: "m@k.com", officeNumber: "1" },
      { name: "Engineer 1", id: 2, email: "e1@k.com", github: "eeee1111" },
      { name: "Intern 1", id: 3, email: "i1@k.com", school: "CSU" },
      { name: "Engineer 2", id: 4, email: "e2@k.com", github: "eeee2222" },
      { name: "Intern 2", id: 5, email: "i2@k.com", school: "Nebraska" },
    ];
  }

  getTestEmployees() {
    const testData = [];
    testData.push(
      new Manager(
        this.testEmployees[0].name,
        this.testEmployees[0].id,
        this.testEmployees[0].email,
        this.testEmployees[0].officeNumber
      )
    );

    testData.push(
      new Engineer(
        this.testEmployees[1].name,
        this.testEmployees[1].id,
        this.testEmployees[1].email,
        this.testEmployees[1].github
      )
    );

    testData.push(
      new Intern(
        this.testEmployees[2].name,
        this.testEmployees[2].id,
        this.testEmployees[2].email,
        this.testEmployees[2].school
      )
    );

    testData.push(
      new Engineer(
        this.testEmployees[3].name,
        this.testEmployees[3].id,
        this.testEmployees[3].email,
        this.testEmployees[3].github
      )
    );

    testData.push(
      new Intern(
        this.testEmployees[4].name,
        this.testEmployees[4].id,
        this.testEmployees[4].email,
        this.testEmployees[4].school
      )
    );

    return testData;
  }
}

module.exports = TestData;
