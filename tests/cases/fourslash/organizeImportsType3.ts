/// <reference path="fourslash.ts" />

//// import {
////     d, 
////     type d as D,
////     type c,
////     c as C,
////     b,
////     b as B,
////     type A,
////     a
//// } from './foo';
//// console.log(A, a, B, b, c, C, d, D);

verify.organizeImports(
`import {
    type A,
    b as B,
    c as C,
    type d as D,
    a,
    b,
    type c,
    d
} from './foo';
console.log(A, a, B, b, c, C, d, D);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: false, organizeImportsTypeOrder: "inline" }
);
