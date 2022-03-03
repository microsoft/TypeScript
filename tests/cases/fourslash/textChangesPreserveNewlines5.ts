/// <reference path="fourslash.ts" />

//// /*1*/f // call expression
//// (arg)(
////     /** @type {number} */
////     blah,
////
////     blah
////
//// );/*2*/

goTo.select("1", "2");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_0",
  actionDescription: "Extract to function in global scope",
  newContent:
`/*RENAME*/newFunction();

function newFunction() {
    f // call expression
        (arg)(
            /** @type {number} */
            blah,

            blah

        );
}
`
});
