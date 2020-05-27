/// <reference path='fourslash.ts' />

// @Filename: f.ts
////export class C {
////    /*a*/constructor/*b*/(a: number, b: number) { }
////}

// @Filename: a.ts
////import f = require("./f");
////const c = new f.C(1, 2);
////const c1 = new f["C"](1, 2);


goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `export class C {
    constructor({ a, b }: { a: number; b: number; }) { }
}`
});

goTo.file("a.ts");
verify.currentFileContentIs(`import f = require("./f");
const c = new f.C({ a: 1, b: 2 });
const c1 = new f["C"]({ a: 1, b: 2 });`)