//// [fixTypeParameterInSignatureWithRestParameters.ts]
function bar<T>(item1: T, item2: T) { }
bar(1, ""); // Should be ok

//// [fixTypeParameterInSignatureWithRestParameters.js]
function bar(item1, item2) { }
bar(1, ""); // Should be ok
