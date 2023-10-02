/// <reference path='fourslash.ts' />

// https://github.com/microsoft/TypeScript/issues/55323

////const doSomething = (i: number) => /*1*/(i + 2)/*2*/ * 5;

goTo.select("1", "2");
verify.not.refactorAvailable("Extract Symbol", "constant_scope_1", "Extract to constant in global scope");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "constant_scope_0",
    actionDescription: "Extract to constant in enclosing scope",
    newContent:
`const doSomething = (i: number) => {
    const newLocal = i + 2;
    return /*RENAME*/newLocal * 5;
};`
});
