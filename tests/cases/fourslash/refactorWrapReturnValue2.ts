/// <reference path='fourslash.ts' />

//// const foo = /*a*/()/*b*/ => {
////     return 42;
//// }
//// foo();

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Wrap return value",
    actionName: "Wrap return value into object",
    actionDescription: "Wrap return value into object",
    newContent: `const foo = () => {
    return { /*RENAME*/value: 42 };
}
foo().value;`,
});
