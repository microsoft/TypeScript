//// [tests/cases/compiler/importAndVariableDeclarationConflict1.ts] ////

//// [importAndVariableDeclarationConflict1.ts]
namespace m {
  export var m = '';
}

import x = m.m;
var x = '';


//// [importAndVariableDeclarationConflict1.js]
var m;
(function (m_1) {
    m_1.m = '';
})(m || (m = {}));
var x = m.m;
var x = '';
