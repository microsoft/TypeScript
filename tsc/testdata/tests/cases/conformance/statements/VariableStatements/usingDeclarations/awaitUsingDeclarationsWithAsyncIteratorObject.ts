// @target: esnext
// @module: esnext
// @lib: esnext
// @noEmit: true

declare const ai: AsyncIterator<string, undefined>;
declare const aio: AsyncIteratorObject<string, undefined, unknown>;
declare const ag: AsyncGenerator<string, void>;

async function f() {
    // should pass
    await using it0 = aio;
    await using it1 = ag;

    // should fail
    await using it2 = ai;
}
