//// [optionalParamReferencingOtherParams1.ts]
function strange(x: number, y = x * 1, z = x + y) {
    return z;
}

//// [optionalParamReferencingOtherParams1.js]
function strange(x, y, z) {
    if (typeof y === "undefined") { y = x * 1; }
    if (typeof z === "undefined") { z = x + y; }
    return z;
}
