//// [tests/cases/conformance/plugins/plugin.throwsOnPreEmitTransform.ts] ////

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
exports.preEmit = function() {
    return {
        customTransformers: { after: [transform] }
    };
    function transform() {
        throw new Error("Not yet implemented.");
    }
};

//// [main.ts]
const a = undefined;

//// [main.js]
var a = undefined;
