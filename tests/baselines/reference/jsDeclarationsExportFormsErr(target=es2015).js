//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportFormsErr.ts] ////

//// [cls.js]
export class Foo {}

//// [bar.js]
import ns = require("./cls");
export = ns; // TS Only

//// [bin.js]
import * as ns from "./cls";
module.exports = ns; // We refuse to bind cjs module exports assignments in the same file we find an import in

//// [globalNs.js]
export * from "./cls";
export as namespace GLO; // TS Only

//// [includeAll.js]
import "./bar";
import "./bin";
import "./globalNs";


//// [cls.js]
export class Foo {
}
//// [bar.js]
export {};
//// [bin.js]
import * as ns from "./cls";
module.exports = ns; // We refuse to bind cjs module exports assignments in the same file we find an import in
//// [globalNs.js]
export * from "./cls";
//// [includeAll.js]
import "./bar";
import "./bin";
import "./globalNs";


//// [cls.d.ts]
export class Foo {
}
//// [bar.d.ts]
export = ns;
import ns = require("./cls");
//// [bin.d.ts]
export {};
//// [globalNs.d.ts]
export * from "./cls";
//// [includeAll.d.ts]
export {};
