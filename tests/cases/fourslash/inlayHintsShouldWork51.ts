/// <reference path="fourslash.ts" />

// @Filename: /a.ts
//// export interface Foo { a: string }

// @Filename: /b.ts
//// async function foo ()/*a*/ {
////     return {} as any as import('./a').Foo
//// }
//// function bar ()/*b*/ { return import('./a') }
//// async function main ()/*c*/ {
////     const a/*d*/ = await foo()
////     const b = await bar()
//// }

goTo.file('/b.ts')
const markers = test.markers();
verify.getInlayHints([
    {
        text: ': Promise<Foo>',
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ': Promise<typeof import("/a")>',
        position: markers[1].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ': Promise<void>',
        position: markers[2].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ': Foo',
        position: markers[3].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    }
], undefined, {
    includeInlayVariableTypeHints: true,
    includeInlayFunctionLikeReturnTypeHints: true
});
