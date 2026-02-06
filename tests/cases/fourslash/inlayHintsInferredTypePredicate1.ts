/// <reference path="fourslash.ts" />

// @strict: true

//// function test(x: unknown) {
////   return typeof x === 'number';
//// }

verify.baselineInlayHints(undefined, {
  includeInlayFunctionLikeReturnTypeHints: true,
});
