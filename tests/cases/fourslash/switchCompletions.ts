/// <reference path="fourslash.ts" />

//// enum E { A, B }
//// declare const e: E;
//// switch (e) {
////     case E.A:
////         return 0;
////     case E./*1*/
//// }
//// declare const f: 1 | 2 | 3;
//// switch (f) {
////     case 1:
////         return 1;
////     case /*2*/
//// }
//// declare const f2: 'foo' | 'bar' | 'baz';
//// switch (f2) {
////     case 'bar':
////         return 1;
////     case '/*3*/'
//// }
////
//// // repro from #52874
//// declare let x: "foo" | "bar";
//// switch (x) {
////     case ('/*4*/')
//// }

verify.completions(
    {
        marker: "1",
        isNewIdentifierLocation: false,
        includes: ["B"],
        excludes: "A",
    },
    {
        marker: "2",
        isNewIdentifierLocation: false,
        excludes: "1",
        includes: ["2", "3"],
    },
    {
        marker: "3",
        isNewIdentifierLocation: false,
        includes: ["foo", "baz"],
        excludes: "bar",
    },
    {
        marker: "4",
        isNewIdentifierLocation: false,
        includes: ["foo", "bar"],
    }
);
