/// <reference path="fourslash.ts" />

//// declare function foo<T extends number>(t: T): T
//// const x/*a*/ = foo(1)

const markers = test.markers();
verify.getInlayHints([
    {
        text: `: 1`,
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
], undefined, {
    includeInlayVariableTypeHints: true
});
