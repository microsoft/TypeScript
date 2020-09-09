/// <reference path='fourslash.ts' />

//// function foo () {
////     return function /*a*/()/*b*/ { return 42 };
//// }
//// foo()();

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Wrap return value",
    actionName: "Wrap return value into object",
    actionDescription: "Wrap return value into object",
    newContent: `function foo () {
    return function () { return { /*RENAME*/value: 42 } };
}
foo()();`,
});
