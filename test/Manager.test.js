const Manager = require("../lib/Manager");

describe("Manager", () => {
  describe("constructor", () => {
    it("should have a officeNumber with a non-empty string", () => {
      const manager = () => new Manager("Luke Skywalker", 1, "luke@starwars.com", "");
      const err = new Error(
        "Expected parameter 'officeNumber' must be a non-empty string"
      );

      expect(manager).toThrowError(err);
    });
  });

  describe("getRole", () => {
    it("should return Manager", () => {
      const manager = new Manager("Luke Skywalker", 1, "luke@starwars.com", "123a");
      const role = manager.getRole();
      expect(role).toEqual("Manager");
    });
  });

  describe("getOfficeNumber", () => {
    it("should return Manager's officeNumber", () => {
      const manager = new Manager("Luke Skywalker", 1, "luke@starwars.com", "123a");
      const officeNumber = manager.getOfficeNumber();
      expect(officeNumber).toEqual("123a");
    });
  });
});
