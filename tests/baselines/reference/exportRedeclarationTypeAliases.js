//// [tests/cases/compiler/exportRedeclarationTypeAliases.ts] ////

//// [exportRedeclarationTypeAliases.ts]
export type Foo = number;
export function Foo(): number;
export function Foo(): any {}

//// [exportRedeclarationTypeAliases.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = Foo;
function Foo() { }
