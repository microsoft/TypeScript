/// <reference path='fourslash.ts' />
// @noImplicitAny: false
////function coll(callback) {
////}
 verify.codeFix({
    description: "Infer parameter types from usage",
    index: 0,
    newFileContent:
`function coll(callback: any) {
}`,
});
