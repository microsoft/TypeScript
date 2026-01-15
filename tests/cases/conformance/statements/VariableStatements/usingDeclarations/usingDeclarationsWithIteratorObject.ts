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

function f() {
    // should pass
    using it0 = io;
    using it1 = g;
    using it2 = Iterator.from(i)
    using it3 = new MyIterator();
    using it4 = [].values();
    using it5 = new Map<string, string>().entries();
    using it6 = new Set<string>().keys();

    // should fail
    using it7 = i;
}
