/// <reference path='fourslash.ts' />

// @Filename: f.ts
////export default class {
////    /*a*/constructor/*b*/(a: string, b: string) { }
////}

// @Filename: a.ts
////import C from "./f";
////const c = new C("a", "b");


goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `export default class {
    constructor({ a, b }: { a: string; b: string; }) { }
}`
});

goTo.file("a.ts");
verify.currentFileContentIs(`import C from "./f";
const c = new C({ a: "a", b: "b" });`)