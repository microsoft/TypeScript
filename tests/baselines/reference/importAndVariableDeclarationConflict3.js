//// [importAndVariableDeclarationConflict3.ts]
module m {
  export var m = '';
}

import x = m.m;
import x = m.m;


//// [importAndVariableDeclarationConflict3.js]
var m;
(function (_m) {
    _m.m = '';
})(m || (m = {}));
var x = m.m;
var x = m.m;
