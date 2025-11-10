//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsTypeReferences3.ts] ////

//// [index.d.ts]
declare module "fs" {
    export class Something {}
}
//// [index.js]
/// <reference types="node" />

const Something = require("fs").Something;
module.exports.A = {}
module.exports.A.B = {
    thing: new Something()
}


//// [index.js]
/// <reference types="node" />
const Something = require("fs").Something;
export var A = {};
module.exports.A = {};
module.exports.A.B = {
    thing: new Something()
};


//// [index.d.ts]
export declare var A: {};
