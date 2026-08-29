// @target: esnext
// @lib: es2015, esnext.iterator
// @strict: true

const includes: boolean = Iterator.from([1, 2, 3]).includes(2);
const includesAfterSkipping: boolean = Iterator.from([1, 2, 3]).includes(2, 1);

// @ts-expect-error the searched value must match the iterator value
Iterator.from([1, 2, 3]).includes("1");

// @ts-expect-error skipped elements must be a number
Iterator.from([1, 2, 3]).includes(2, "1");
