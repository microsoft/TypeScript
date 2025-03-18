//// [tests/cases/compiler/restParameterWithBindingPattern1.ts] ////

//// [restParameterWithBindingPattern1.ts]
function a(...{a, b}) { }

//// [restParameterWithBindingPattern1.js]
function a(...{ a, b }) { }
