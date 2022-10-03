/// <reference path="fourslash.ts" />

//// const x = /*1*/function f()
//// {
////
////     console.log();
//// }/*2*/;

goTo.select("1", "2");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_0",
  actionDescription: "Extract to function in global scope",
  newContent:
`const x = /*RENAME*/newFunction();

function newFunction() {
    return function f() {

        console.log();
    };
}
`
});
