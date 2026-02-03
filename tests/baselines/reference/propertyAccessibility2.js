//// [tests/cases/compiler/propertyAccessibility2.ts] ////

//// [propertyAccessibility2.ts]
class C {
  private static x = 1;
}
var c = C.x;


//// [propertyAccessibility2.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.x = 1;
    return C;
}());
var c = C.x;
