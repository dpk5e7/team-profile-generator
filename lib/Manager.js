const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    if (typeof officeNumber !== "string" || officeNumber.trim().length === 0) {
      throw new Error(
        "Expected parameter 'officeNumber' must be a non-empty string"
      );
    }

    super(name, id, email);
    this.officeNumber = officeNumber; // Office Numbers typically also have letters in them too.
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    return "Manager";
  }
}

module.exports = Manager;
