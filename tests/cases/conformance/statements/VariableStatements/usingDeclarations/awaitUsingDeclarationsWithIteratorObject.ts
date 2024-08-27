// @target: esnext
// @module: esnext
// @lib: esnext
// @noEmit: true

declare const i: Iterator<string, undefined>;
declare const io: IteratorObject<string, undefined, unknown>;
declare const g: Generator<string, void>;

class MyIterator extends Iterator<string> {
    next() { return { done: true, value: undefined }; }
}

async function f() {
    // should pass
    await using it0 = io;
    await using it1 = g;
    await using it2 = Iterator.from(i)
    await using it3 = new MyIterator();
    await using it4 = [].values();
    await using it5 = new Map<string, string>().entries();
    await using it6 = new Set<string>().keys();

    // should fail
    await using it7 = i;
}
