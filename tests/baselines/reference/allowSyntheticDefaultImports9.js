//// [tests/cases/compiler/allowSyntheticDefaultImports9.ts] ////

//// [b.d.ts]
export function foo();

export function bar();

//// [a.ts]
import { default as Foo } from "./b";
Foo.bar();
Foo.foo();

//// [a.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const b_1 = __importDefault(require("./b"));
b_1.default.bar();
b_1.default.foo();
