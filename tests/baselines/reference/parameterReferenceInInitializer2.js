//// [tests/cases/compiler/parameterReferenceInInitializer2.ts] ////

//// [parameterReferenceInInitializer2.ts]
function Example(x = function(x: any) { return x; }) { // Error: parameter 'x' cannot be 
                                                       // referenced in its initializer
}

//// [parameterReferenceInInitializer2.js]
function Example(x) {
    if (x === void 0) { x = function (x) { return x; }; }
    // referenced in its initializer
}
