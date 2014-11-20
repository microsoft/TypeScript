//// [optionalParamReferencingOtherParams1.ts]
function strange(x: number, y = x * 1, z = x + y) {
    return z;
}

//// [optionalParamReferencingOtherParams1.js]
function strange(x) {
    var y = (arguments[1] === void 0) ? x * 1 : arguments[1];
    var z = (arguments[2] === void 0) ? x + y : arguments[2];
    return z;
}
