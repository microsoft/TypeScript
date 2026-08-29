// @target: esnext
// @lib: es2015, esnext.iterator
// @strict: true

const chunks: number[][] = Iterator.from([1, 2, 3]).chunks(2).toArray();

// @ts-expect-error chunk size must be a number
Iterator.from([1, 2, 3]).chunks("2");
