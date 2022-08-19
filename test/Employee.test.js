const Employee = require("../lib/Employee");

describe("Employee", () => {
  describe("Initialization", () => {
    it("should create an object with a name, id, and email address if provided valid arguments", () => {
      const employee = new Employee("Dan", 1, "any@email.com");

      expect(employee.name).toEqual("Dan");
      expect(employee.id).toEqual(1);
      expect(employee.email).toEqual("any@email.com");
    });

    it("should throw an error if provided no arguments", () => {
      const emp = () => new Employee();

      expect(emp).toThrow();
    });

    it("should throw an error if not provided an id", () => {
      const emp = () => new Employee("Dan");
      const err = new Error(
        "Expected parameter 'id' must be a non-negative number"
      );

      expect(emp).toThrowError(err);
    });

    it("should throw an error if not provided a valid email address", () => {
      const emp = () => new Employee("Dan", 1, "something");
      const err = new Error(
        "Expected parameter 'email' must be a valid email address"
      );

      expect(emp).toThrowError(err);
    });

    it("should throw an error if 'name' is not a string", () => {
      const emp = () => new Employee(7, 1, "any@email.com");
      const err = new Error(
        "Expected parameter 'name' must be a non-empty string"
      );

      expect(emp).toThrowError(err);
    });

    it("should throw an error if 'id' is not a number", () => {
      const emp = () => new Employee("Dan", "1", "any@email.com");
      const err = new Error(
        "Expected parameter 'id' must be a non-negative number"
      );

      expect(emp).toThrowError(err);
    });

    it("should throw an error if 'id' is less than or equal to 0", () => {
      const emp = () => new Employee("Dan", -1, "any@email.com");
      const err = new Error(
        "Expected parameter 'id' must be a non-negative number"
      );

      expect(emp).toThrowError(err);
    });
  });

  describe("getRole", () => {
    it("should return Employee", () => {
      const employee = new Employee("Dan", 1, "any@email.com");
      const role = employee.getRole();
      expect(role).toEqual("Employee");
    });
  });

  describe("getId", () => {
    it("should return Employee's id", () => {
      const employee = new Employee("Dan", 1, "any@email.com");
      const id = employee.getId();
      expect(id).toEqual(1);
    });
  });

  describe("getEmail", () => {
    it("should return Employee's email address", () => {
      const employee = new Employee("Dan", 1, "any@email.com");
      const email = employee.getEmail();
      expect(email).toEqual("any@email.com");
    });
  });

  describe("getName", () => {
    it("should return Employee's name", () => {
      const employee = new Employee("Dan", 1, "any@email.com");
      const name = employee.getName();
      expect(name).toEqual("Dan");
    });
  });
});
