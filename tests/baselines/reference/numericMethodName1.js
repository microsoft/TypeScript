//// [tests/cases/compiler/numericMethodName1.ts] ////

//// [numericMethodName1.ts]
class C {
  1 = 2;
}


//// [numericMethodName1.js]
var C = /** @class */ (function () {
    function C() {
        this[1] = 2;
    }
    return C;
}());
