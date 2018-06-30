// @ts-check
const ts = require("../../lib/typescript");
const fs = require("fs");
const { reportDiagnostics } = require("./diagnostics");

module.exports = exports = readJson;

/** @param {string} jsonPath */
function readJson(jsonPath) {
    const jsonText = fs.readFileSync(jsonPath, "utf8");
    const result = ts.parseConfigFileTextToJson(jsonPath, jsonText);
    if (result.error) {
        reportDiagnostics([result.error]);
        throw new Error("An error occurred during parse.");
    }
    return result.config;
}