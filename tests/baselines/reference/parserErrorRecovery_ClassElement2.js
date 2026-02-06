//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ClassElements/parserErrorRecovery_ClassElement2.ts] ////

//// [parserErrorRecovery_ClassElement2.ts]
namespace M {
  class C {

  enum E {
  }
}

//// [parserErrorRecovery_ClassElement2.js]
"use strict";
var M;
(function (M) {
    class C {
    }
    let E;
    (function (E) {
    })(E || (E = {}));
})(M || (M = {}));
