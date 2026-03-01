//// [tests/cases/compiler/allowSyntheticDefaultImports1.ts] ////

//// [a.ts]
import Namespace from "./b";
export var x = new Namespace.Foo();

//// [b.d.ts]
export class Foo {
	member: string;
}


//// [a.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
const b_1 = __importDefault(require("./b"));
exports.x = new b_1.default.Foo();
