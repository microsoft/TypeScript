//// [typeofExternalModules_external.js]
var C = (function () {
    function C() {
    }
    return C;
})();
exports.C = C;
//// [typeofExternalModules_exportAssign.js]
var D = (function () {
    function D() {
    }
    return D;
})();
module.exports = D;
//// [typeofExternalModules_core.js]
var ext = require('typeofExternalModules_external');
var exp = require('typeofExternalModules_exportAssign');

var y1 = ext;
y1 = exp;
var y2 = exp;
y2 = ext;
