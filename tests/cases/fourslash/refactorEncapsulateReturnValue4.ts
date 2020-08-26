/// <reference path='fourslash.ts' />

//// const foo = /*a*/function/*b*/() {
////     return 42;
//// }
//// foo();

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Encapsulate return value",
    actionName: "Wrap return value into object",
    actionDescription: "Wrap return value into object",
    newContent: `const foo = function() {
    return { /*RENAME*/value: 42 };
}
foo().value;`,
});
