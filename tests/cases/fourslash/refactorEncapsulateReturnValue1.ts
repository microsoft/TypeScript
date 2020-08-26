/// <reference path='fourslash.ts' />

//// function /*a*/foo/*b*/ () {
////     return 42;
//// }
//// foo();

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Encapsulate return value",
    actionName: "Wrap return value into object",
    actionDescription: "Wrap return value into object",
    newContent: `function foo () {
    return { /*RENAME*/value: 42 };
}
foo().value;`,
});
