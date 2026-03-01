//// [tests/cases/compiler/augmentedTypesClass2a.ts] ////

//// [augmentedTypesClass2a.ts]
//// class then function
class c2 { public foo() { } } // error
function c2() { } // error
var c2 = () => { }

//// [augmentedTypesClass2a.js]
"use strict";
//// class then function
class c2 {
    foo() { }
} // error
function c2() { } // error
var c2 = () => { };
