//// [tests/cases/compiler/expandoFunctionContextualTypesNoValue.ts] ////

//// [expandoFunctionContextualTypesNoValue.ts]
// GH #38532
import Foo from "blah";

export function Foo() { }

Foo.bar = () => { };


//// [expandoFunctionContextualTypesNoValue.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
// GH #38532
var blah_1 = require("blah");
function Foo() { }
exports.Foo = Foo;
blah_1.default.bar = function () { };
