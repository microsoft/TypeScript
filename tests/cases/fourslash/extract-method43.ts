/// <reference path='fourslash.ts' />

////function foo() {
////	const x = 10 * /*a*/((((((10 + 10))))))/*b*/;
////}

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to function in global scope",
    newContent:
`function foo() {
	const x = 10 * /*RENAME*/newFunction();
}

function newFunction() {
    return 10 + 10;
}
`
});
