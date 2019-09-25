/// <reference path='fourslash.ts' />

// @Filename: f.ts
////export { foo as default };
////function /*a*/foo/*b*/(a: number, b: number) {
////    return a + b;
////}

// @Filename: a.ts
////import bar from "./f";
////bar(1, 2);


goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `export { foo as default };
function foo({ a, b }: { a: number; b: number; }) {
    return a + b;
}`
});

goTo.file("a.ts");
verify.currentFileContentIs(`import bar from "./f";
bar({ a: 1, b: 2 });`)