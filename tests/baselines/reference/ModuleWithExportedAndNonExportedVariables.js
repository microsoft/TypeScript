//// [ModuleWithExportedAndNonExportedVariables.js]
var A;
(function (A) {
    A.x = 'hello world';
    var y = 12;
})(A || (A = {}));

var x;
var x = A.x;

// Error, since y is not exported
var y = A.y;
