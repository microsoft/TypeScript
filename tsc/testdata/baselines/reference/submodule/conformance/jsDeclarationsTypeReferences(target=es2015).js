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
"use strict";
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


//// [DtsFileErrors]


tests/cases/conformance/jsdoc/declarations/out/index.d.ts(2,19): error TS2307: Cannot find module 'fs' or its corresponding type declarations.


==== tests/cases/conformance/jsdoc/declarations/out/index.d.ts (1 errors) ====
    declare const _default: {
        thing: import("fs").Something;
                      ~~~~
!!! error TS2307: Cannot find module 'fs' or its corresponding type declarations.
    };
    export = _default;
    
==== node_modules/@types/node/index.d.ts (0 errors) ====
    declare module "fs" {
        export class Something {}
    }