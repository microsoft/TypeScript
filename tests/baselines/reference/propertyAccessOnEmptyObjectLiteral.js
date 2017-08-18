//// [propertyAccessOnEmptyObjectLiteral.ts]
class A { }

(<A>{}).toString();

//// [propertyAccessOnEmptyObjectLiteral.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
({}).toString();
