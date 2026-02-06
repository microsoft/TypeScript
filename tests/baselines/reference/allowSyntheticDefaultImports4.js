//// [tests/cases/compiler/allowSyntheticDefaultImports4.ts] ////

//// [b.d.ts]
declare class Foo {
	member: string;
}
export = Foo;

//// [a.ts]
import Foo from "./b";
export var x = new Foo();


//// [a.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
const b_1 = __importDefault(require("./b"));
exports.x = new b_1.default();
