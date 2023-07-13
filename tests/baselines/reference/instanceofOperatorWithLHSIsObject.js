//// [tests/cases/conformance/expressions/binaryOperators/instanceofOperator/instanceofOperatorWithLHSIsObject.ts] ////

//// [instanceofOperatorWithLHSIsObject.ts]
class C { }

var x1: any;
var x2: Function;

var a: {};
var b: Object;
var c: C;
var d: string | C;

var r1 = a instanceof x1;
var r2 = b instanceof x2;
var r3 = c instanceof x1;
var r4 = d instanceof x1;


//// [instanceofOperatorWithLHSIsObject.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var x1;
var x2;
var a;
var b;
var c;
var d;
var r1 = a instanceof x1;
var r2 = b instanceof x2;
var r3 = c instanceof x1;
var r4 = d instanceof x1;
