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
class C {
    foo() {
        var x = '';
    }
}
