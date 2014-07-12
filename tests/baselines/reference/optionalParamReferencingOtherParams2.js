//// [optionalParamReferencingOtherParams2.js]
var a = 1;
function strange(x, y) {
    if (typeof x === "undefined") { x = a; }
    if (typeof y === "undefined") { y = b; }
    var b = "";
    return y;
}
