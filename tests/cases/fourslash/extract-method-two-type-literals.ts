/// <reference path='fourslash.ts' />

////(x: {}, y: {}) => (/*1*/x + y/*2*/);

goTo.select("1", "2");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_0",
    actionDescription: "Extract to function in global scope",
    newContent:
`(x: {}, y: {}) => (/*RENAME*/newFunction(x, y));

function newFunction(x: {}, y: {}) {
    return x + y;
}
`
});
