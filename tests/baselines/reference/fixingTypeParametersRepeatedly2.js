//// [fixingTypeParametersRepeatedly2.ts]
interface Base {
    baseProp;
}
interface Derived extends Base {
    toBase(): Base;
}

var derived: Derived;

declare function foo<T>(x: T, func: (p: T) => T): T;
var result = foo(derived, d => d.toBase());

// bar should type check just like foo.
// The same error should be observed in both cases.
declare function bar<T>(x: T, func: (p: T) => T): T;
declare function bar<T>(x: T, func: (p: T) => T): T;
var result = bar(derived, d => d.toBase());

//// [fixingTypeParametersRepeatedly2.js]
var derived;
var result = foo(derived, function (d) { return d.toBase(); });
var result = bar(derived, function (d) { return d.toBase(); });
