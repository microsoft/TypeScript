/// <reference path="fourslash.ts" />

//// function foo1 () {
////     return 1
//// }

//// function foo2 (): number {
////     return 1
//// }

//// class C {
////     foo() {
////         return 1
////     }
////     bar() {
////         return this
////     }
//// }

//// const a = () => 1

//// const b = function () { return 1 }

//// const c = (b) => 1
//// const d = b => 1

verify.baselineInlayHints(undefined, {
    includeInlayFunctionLikeReturnTypeHints: true,
    interactiveInlayHints: true,
});
