//// [typeParamExtendsOtherTypeParam.js]
var A = (function () {
    function A() {
    }
    return A;
})();
var B = (function () {
    function B() {
    }
    return B;
})();

// Below 2 should compile without error
var x;
var y;

// Below should be in error
var x1;
var x2;
var x3;
var x4;
var x5;
var x6;

var x7;
var x8;
