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
var Something = require("fs").Something;
module.exports.A = {};
module.exports.A.B = {
    thing: new Something()
};


//// [index.d.ts]
export namespace A {
    namespace B {
        let thing: Something;
    }
}
import Something_1 = require("fs");
import Something = Something_1.Something;
