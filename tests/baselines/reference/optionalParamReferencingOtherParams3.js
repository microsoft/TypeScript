//// [optionalParamReferencingOtherParams3.ts]
function right(a = b, b = a) {
    a;
    b;
}

//// [optionalParamReferencingOtherParams3.js]
function right() {
    var a = (arguments[0] === void 0) ? b : arguments[0];
    var b = (arguments[1] === void 0) ? a : arguments[1];
    a;
    b;
}
