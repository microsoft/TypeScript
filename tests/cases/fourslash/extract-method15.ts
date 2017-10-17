/// <reference path='fourslash.ts' />

// Extracting an increment expression (not statement) should do the right thing,
// including not generating extra destructuring unless needed

//// function foo() {
////     var i = 10;
////     /*a*/i++/*b*/;
//// }

goTo.select('a', 'b');
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_1",
    actionDescription: "Extract to function in global scope",
    newContent:
`function foo() {
    var i = 10;
    i = /*RENAME*/newFunction(i);
}

function newFunction(i: number) {
    i++;
    return i;
}
`
});
