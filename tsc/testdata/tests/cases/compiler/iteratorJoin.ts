// @target: esnext
// @lib: es2015, esnext.iterator
// @strict: true

const a: string = Iterator.from([1, 2, 3]).join("-");
const b: string = Iterator.from([1, 2, 3]).join();

Iterator.from([1, 2, 3]).join(0);
