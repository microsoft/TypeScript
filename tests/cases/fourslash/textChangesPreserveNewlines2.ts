/// <reference path="fourslash.ts" />

//// /*1*/1 +
////     2 +
////
////     3 +
////
////
////     4;/*2*/

goTo.select("1", "2");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_0",
  actionDescription: "Extract to function in global scope",
  newContent:
`/*RENAME*/newFunction();

function newFunction() {
    1 +
        2 +

        3 +


        4;
}
`
});
