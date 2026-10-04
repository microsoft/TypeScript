//// [tests/cases/compiler/isolatedDeclarationErrorTypes1.ts] ////

//// [isolatedDeclarationErrorTypes1.ts]
// https://github.com/microsoft/TypeScript/issues/60192

import { Unresolved } from "foo";

export const foo1 = (type?: Unresolved): void => {};
export const foo2 = (type?: Unresolved | undefined): void => {};
export const foo3 = (type: Unresolved): void => {};


//// [isolatedDeclarationErrorTypes1.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/60192
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo3 = exports.foo2 = exports.foo1 = void 0;
const foo1 = (type) => { };
exports.foo1 = foo1;
const foo2 = (type) => { };
exports.foo2 = foo2;
const foo3 = (type) => { };
exports.foo3 = foo3;


//// [isolatedDeclarationErrorTypes1.d.ts]
import { Unresolved } from "foo";
export declare const foo1: (type?: Unresolved) => void;
export declare const foo2: (type?: Unresolved | undefined) => void;
export declare const foo3: (type: Unresolved) => void;
