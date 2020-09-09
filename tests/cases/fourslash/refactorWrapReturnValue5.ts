/// <reference path='fourslash.ts' />

//// function /*a*/foo/*b*/ () {
////     return 42;
//// }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Wrap return value",
    actionName: "Wrap return value into object",
    actionDescription: "Wrap return value into object",
    newContent: `function foo () {
    return { /*RENAME*/value: 42 };
}`,
});
