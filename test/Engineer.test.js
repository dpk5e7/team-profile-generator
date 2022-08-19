const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
  describe("Initialization", () => {
    it("should have a github username with a non-empty string", () => {
      const eng = () => new Engineer("Dan", 1, "any@email.com", "");
      const err = new Error(
        "Expected parameter 'github' must be a non-empty string"
      );

      expect(eng).toThrowError(err);
    });
  });

  describe("getRole", () => {
    it("should return Engineer", () => {
      const eng = new Engineer("Dan", 1, "any@email.com", "Mizzou");
      const role = eng.getRole();
      expect(role).toEqual("Engineer");
    });
  });

  describe("getGithub", () => {
    it("should return Engineer's github username", () => {
      const eng = new Engineer("Dan", 1, "any@email.com", "Mizzou");
      const role = eng.getGithub();
      expect(role).toEqual("Mizzou");
    });
  });
});
