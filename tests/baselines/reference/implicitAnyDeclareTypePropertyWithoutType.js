//// [implicitAnyDeclareTypePropertyWithoutType.js]
var C = (function () {
    function C() {
    }
    return C;
})();

// this should be an error
var x;
var x1;
var x11;
var x2;
var x3;

// this should not be an error
var bar;
var foo;
var x4;
var x5;
