/// <reference path="fourslash.ts" />

////class Foo {
////    #value = 0;
////    get foo(): number { return this.#value; }
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
