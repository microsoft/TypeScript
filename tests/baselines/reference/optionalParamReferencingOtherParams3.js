//// [tests/cases/compiler/optionalParamReferencingOtherParams3.ts] ////

//// [optionalParamReferencingOtherParams3.ts]
function right(a = b, b = a) {
    a;
    b;
}

//// [optionalParamReferencingOtherParams3.js]
function right(a = b, b = a) {
    a;
    b;
}
