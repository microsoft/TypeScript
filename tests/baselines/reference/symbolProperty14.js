//// [tests/cases/conformance/es6/Symbols/symbolProperty14.ts] ////

//// [symbolProperty14.ts]
class C {
    [Symbol.iterator]: { x; y };
}
interface I {
    [Symbol.iterator]?: { x };
}

declare function foo(i: I): I;
declare function foo(a: any): any;

declare function bar(i: C): C;
declare function bar(a: any): any;

foo(new C);
var i: I;
bar(i);

//// [symbolProperty14.js]
class C {
}
Symbol.iterator;
foo(new C);
var i;
bar(i);
