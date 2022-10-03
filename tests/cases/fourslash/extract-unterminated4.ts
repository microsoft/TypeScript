/// <reference path="fourslash.ts" />

// Unterminated template literal:
//// /*1*/const foo = /endsinbackslash\/*2*/

goTo.select("1", "2");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_0",
  actionDescription: "Extract to function in global scope",
  newContent: `const foo = /*RENAME*/newFunction()

function newFunction() {
    return /endsinbackslash\\ /;
}
`
});
