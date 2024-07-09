const path = require("path");
const { TSESLint } = require("@typescript-eslint/utils");

module.exports.ROOT_DIR = path.join(process.cwd(), "scripts", "eslint", "tests", "fixtures");
module.exports.FILENAME = path.join(module.exports.ROOT_DIR, "file.ts");
module.exports.RuleTester = TSESLint.RuleTester;
