//// [tests/cases/conformance/classes/classExpressions/classExpression2.ts] ////

//// [classExpression2.ts]
class D { }
var v = class C extends D {};

//// [classExpression2.js]
class D {
}
var v = class C extends D {
};
