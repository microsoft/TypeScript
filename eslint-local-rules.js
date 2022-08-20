const fs = require("fs");
const path = require("path");

const rulesDir = path.join(__dirname, "scripts", "eslint", "rules");
const ruleFiles = fs.readdirSync(rulesDir).filter(p => p !== "utils.js");

module.exports = Object.fromEntries(ruleFiles.map((p) => {
    const name = path.parse(p).name;
    return [name, require(path.join(rulesDir, p))];
}));
