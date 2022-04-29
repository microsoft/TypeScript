/// <reference path='fourslash.ts' />

////class C {
////}
////var c = C();

verify.codeFix({
    description: "Add missing 'new' operator to call",
    index: 0,
    newFileContent:
`class C {
}
var c = new C();`
});
