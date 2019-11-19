//// [tests/cases/conformance/plugins/plugin.throwsOnPreParseTransform.ts] ////

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
exports.preParse = function() {
    return {
        preprocessors: [preprocess]
    };
    function preprocess() {
        throw new Error("Not yet implemented.");
    }
};

//// [main.ts]
const a = undefined;

//// [main.js]
var a = undefined;
