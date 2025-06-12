//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ClassElements/parserErrorRecovery_ClassElement2.ts] ////

//// [parserErrorRecovery_ClassElement2.ts]
module M {
  class C {

  enum E {
  }
}

//// [parserErrorRecovery_ClassElement2.js]
var M;
(function (M) {
    class C {
    }
    let E;
    (function (E) {
    })(E || (E = {}));
})(M || (M = {}));
