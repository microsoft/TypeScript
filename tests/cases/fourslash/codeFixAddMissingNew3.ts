/// <reference path='fourslash.ts' />

////class C {
////}
////let x = [C];
////let a = x[0]();

verify.codeFix({
    description: "Add missing 'new' operator to call",
    index: 0,
    newFileContent:
`class C {
}
let x = [C];
let a = new x[0]();`
});
