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
    }
);