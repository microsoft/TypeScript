//// [tests/cases/conformance/classes/classDeclarations/classBody/classBodyWithStatements.ts] ////

//// [classBodyWithStatements.ts]
class C {
    var x = 1;
}

class C2 {
    function foo() {}
}

var x = 1;
var y = 2;
class C3 {
    x: number = y + 1; // ok, need a var in the statement production
}

//// [classBodyWithStatements.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var x = 1;
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
function foo() { }
var x = 1;
var y = 2;
var C3 = /** @class */ (function () {
    function C3() {
        this.x = y + 1; // ok, need a var in the statement production
    }
    return C3;
}());
