//// [tests/cases/compiler/importAndVariableDeclarationConflict2.ts] ////

//// [importAndVariableDeclarationConflict2.ts]
module m {
  export var m = '';
}

import x = m.m;

class C {
  public foo() {
    var x = '';
  }
}

//// [importAndVariableDeclarationConflict2.js]
var m;
(function (m_1) {
    m_1.m = '';
})(m || (m = {}));
var x = m.m;
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () {
        var x = '';
    };
    return C;
}());
