//// [importAndVariableDeclarationConflict1.ts]
module m {
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
