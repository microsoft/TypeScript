//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsTypeReferences.ts] ////

//// [index.d.ts]
declare module "fs" {
    export class Something {}
}
//// [index.js]
/// <reference types="node" />

const Something = require("fs").Something;

const thing = new Something();

module.exports = {
    thing
};


//// [index.js]
/// <reference types="node" />
const Something = require("fs").Something;
const thing = new Something();
module.exports = {
    thing
};


//// [index.d.ts]
declare const _default: {
    thing: import("fs").Something;
};
export = _default;
