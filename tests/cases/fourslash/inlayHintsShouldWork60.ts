/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @Filename: /a.js
////class Foo {
////    #value = 0;
////    get foo() { return this.#value; }
////    set foo(value/**/) { this.#value = value; }
////}

const [marker] = test.markers();
verify.getInlayHints([
    {
        text: ': number',
        position: marker.position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    }
], undefined, {
    includeInlayFunctionParameterTypeHints: true
});
