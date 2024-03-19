/// <reference path="fourslash.ts" />

//// import {abc, Abc, bc, Bc} from 'b';
//// import {
////   I,
////   R,
////   M,
//// } from 'a';
//// console.log(abc, Abc, bc, Bc, I, R, M);

verify.organizeImports(
`import {
    I,
    M,
    R,
} from 'a';
import { abc, Abc, bc, Bc } from 'b';
console.log(abc, Abc, bc, Bc, I, R, M);`);
 
// organize already-organized imports to make sure output is stable
verify.organizeImports(
`import {
    I,
    M,
    R,
} from 'a';
import { abc, Abc, bc, Bc } from 'b';
console.log(abc, Abc, bc, Bc, I, R, M);`);
