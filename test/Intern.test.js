const Intern = require("../lib/Intern");

describe("Intern", () => {
  describe("Initialization", () => {
    it("should have a school with a non-empty string", () => {
      const intern = () => new Intern("Dan", 1, "any@email.com", "");
      const err = new Error(
        "Expected parameter 'school' must be a non-empty string"
      );

      expect(intern).toThrowError(err);
    });
  });

  describe("getRole", () => {
    it("should return Intern", () => {
      const intern = new Intern("Dan", 1, "any@email.com", "Mizzou");
      const role = intern.getRole();
      expect(role).toEqual("Intern");
    });
  });

  describe("getSchool", () => {
    it("should return Intern's school", () => {
      const intern = new Intern("Dan", 1, "any@email.com", "Mizzou");
      const school = intern.getSchool();
      expect(school).toEqual("Mizzou");
    });
  });
});
