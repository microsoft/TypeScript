//// [tests/cases/conformance/plugins/plugin.throwsOnActivate.ts] ////

//// [package.json]
{
    "name": "typescript-plugin-transform",
    "version": "1.0.0",
    "main": "index.js",
    "typescriptPlugin": {
        "activationEvents": ["preParse"]
    }
}

//// [index.js]
exports.activate = function () {
    throw new Error("Not yet implemented.");
};
exports.preParse = function() {
};

//// [main.ts]
const a = undefined;

//// [main.js]
var a = undefined;
