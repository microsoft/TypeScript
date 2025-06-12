//// [tests/cases/compiler/capturedVarInLoop.ts] ////

//// [capturedVarInLoop.ts]
for (var i = 0; i < 10; i++) {
    var str = 'x', len = str.length;
    let lambda1 = (y) => { };
    let lambda2 = () => lambda1(len);
}

//// [capturedVarInLoop.js]
for (var i = 0; i < 10; i++) {
    var str = 'x', len = str.length;
    let lambda1 = (y) => { };
    let lambda2 = () => lambda1(len);
}
