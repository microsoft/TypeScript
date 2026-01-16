// @strict: true

const { c, f }: string | number | symbol = { c: 0, f };
const { a, f: f1 }: string | number = { a: 0, f: (1 + f1) };
const { a: a1, f: f2 }: string | number = { a: f2, f: a1 };
