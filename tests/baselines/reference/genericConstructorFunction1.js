//// [genericConstructorFunction1.js]
function f1(args) {
    var v1;
    var v2 = v1['test'];
    v2(args);
    return new v2(args);
}

;
function f2(args) {
    var v1;
    var v2 = v1['test'];
    var y = v2(args);
    return new v2(args);
}
