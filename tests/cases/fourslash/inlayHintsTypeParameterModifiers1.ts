///<reference path="fourslash.ts" />

//// function test1() {
////   return function <const T>(a: T) {};
//// }

verify.baselineInlayHints(undefined, {
  interactiveInlayHints: true,
  includeInlayFunctionLikeReturnTypeHints: true,
});
