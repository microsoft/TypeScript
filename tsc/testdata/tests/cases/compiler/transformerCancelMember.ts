// @strict: true
// @noEmit: true
// @lib: es2022,dom
// @target: es2022

// Regression test for https://github.com/microsoft/TypeScript/issues/65008
// WHATWG Streams defines Transformer.cancel; lib.dom must accept it.

const ts = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
        controller.enqueue(chunk);
    },
    cancel(reason) {
        void reason;
    },
});

declare function useStream(stream: TransformStream<Uint8Array, Uint8Array>): void;
useStream(ts);

// cancel may be async, matching TransformerCancelCallback / UnderlyingSourceCancelCallback.
new TransformStream({
    async cancel(reason) {
        await Promise.resolve(reason);
    },
});
