//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ClassElements/parserErrorRecovery_ClassElement2.ts] ////

//// [parserErrorRecovery_ClassElement2.ts]
namespace M {
  class C {

  enum E {
  }
}

//// [parserErrorRecovery_ClassElement2.js]
var M;
(function (M) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    var E;
    (function (E) {
    })(E || (E = {}));
})(M || (M = {}));
