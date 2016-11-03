//// [defaultParameterAddsUndefinedWithStrictNullChecks.ts]
function f(addUndefined1 = "J", addUndefined2?: number) {
}


//// [defaultParameterAddsUndefinedWithStrictNullChecks.js]
function f(addUndefined1, addUndefined2) {
    if (addUndefined1 === void 0) { addUndefined1 = "J"; }
}
