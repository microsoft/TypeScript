//// [tests/cases/compiler/optionalParamReferencingOtherParams2.ts] ////

//// [optionalParamReferencingOtherParams2.ts]
var a = 1;
function strange(x = a, y = b) { 
    var b = "";
    return y;
}

//// [optionalParamReferencingOtherParams2.js]
var a = 1;
function strange(x, y) {
    if (x === void 0) { x = a; }
    if (y === void 0) { y = b; }
    var b = "";
    return y;
}
