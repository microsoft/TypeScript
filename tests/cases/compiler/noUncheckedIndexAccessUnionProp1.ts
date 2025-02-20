// @strict: true
// @noUncheckedIndexedAccess: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/61225

const nums: { [k: string]: number } = Math.random() < 0.5 ? { a: 1 } : { b: 2 };
const str = { a: "hello" };

const hmm = Math.random() < 0.5 ? nums.a : str.a;
const wha = (Math.random() < 0.5 ? nums : str).a;
