//// [externalModuleExportingGenericClass_file0.js]
var C = (function () {
    function C() {
    }
    return C;
})();
module.exports = C;
//// [externalModuleExportingGenericClass_file1.js]
var a = require('externalModuleExportingGenericClass_file0');
var v;
var v2 = (new a()).foo;
var v3 = (new a()).foo;
