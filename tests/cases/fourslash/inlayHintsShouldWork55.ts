/// <reference path="fourslash.ts" />

////class Foo {
////    get foo()/*a*/ { return 1; }
////    set foo(value: number)/*b*/ {}
////}

const [a, b] = test.markers();

verify.getInlayHints([
    {
        text: ': number',
        position: a.position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ': void',
        position: b.position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
], undefined, {
    includeInlayFunctionLikeReturnTypeHints: true
});
