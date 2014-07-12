//// [sourceMapValidationImport.ts]
export module m {
    export class c {
    }
}
import a = m.c;
export import b = m.c;
var x = new a();
var y = new b();

//// [sourceMapValidationImport.js]
(function (m) {
    var c = (function () {
        function c() {
        }
        return c;
    })();
    m.c = c;
})(exports.m || (exports.m = {}));
var m = exports.m;
var a = m.c;
var b = m.c;
exports.b = b;
var x = new a();
var y = new exports.b();
//# sourceMappingURL=sourceMapValidationImport.js.map
