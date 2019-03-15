/// <reference path='fourslash.ts' />

// @Filename: f.ts
////function foo(/*a*/a: string, b: string/*b*/) { }
////export = foo;

// @Filename: a.ts
////import bar = require("./f");
////bar("a", "b");


goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `function foo({ a, b }: { a: string; b: string; }) { }
export = foo;`
});

goTo.file("a.ts");
verify.currentFileContentIs(`import bar = require("./f");
bar({ a: "a", b: "b" });`)