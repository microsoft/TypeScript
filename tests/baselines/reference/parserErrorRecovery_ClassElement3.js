//// [parserErrorRecovery_ClassElement3.ts]
module M {
   #
   class C {
   }
   @
   enum E {
   #

//// [parserErrorRecovery_ClassElement3.js]
var M = M || (M = {});
(function (M) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    var E = E || (E = {});
    (function (E) {
    })(E);
})(M);
