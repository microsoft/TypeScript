//// [tests/cases/compiler/parameterReferenceInInitializer2.ts] ////

//// [parameterReferenceInInitializer2.ts]
function Example(x = function(x: any) { return x; }) { // Error: parameter 'x' cannot be 
                                                       // referenced in its initializer
}

//// [parameterReferenceInInitializer2.js]
function Example(x = function (x) { return x; }) {
}
