//// [continueLabel.ts]
label1: for(var i = 0; i < 1; i++) {
    continue label1;
}

//// [continueLabel.js]
label1: for (var i = 0; i < 1; i++) {
    continue label1;
}
