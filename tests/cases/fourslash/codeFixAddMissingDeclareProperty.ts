/// <reference path='fourslash.ts' />
// @strict: false
// @useDefineForClassFields: true

////class B {
////    p = 1
////}
////class C extends B {
////    p: number
////}

verify.codeFix({
    description: "Prefix with 'declare'",
    newFileContent: `class B {
    p = 1
}
class C extends B {
    declare p: number
}`
});
