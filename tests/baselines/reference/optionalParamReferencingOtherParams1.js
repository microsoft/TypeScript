//// [optionalParamReferencingOtherParams1.ts]
function strange(x: number, y = x * 1, z = x + y) {
    return z;
}

//// [optionalParamReferencingOtherParams1.js]
function strange(x, y, z) {
    if (y === void 0) { y = x * 1; }
    if (z === void 0) { z = x + y; }
    return z;
}
