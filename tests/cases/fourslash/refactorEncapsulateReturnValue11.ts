/// <reference path='fourslash.ts' />

//// const foo = /*a*/()/*b*/ => 42;
//// foo();

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Encapsulate return value",
    actionName: "Wrap return value into object",
    actionDescription: "Wrap return value into object",
    newContent: `const foo = () => ({ /*RENAME*/value: 42 });
foo().value;`,
});

