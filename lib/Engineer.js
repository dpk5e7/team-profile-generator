const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, github) {
    if (typeof github !== "string" || github.trim().length === 0) {
      throw new Error("Expected parameter 'github' must be a non-empty string");
    }

    super(name, id, email);
    this.github = github;
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;
