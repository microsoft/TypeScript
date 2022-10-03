//// [ModuleWithExportedAndNonExportedVariables.ts]
module A {
    export var x = 'hello world'
    var y = 12;
}


var x: string;
var x = A.x;

// Error, since y is not exported
var y = A.y;


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
