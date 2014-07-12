//// [importAndVariableDeclarationConflict3.ts]
module m {
  export var m = '';
}

import x = m.m;
import x = m.m;


//// [importAndVariableDeclarationConflict3.js]
var m;
(function (m) {
    m.m = '';
})(m || (m = {}));
var x = m.m;
var x = m.m;
