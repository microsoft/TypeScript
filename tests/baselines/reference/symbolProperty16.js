//// [symbolProperty16.ts]
class C {
    private [Symbol.iterator]: { x };
}
interface I {
    [Symbol.iterator]: { x };
}

declare function foo(i: I): I;
declare function foo(a: any): any;

declare function bar(i: C): C;
declare function bar(a: any): any;

foo(new C);
var i: I;
bar(i);

//// [symbolProperty16.js]
class C {
}
Symbol.iterator;
foo(new C);
var i;
bar(i);
