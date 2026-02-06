/// <reference path="fourslash.ts" />

//// import {abc, Abc, type bc, type Bc} from 'b';
//// import {
////   I,
////   R,
////   M,
//// } from 'a';
//// type x = bc | Bc;
//// console.log(abc, Abc, I, R, M);

verify.organizeImports(
`import {
    I,
    M,
    R,
} from 'a';
import { abc, Abc, type bc, type Bc } from 'b';
type x = bc | Bc;
console.log(abc, Abc, I, R, M);`);

// organize already-organized imports to make sure output is stable
verify.organizeImports(
`import {
    I,
    M,
    R,
} from 'a';
import { abc, Abc, type bc, type Bc } from 'b';
type x = bc | Bc;
console.log(abc, Abc, I, R, M);`);
