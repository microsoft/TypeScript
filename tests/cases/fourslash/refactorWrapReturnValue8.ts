/// <reference path='fourslash.ts' />

//// function /*a*/foo/*b*/ (): string | number {
////     if (Math.random() < 0.5) {
////         return ""
////     }
////     return 42;
//// }
//// foo();

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Wrap return value",
    actionName: "Wrap return value into object",
    actionDescription: "Wrap return value into object",
    newContent: `function foo (): {
    /*RENAME*/value: string | number;
} {
    if (Math.random() < 0.5) {
        return { value: "" }
    }
    return { value: 42 };
}
foo().value;`,
});