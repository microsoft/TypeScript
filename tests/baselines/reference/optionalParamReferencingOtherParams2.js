//// [optionalParamReferencingOtherParams2.ts]
var a = 1;
function strange(x = a, y = b) { 
    var b = "";
    return y;
}

//// [optionalParamReferencingOtherParams2.js]
var a = 1;
function strange() {
    var x = (arguments[0] === void 0) ? a : arguments[0];
    var y = (arguments[1] === void 0) ? b : arguments[1];
    var b = "";
    return y;
}
