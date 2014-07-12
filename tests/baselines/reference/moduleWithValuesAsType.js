//// [moduleWithValuesAsType.js]
var A;
(function (A) {
    var b = 1;
})(A || (A = {}));

var a; // no error
