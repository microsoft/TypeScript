type A = { a: string, b: string };
const extra1 = { a: "a", b: "b", extra: "extra" };
const a1: A = { ...extra1 }; // spread should not give excess property errors
