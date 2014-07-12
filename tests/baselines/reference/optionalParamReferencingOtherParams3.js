//// [optionalParamReferencingOtherParams3.js]
function right(a, b) {
    if (typeof a === "undefined") { a = b; }
    if (typeof b === "undefined") { b = a; }
    a;
    b;
}
