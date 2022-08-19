const TeamProfileGenerator = require("./lib/TeamProfileGenerator");

// Initialize a new TeamProfileGenerator object
const tpg = new TeamProfileGenerator();

// Start generating
tpg.start(process.argv[2]);
