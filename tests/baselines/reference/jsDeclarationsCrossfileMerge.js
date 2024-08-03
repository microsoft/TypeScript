//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsCrossfileMerge.ts] ////

//// [index.js]
const m = require("./exporter");

module.exports = m.default;
module.exports.memberName = "thing";

//// [exporter.js]
function validate() {}

export default validate;


//// [exporter.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validate() { }
exports.default = validate;
//// [index.js]
var m = require("./exporter");
module.exports = m.default;
module.exports.memberName = "thing";


//// [exporter.d.ts]
export default validate;
declare function validate(): void;
declare namespace validate {
    export {};
}
//// [index.d.ts]
declare const _exports: typeof m.default;
export = _exports;
import m = require("exporter");


//// [DtsFileErrors]


out/index.d.ts(3,20): error TS2307: Cannot find module 'exporter' or its corresponding type declarations.


==== out/index.d.ts (1 errors) ====
    declare const _exports: typeof m.default;
    export = _exports;
    import m = require("/.src/exporter");
                       ~~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'exporter' or its corresponding type declarations.
    
==== out/exporter.d.ts (0 errors) ====
    export default validate;
    declare function validate(): void;
    declare namespace validate {
        export {};
    }
    