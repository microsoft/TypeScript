// @strict: true

declare var tuple: [boolean, number, ...string[]];

const [a, b, c, ...rest] = tuple;

declare var receiver: typeof tuple;

[...receiver] = tuple;

// Repros from #32140

const [oops1] = [1, 2, 3].reduce((accu, el) => accu.concat(el), []);

const [oops2] = [1, 2, 3].reduce((acc: number[], e) => acc.concat(e), []);
