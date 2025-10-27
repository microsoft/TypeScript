//// [tests/cases/compiler/expandoFunctionContextualTypesNoValue.ts] ////

//// [expandoFunctionContextualTypesNoValue.ts]
// GH #38532
import Foo from "blah";

export function Foo() { }

Foo.bar = () => { };


//// [expandoFunctionContextualTypesNoValue.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = Foo;
// GH #38532
const blah_1 = __importDefault(require("blah"));
function Foo() { }
blah_1.default.bar = () => { };
