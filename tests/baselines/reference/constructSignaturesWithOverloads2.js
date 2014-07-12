//// [constructSignaturesWithOverloads2.js]
// No errors expected for basic overloads of construct signatures with merged declarations
// clodules
var C = (function () {
    function C(x) {
    }
    return C;
})();
var C;
(function (C) {
    C.x = 1;
})(C || (C = {}));

var r1 = new C(1, '');

var C2 = (function () {
    function C2(x) {
    }
    return C2;
})();
var C2;
(function (C2) {
    C2.x = 1;
})(C2 || (C2 = {}));

var r2 = new C2(1, '');


var i2;
var r4 = new i2(1, '');
var r5 = new i2(1, 1);
