/// <reference path="fourslash.ts" />

// Unterminated template literal:
//// /*1*/const foo = `head${middle}tail/*2*/

goTo.select("1", "2");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_0",
  actionDescription: "Extract to function in global scope",
  newContent: `const foo = /*RENAME*/newFunction()

function newFunction() {
    return \`head\${middle}tail\`;
}
`
});
