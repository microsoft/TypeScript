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
var Something = require("fs").Something;
var thing = new Something();
module.exports = {
    thing: thing
};


//// [index.d.ts]
/// <reference types="node" />
export const thing: import("fs").Something;
