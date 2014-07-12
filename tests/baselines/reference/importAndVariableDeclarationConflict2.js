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
(function (_m) {
    _m.m = '';
})(m || (m = {}));

var x = m.m;

var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        var x = '';
    };
    return C;
})();
