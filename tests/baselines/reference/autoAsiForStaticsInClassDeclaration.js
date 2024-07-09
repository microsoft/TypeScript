//// [tests/cases/compiler/autoAsiForStaticsInClassDeclaration.ts] ////

//// [autoAsiForStaticsInClassDeclaration.ts]
class C {
    static x
    static y
} 

//// [autoAsiForStaticsInClassDeclaration.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
