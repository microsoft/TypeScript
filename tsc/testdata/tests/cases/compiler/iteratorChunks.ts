// @target: esnext
// @lib: es2015, esnext.iterator
// @strict: true

const chunks: number[][] = Iterator.from([1, 2, 3]).chunks(2).toArray();

Iterator.from([1, 2, 3]).chunks("2");
