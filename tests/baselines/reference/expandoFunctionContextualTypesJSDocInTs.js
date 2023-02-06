//// [expandoFunctionContextualTypesJSDocInTs.ts]
// GH #38532
import Foo from "blah";

export function Foo() { }

// This comment should have no effect; this is a TS file.
/** @type {never} */
Foo.bar = () => { };


//// [expandoFunctionContextualTypesJSDocInTs.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
// GH #38532
var blah_1 = require("blah");
function Foo() { }
exports.Foo = Foo;
// This comment should have no effect; this is a TS file.
/** @type {never} */
blah_1.default.bar = function () { };
