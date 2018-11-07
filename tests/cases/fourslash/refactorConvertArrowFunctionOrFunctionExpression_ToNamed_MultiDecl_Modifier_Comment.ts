/// <reference path='fourslash.ts' />

//// // Do not add me second time
//// export let foo, bar = /*x*/(/*y*/) => 1 + 1;

goTo.select("x", "y");
edit.applyRefactor({
    refactorName: "Convert arrow function or function expression",
    actionName: "Convert to named function",
    actionDescription: "Convert to named function",
    newContent: `// Do not add me second time
export let foo;
export function bar() {
    return 1 + 1;
}
`,
});
