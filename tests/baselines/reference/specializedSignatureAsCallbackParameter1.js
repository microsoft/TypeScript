//// [specializedSignatureAsCallbackParameter1.js]
function x3(a, cb) {
    cb(a);
}

// both are errors
x3(1, function (x) {
    return 1;
});
x3(1, function (x) {
    return 1;
});
