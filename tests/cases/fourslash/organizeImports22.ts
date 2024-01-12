/// <reference path="fourslash.ts" />

// @filename: /a.ts

//// import {abc, Abc} from 'b';
//// import {
////   I,
////   R,
////   M,
//// } from 'a';
//// console.log(abc, Abc, I, R, M);



verify.organizeImports(
`import {
    I,
    M,
    R,
} from 'a';
import { abc, Abc } from 'b';
console.log(abc, Abc, I, R, M);`);

verify.organizeImports(
`import {
    I,
    M,
    R,
} from 'a';
import { abc, Abc } from 'b';
console.log(abc, Abc, I, R, M);`);
