//// [tests/cases/compiler/optionalParamReferencingOtherParams3.ts] ////

//// [optionalParamReferencingOtherParams3.ts]
function right(a = b, b = a) {
    a;
    b;
}

//// [optionalParamReferencingOtherParams3.js]
function right(a, b) {
    if (a === void 0) { a = b; }
    if (b === void 0) { b = a; }
    a;
    b;
}
