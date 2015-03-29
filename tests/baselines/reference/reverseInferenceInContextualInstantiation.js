//// [reverseInferenceInContextualInstantiation.ts]
function compare<T>(a: T, b: T): number { return 0; }
var x: number[];
x.sort(compare); // Error, but shouldn't be


//// [reverseInferenceInContextualInstantiation.js]
function compare(a, b) { return 0; }
var x;
x.sort(compare); // Error, but shouldn't be
