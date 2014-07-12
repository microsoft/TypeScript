//// [importAndVariableDeclarationConflict1.ts]
module m {
  export var m = '';
}

import x = m.m;
var x = '';


//// [importAndVariableDeclarationConflict1.js]
var m;
(function (m) {
    m.m = '';
})(m || (m = {}));
var x = m.m;
var x = '';
