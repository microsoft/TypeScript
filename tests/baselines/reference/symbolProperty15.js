//// [tests/cases/conformance/es6/Symbols/symbolProperty15.ts] ////

//// [symbolProperty15.ts]
class C { }
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

//// [symbolProperty15.js]
class C {
}
foo(new C);
var i;
bar(i);
