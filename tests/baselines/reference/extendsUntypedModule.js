//// [tests/cases/compiler/extendsUntypedModule.ts] ////

//// [index.js]
This file is not read.

//// [index.js]
Nor is this one.

//// [a.ts]
import Foo from "foo";
import Bar from "bar"; // error: unused
export class A extends Foo { }


//// [a.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
const foo_1 = __importDefault(require("foo"));
class A extends foo_1.default {
}
exports.A = A;
