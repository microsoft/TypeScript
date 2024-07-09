/// <reference path="fourslash.ts" />

//// /*1*/console.log(1);
//// 
//// console.log(2);
//// 
//// console.log(3);/*2*/

goTo.select("1", "2");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_0",
  actionDescription: "Extract to function in global scope",
  newContent:
`/*RENAME*/newFunction();

function newFunction() {
    console.log(1);

    console.log(2);

    console.log(3);
}
`
});
