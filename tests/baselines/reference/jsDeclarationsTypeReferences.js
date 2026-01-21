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
export const thing: Something;
import Something_1 = require("fs");
import Something = Something_1.Something;


//// [DtsFileErrors]


tests/cases/conformance/jsdoc/declarations/out/index.d.ts(2,30): error TS2307: Cannot find module 'fs' or its corresponding type declarations.


==== tests/cases/conformance/jsdoc/declarations/out/index.d.ts (1 errors) ====
    export const thing: Something;
    import Something_1 = require("fs");
                                 ~~~~
!!! error TS2307: Cannot find module 'fs' or its corresponding type declarations.
    import Something = Something_1.Something;
    
==== node_modules/@types/node/index.d.ts (0 errors) ====
    declare module "fs" {
        export class Something {}
    }