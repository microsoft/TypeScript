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
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function () {
        var x = '';
    };
    return C;
}());
