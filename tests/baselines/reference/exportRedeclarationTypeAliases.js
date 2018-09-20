//// [exportRedeclarationTypeAliases.ts]
export type Foo = number;
export function Foo(): number;
export function Foo(): any {}

//// [exportRedeclarationTypeAliases.js]
"use strict";
exports.__esModule = true;
function Foo() { }
exports.Foo = Foo;
