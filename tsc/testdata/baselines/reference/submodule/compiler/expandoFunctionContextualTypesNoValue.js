//// [tests/cases/compiler/expandoFunctionContextualTypesNoValue.ts] ////

//// [expandoFunctionContextualTypesNoValue.ts]
// GH #38532
import Foo from "blah";

export function Foo() { }

Foo.bar = () => { };


//// [expandoFunctionContextualTypesNoValue.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = Foo;
const blah_1 = require("blah");
function Foo() { }
blah_1.default.bar = () => { };
