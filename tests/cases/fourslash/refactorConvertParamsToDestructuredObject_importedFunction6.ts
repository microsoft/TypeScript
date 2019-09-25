/// <reference path='fourslash.ts' />

// @Filename: f.ts
////export function /*a*/foo/*b*/(a: string, b: string) { }

// @Filename: a.ts
////import * as f from "./f";
////f.foo("a", "b");


goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `export function foo({ a, b }: { a: string; b: string; }) { }`
});

goTo.file("a.ts");
verify.currentFileContentIs(`import * as f from "./f";
f.foo({ a: "a", b: "b" });`)