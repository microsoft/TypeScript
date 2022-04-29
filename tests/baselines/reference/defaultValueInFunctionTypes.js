//// [defaultValueInFunctionTypes.ts]
var x: (a: number = 1) => number;
var y = <(a : string = "") => any>(undefined)

//// [defaultValueInFunctionTypes.js]
var x;
var y = (undefined);
