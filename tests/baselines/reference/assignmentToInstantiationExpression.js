//// [tests/cases/compiler/assignmentToInstantiationExpression.ts] ////

//// [assignmentToInstantiationExpression.ts]
let obj: { fn?: <T>() => T } = {};
obj.fn<number> = () => 1234;


let getValue: <T>() => T;
getValue<number> = () => 1234;


let getValue2!: <T>() => T;
getValue2<number> = () => 1234;


//// [assignmentToInstantiationExpression.js]
"use strict";
var obj = {};
(obj.fn) = function () { return 1234; };
var getValue;
(getValue) = function () { return 1234; };
var getValue2;
(getValue2) = function () { return 1234; };
