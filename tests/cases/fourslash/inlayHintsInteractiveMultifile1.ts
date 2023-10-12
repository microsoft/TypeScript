/// <reference path="fourslash.ts" />

// @Filename: /a.ts
//// export interface Foo { a: string }

// @Filename: /b.ts
//// async function foo () {
////     return {} as any as import('./a').Foo
//// }
//// function bar () { return import('./a') }
//// async function main () {
////     const a = await foo()
////     const b = await bar()
//// }

goTo.file('/b.ts')
verify.baselineInlayHints(undefined, {
    includeInlayVariableTypeHints: true,
    includeInlayFunctionLikeReturnTypeHints: true,
    interactiveInlayHints: true
});
