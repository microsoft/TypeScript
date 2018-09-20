/// <reference path='fourslash.ts' />

// New function names should be totally new to the file

//// function fn() {
////     /*a*/console.log("hi");/*b*/
//// }
////
//// function newFunction() { }

goTo.select('a', 'b')
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_0",
    actionDescription: "Extract to inner function in function 'fn'",
    newContent:
`function fn() {
    /*RENAME*/newFunction_1();

    function newFunction_1() {
        console.log("hi");
    }
}

function newFunction() { }`
});
