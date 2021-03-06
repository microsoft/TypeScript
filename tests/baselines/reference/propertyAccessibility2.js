//// [propertyAccessibility2.ts]
class C {
  private static x = 1;
}
var c = C.x;


//// [propertyAccessibility2.js]
var C = /** @class */ (function () {
    function C() {
    }
    (function () {
        C.x = 1;
    }).call(C);
    return C;
}());
var c = C.x;
