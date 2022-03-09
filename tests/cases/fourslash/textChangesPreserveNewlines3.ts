/// <reference path="fourslash.ts" />

//// /*1*/app
////     .use(foo)
////
////     .use(bar)
////
////
////     .use(
////         baz,
////
////         blob);/*2*/

goTo.select("1", "2");
edit.applyRefactor({
  refactorName: "Extract Symbol",
  actionName: "function_scope_0",
  actionDescription: "Extract to function in global scope",
  newContent:
`/*RENAME*/newFunction();

function newFunction() {
    app
        .use(foo)

        .use(bar)


        .use(
            baz,

            blob);
}
`
});
