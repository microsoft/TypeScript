//// [tests/cases/compiler/optionalParamReferencingOtherParams1.ts] ////

//// [optionalParamReferencingOtherParams1.ts]
function strange(x: number, y = x * 1, z = x + y) {
    return z;
}

//// [optionalParamReferencingOtherParams1.js]
"use strict";
function strange(x, y = x * 1, z = x + y) {
    return z;
}
