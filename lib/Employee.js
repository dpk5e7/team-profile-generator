class Employee {
  constructor(name, id, email) {
    if (typeof name !== "string" || name.trim().length === 0) {
      throw new Error("Expected parameter 'name' must be a non-empty string");
    }
    if (typeof id !== "number" || id <= 0) {
      throw new Error("Expected parameter 'id' must be a non-negative number");
    }
    if (typeof email !== "string" || !this.validateEmail(email)) {
      throw new Error(
        "Expected parameter 'email' must be a valid email address"
      );
    }

    this.name = name;
    this.id = id;
    this.email = email;
  }

  validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return "Employee";
  }
}

module.exports = Employee;
