//// [exportRedeclarationTypeAliases.ts]
export type Foo = number;
export function Foo(): number;
export function Foo(): any {}

//// [exportRedeclarationTypeAliases.js]
"use strict";
exports.__esModule = true;
exports.Foo = void 0;
function Foo() { }
exports.Foo = Foo;
