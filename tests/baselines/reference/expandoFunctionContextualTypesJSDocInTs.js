//// [tests/cases/compiler/expandoFunctionContextualTypesJSDocInTs.ts] ////

//// [expandoFunctionContextualTypesJSDocInTs.ts]
export function Foo() { }

// This comment should have no effect; this is a TS file.
/** @type {never} */
Foo.bar = () => { };


//// [expandoFunctionContextualTypesJSDocInTs.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = Foo;
function Foo() { }
// This comment should have no effect; this is a TS file.
/** @type {never} */
Foo.bar = function () { };
