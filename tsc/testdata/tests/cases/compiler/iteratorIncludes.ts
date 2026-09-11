// @target: esnext
// @lib: es2015, esnext.iterator
// @strict: true

const includes: boolean = Iterator.from([1, 2, 3]).includes(2);
const includesAfterSkipping: boolean = Iterator.from([1, 2, 3]).includes(2, 1);

Iterator.from([1, 2, 3]).includes("1");

Iterator.from([1, 2, 3]).includes(2, "1");
