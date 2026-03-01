//// [tests/cases/conformance/classes/classExpressions/classExpression2.ts] ////

//// [classExpression2.ts]
class D { }
var v = class C extends D {};

//// [classExpression2.js]
"use strict";
class D {
}
var v = class C extends D {
};
