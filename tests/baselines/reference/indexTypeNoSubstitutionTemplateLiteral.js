//// [tests/cases/compiler/indexTypeNoSubstitutionTemplateLiteral.ts] ////

//// [indexTypeNoSubstitutionTemplateLiteral.ts]
function Foo() {}
Foo[`b`] = function () {};

type Test = keyof typeof Foo;



//// [indexTypeNoSubstitutionTemplateLiteral.js]
"use strict";
function Foo() { }
Foo["b"] = function () { };
