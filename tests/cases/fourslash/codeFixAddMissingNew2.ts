/// <reference path='fourslash.ts' />

////class C {
////}
////let x = (() => C)()();

verify.codeFix({
    description: "Add missing 'new' operator to call",
    index: 0,
    newFileContent:
`class C {
}
let x = new ((() => C)())();`
});
