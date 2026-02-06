//// [tests/cases/compiler/conflictingTypeAnnotatedVar.ts] ////

//// [conflictingTypeAnnotatedVar.ts]
var foo: string;
function foo(): number { }
function foo(): number { }

//// [conflictingTypeAnnotatedVar.js]
"use strict";
var foo;
function foo() { }
function foo() { }
