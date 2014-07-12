//// [voidAsNonAmbiguousReturnType_0.js]
function mkdirSync(path, mode) {
}
exports.mkdirSync = mkdirSync;
//// [voidAsNonAmbiguousReturnType_1.js]
///<reference path='voidAsNonAmbiguousReturnType_0.ts'/>
var fs = require("voidAsNonAmbiguousReturnType_0");

function main() {
    fs.mkdirSync('test'); // should not error - return types are the same
}
