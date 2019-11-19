//// [tests/cases/conformance/plugins/plugin.throwsOnLoad.ts] ////

//// [package.json]
{
    "name": "typescript-plugin-transform",
    "version": "1.0.0",
    "main": "index.js",
    "typescriptPlugin": {
        "activationEvents": ["preEmit"]
    }
}

//// [index.js]
throw new Error("Not yet implemented.");

//// [main.ts]
const a = undefined;

//// [main.js]
var a = undefined;
