// #37813

/// <reference path="fourslash.ts" />

////function foo() {
////    /*1*/var x: number
////
////    x = 10;
////    return x;/*2*/
////}

goTo.select("1", "2");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_1",
  actionDescription: "Extract to function in global scope",
  newContent:
`function foo() {
    return /*RENAME*/newFunction();
}

function newFunction() {
    var x: number;

    x = 10;
    return x;
}
`
});
