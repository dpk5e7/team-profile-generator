const Manager = require("../lib/Manager");

describe("Manager", () => {
  describe("constructor", () => {
    it("should have a officeNumber with a non-empty string", () => {
      const manager = () => new Manager("Dan", 1, "any@email.com", "");
      const err = new Error(
        "Expected parameter 'officeNumber' must be a non-empty string"
      );

      expect(manager).toThrowError(err);
    });
  });

  describe("getRole", () => {
    it("should return Manager", () => {
      const manager = new Manager("Dan", 1, "any@email.com", "123a");
      const role = manager.getRole();
      expect(role).toEqual("Manager");
    });
  });

  describe("getOfficeNumber", () => {
    it("should return Manager's officeNumber", () => {
      const manager = new Manager("Dan", 1, "any@email.com", "123a");
      const officeNumber = manager.getOfficeNumber();
      expect(officeNumber).toEqual("123a");
    });
  });
});
