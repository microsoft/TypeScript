//// [typeofAmbientExternalModules_0.js]
var C = (function () {
    function C() {
    }
    return C;
})();
exports.C = C;
//// [typeofAmbientExternalModules_1.js]
var D = (function () {
    function D() {
    }
    return D;
})();
module.exports = D;
//// [typeofAmbientExternalModules_2.js]
///<reference path='typeofAmbientExternalModules_0.ts'/>
///<reference path='typeofAmbientExternalModules_1.ts'/>
var ext = require('typeofAmbientExternalModules_0');
var exp = require('typeofAmbientExternalModules_1');

var y1 = ext;
y1 = exp;
var y2 = exp;
y2 = ext;
