/// <reference path="fourslash.ts" />

////class C1 {
////    public a: string;
////    protected b: string;
////    private c: string;
////
////    constructor(a: string, b = "", c = "") {
////        this.a = a;
////        this.b = b;
////        this.c = c;
////    }
////}
////class C2 {
////    public a: string;
////    constructor(a: string) {
////        this.a = a;
////    }
////}
////function f1(foo: C1 | C2 | { d: number }) {}
////f1({ /*1*/ });

////function f2(foo: C1 | C2) {}
////f2({ /*2*/ });
////
////function f3(foo: C2) {}
////f3({ /*3*/ });

verify.completions({
    marker: "1",
    exact: ["a", "d"],
}, {
    marker: "2",
    exact: ["a"]
}, {
    marker: "3",
    exact: ["a"]
});
