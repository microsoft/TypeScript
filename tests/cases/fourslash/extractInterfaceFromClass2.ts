/// <reference path='fourslash.ts' />

//// /*0*/class C1 {
//// }/*1*/

verify.codeRefactor(`
interface newInterface_C1 {
}
class C1 implements newInterface_C1{
}
`);