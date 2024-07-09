/// <reference path='fourslash.ts' />
// @useDefineForClassFields: true

////class B {
////    p = 1
////}
////class C extends B {
////    p: number
////}
////class D extends B {
////    p: 1 | 2 | 3
////}

verify.codeFixAll({
    fixId: "addMissingDeclareProperty",
    fixAllDescription: "Prefix all incorrect property declarations with 'declare'",
    newFileContent: `class B {
    p = 1
}
class C extends B {
    declare p: number
}
class D extends B {
    declare p: 1 | 2 | 3
}`
});
