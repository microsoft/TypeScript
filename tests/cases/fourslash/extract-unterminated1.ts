/// <reference path="fourslash.ts" />

// Unterminated RegExp literal:
//// /*1*/const foo = /asdfasf/*2*/

goTo.select("1", "2");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_0",
  actionDescription: "Extract to function in global scope",
  newContent: `const foo = /*RENAME*/newFunction()

function newFunction() {
    return /asdfasf/;
}
`
});
