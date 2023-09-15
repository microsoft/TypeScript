//// [tests/cases/compiler/parseGenericArrowRatherThanLeftShift.ts] ////

//// [parseGenericArrowRatherThanLeftShift.ts]
type Bar = ReturnType<<T>(x: T) => number>;
declare const a: Bar;

function foo<T>(_x: T) {}
const b = foo<<T>(x: T) => number>(() => 1);


//// [parseGenericArrowRatherThanLeftShift.js]
function foo(_x) { }
var b = foo(function () { return 1; });
