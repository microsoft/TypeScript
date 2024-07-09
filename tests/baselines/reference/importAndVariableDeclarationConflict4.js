//// [tests/cases/compiler/importAndVariableDeclarationConflict4.ts] ////

//// [importAndVariableDeclarationConflict4.ts]
module m {
  export var m = '';
}

var x = '';
import x = m.m;


//// [importAndVariableDeclarationConflict4.js]
var m;
(function (m_1) {
    m_1.m = '';
})(m || (m = {}));
var x = '';
var x = m.m;
