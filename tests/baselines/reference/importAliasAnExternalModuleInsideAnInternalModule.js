//// [importAliasAnExternalModuleInsideAnInternalModule_file1.ts]
import r = require('importAliasAnExternalModuleInsideAnInternalModule_file0');
module m_private {
    //import r2 = require('m'); // would be error
    export import C = r; // no error
    C.m.foo();
}


//// [importAliasAnExternalModuleInsideAnInternalModule_file0.js]
(function (m) {
    function foo() {
    }
    m.foo = foo;
})(exports.m || (exports.m = {}));
var m = exports.m;
//// [importAliasAnExternalModuleInsideAnInternalModule_file1.js]
var r = require('importAliasAnExternalModuleInsideAnInternalModule_file0');
var m_private;
(function (m_private) {
    //import r2 = require('m'); // would be error
    var C = r;
    m_private.C = C;
    C.m.foo();
})(m_private || (m_private = {}));
