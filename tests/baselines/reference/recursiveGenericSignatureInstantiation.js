//// [recursiveGenericSignatureInstantiation.ts]
function f6<T>(x: T) {
    return f6(x);
}


//// [recursiveGenericSignatureInstantiation.js]
function f6(x) {
    return f6(x);
}
