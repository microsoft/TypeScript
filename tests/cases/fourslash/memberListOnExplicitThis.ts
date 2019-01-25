/// <reference path='fourslash.ts'/>

////interface Restricted {
////   n: number;
////}
////class C1 implements Restricted {
////   n: number;
////   m: number;
////   f(this: this) {this./*1*/} // test on 'this.'
////   g(this: Restricted) {this./*2*/}
////}
////function f(this: void) {this./*3*/}
////function g(this: Restricted) {this./*4*/}

verify.completions(
    {
        marker: "1",
        exact: [
            { name: "n", text: "(property) C1.n: number" },
            { name: "m", text: "(property) C1.m: number" },
            { name: "f", text: "(method) C1.f(this: this): void" },
            { name: "g", text: "(method) C1.g(this: Restricted): void" },
        ],
    },
    {
        marker: ["2", "4"],
        exact: { name: "n", text: "(property) Restricted.n: number" },
    },
    { marker: "3", exact: undefined },
);
