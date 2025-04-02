//// [tests/cases/compiler/defaultValueInFunctionTypes.ts] ////

//// [defaultValueInFunctionTypes.ts]
type Foo = ({ first = 0 }: { first?: number }) => unknown;

var x: (a: number = 1) => number;
var y = <(a : string = "") => any>(undefined)


//// [defaultValueInFunctionTypes.js]
var x;
var y = (undefined);
