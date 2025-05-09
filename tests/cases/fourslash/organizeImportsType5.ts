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

verify.organizeImports(`import {
    type A,
    a,
    b,
    b as B,
    type c,
    c as C,
    d,
    type d as D
} from './foo';
console.log(A, a, B, b, c, C, d, D);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto", organizeImportsTypeOrder: "inline" }
);

verify.organizeImports(`import {
    type A,
    a,
    b,
    b as B,
    type c,
    c as C,
    d,
    type d as D
} from './foo';
console.log(A, a, B, b, c, C, d, D);`,
    /*mode*/ undefined,
    { organizeImportsIgnoreCase: "auto", organizeImportsTypeOrder: "inline" }
);