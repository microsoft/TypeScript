//// [propertyAccessOnObjectLiteral.ts]
class A { }

(<A>{}).toString();

(() => {
    (<A>{}).toString();
})();


//// [propertyAccessOnObjectLiteral.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
({}.toString());
(function () {
    ({}.toString());
})();
