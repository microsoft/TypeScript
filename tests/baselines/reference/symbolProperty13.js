//// [symbolProperty13.ts]
class C {
    [Symbol.iterator]: { x; y };
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

//// [symbolProperty13.js]
var C = (function () {
    function C() {
    }
    return C;
})();
foo(new C);
var i;
bar(i);
