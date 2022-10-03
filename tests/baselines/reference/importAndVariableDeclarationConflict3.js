//// [importAndVariableDeclarationConflict3.ts]
module m {
  export var m = '';
}

import x = m.m;
import x = m.m;


//// [importAndVariableDeclarationConflict3.js]
var m;
(function (m_1) {
    m_1.m = '';
})(m || (m = {}));
var x = m.m;
var x = m.m;
