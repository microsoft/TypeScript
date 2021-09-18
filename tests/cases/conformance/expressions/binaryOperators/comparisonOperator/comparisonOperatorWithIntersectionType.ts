// Regression test for GH#45489

declare let foo: { a: number } & { id: number }
const bar = foo > 1;