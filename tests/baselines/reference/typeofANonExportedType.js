//// [typeofANonExportedType.js]
var x = 1;
exports.r1;
var y = { foo: '' };
exports.r2;
var C = (function () {
    function C() {
    }
    return C;
})();
exports.c;
var c2;

exports.r3;
exports.r4;
exports.r4b;

exports.i;
var i2;
exports.r5;
exports.r5;

var M;
(function (M) {
    M.foo = '';
    var C = (function () {
        function C() {
        }
        return C;
    })();
    M.C = C;
})(M || (M = {}));
exports.r6;
exports.r7;

exports.r8;
exports.r9;

var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
exports.r10;
exports.r11;

exports.r12;

function foo() {
}
var foo;
(function (foo) {
    foo.y = 1;
    var C = (function () {
        function C() {
        }
        return C;
    })();
    foo.C = C;
})(foo || (foo = {}));
exports.r13;
