/// <reference path='fourslash.ts' />

// @Filename: c.ts
////export { C };
////class C {
////    /*a*/constructor/*b*/(a: number, b: number) { }
////}

// @Filename: a.ts
////export { C as A } from "./c";

// @Filename: b.ts
////import { A } from "./a";
////const c = new A(42, 43);


goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `export { C };
class C {
    constructor({ a, b }: { a: number; b: number; }) { }
}`
});

goTo.file("a.ts");
verify.currentFileContentIs(`export { C as A } from "./c";`)

goTo.file("b.ts");
verify.currentFileContentIs(`import { A } from "./a";
const c = new A({ a: 42, b: 43 });`)