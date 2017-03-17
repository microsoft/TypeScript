//// [exportBinding.ts]
export { x }
const x = 'x'

export { Y as Z }
class Y {}


//// [exportBinding.js]
"use strict";
exports.__esModule = true;
var x = 'x';
exports.x = x;
var Y = (function () {
    function Y() {
    }
    return Y;
}());
exports.Z = Y;
