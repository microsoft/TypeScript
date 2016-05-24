//// [exportRedeclarationTypeAliases.ts]
export type Foo = number;
export function Foo(): number;
export function Foo(): any {}

//// [exportRedeclarationTypeAliases.js]
"use strict";
function Foo() { }
exports.Foo = Foo;
