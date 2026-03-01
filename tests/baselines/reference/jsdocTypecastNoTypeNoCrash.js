//// [tests/cases/compiler/jsdocTypecastNoTypeNoCrash.ts] ////

//// [index.js]
function Foo() {}
const a = /* @type string */(Foo);


//// [index.js]
"use strict";
function Foo() { }
const a = /* @type string */ (Foo);
