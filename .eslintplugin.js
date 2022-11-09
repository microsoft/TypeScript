const fs = require("fs");
const path = require("path");

const rulesDir = path.join(__dirname, "scripts", "eslint", "rules");
const ext = ".cjs";
const ruleFiles = fs.readdirSync(rulesDir).filter((p) => p.endsWith(ext));

module.exports = {
    rules: Object.fromEntries(ruleFiles.map((p) => {
        return [p.slice(0, -ext.length), require(path.join(rulesDir, p))];
    })),
}
