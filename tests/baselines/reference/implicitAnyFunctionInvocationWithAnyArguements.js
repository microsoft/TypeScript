//// [implicitAnyFunctionInvocationWithAnyArguements.js]
// this should be errors
var arg0 = null;
var anyArray = [null, undefined];
var objL;
var funcL;
function temp1(arg1) {
}
function testFunctionExprC(subReplace) {
}
function testFunctionExprC2(eq) {
}
;
function testObjLiteral(objLit) {
}
;
function testFuncLiteral(funcLit) {
}
;

// this should not be an error
testFunctionExprC2(function (v1, v2) {
    return 1;
});
testObjLiteral(objL);
testFuncLiteral(funcL);

var k = temp1(null);
var result = temp1(arg0);
var result1 = temp1(anyArray);

function noError(variable, array) {
}
noError(null, []);
noError(undefined, []);
noError(null, [null, undefined]);
noError(undefined, anyArray);

var C = (function () {
    function C(emtpyArray, variable) {
    }
    return C;
})();

var newC = new C([], undefined);
var newC1 = new C([], arg0);
var newC2 = new C([], null);
