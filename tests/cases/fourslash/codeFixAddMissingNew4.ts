/// <reference path='fourslash.ts' />

////class C {
////}
////class D {
////}
////let x = (true ? C : D)();

verify.codeFix({
    description: "Add missing 'new' operator to call",
    index: 0,
    newFileContent:
`class C {
}
class D {
}
let x = new (true ? C : D)();`
});
