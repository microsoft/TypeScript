/// <reference path="fourslash.ts" />

// Regression test for bug #41417

//// import {
////     d, d as D,
////     c,
////     c as C, b,
////     b as B, a
//// } from './foo';
//// import {
////     h, h as H,
////     g,
////     g as G, f,
////     f as F, e
//// } from './foo';
//// 
//// console.log(a, B, b, c, C, d, D);
//// console.log(e, f, F, g, G, H, h);

verify.organizeImports(
`import {
    a,
    b,
    b as B,
    c,
    c as C,
    d, d as D,
    e,
    f,
    f as F,
    g,
    g as G,
    h, h as H
} from './foo';

console.log(a, B, b, c, C, d, D);
console.log(e, f, F, g, G, H, h);`,
/*mode*/ undefined,
{ organizeImportsIgnoreCase: true });

verify.organizeImports(
`import {
    b as B,
    c as C,
    d as D,
    f as F,
    g as G,
    h as H,
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h
} from './foo';

console.log(a, B, b, c, C, d, D);
console.log(e, f, F, g, G, H, h);`, /*mode*/ undefined, { organizeImportsIgnoreCase: false });
