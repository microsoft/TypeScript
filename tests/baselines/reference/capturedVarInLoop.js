//// [tests/cases/compiler/capturedVarInLoop.ts] ////

//// [capturedVarInLoop.ts]
for (var i = 0; i < 10; i++) {
    var str = 'x', len = str.length;
    let lambda1 = (y) => { };
    let lambda2 = () => lambda1(len);
}

//// [capturedVarInLoop.js]
var _loop_1 = function () {
    str = 'x', len = str.length;
    var lambda1 = function (y) { };
    var lambda2 = function () { return lambda1(len); };
};
var str, len;
for (var i = 0; i < 10; i++) {
    _loop_1();
}
