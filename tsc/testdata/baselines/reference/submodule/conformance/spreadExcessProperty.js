//// [tests/cases/conformance/types/spread/spreadExcessProperty.ts] ////

//// [spreadExcessProperty.ts]
type A = { a: string, b: string };
const extra1 = { a: "a", b: "b", extra: "extra" };
const a1: A = { ...extra1 }; // spread should not give excess property errors


//// [spreadExcessProperty.js]
const extra1 = { a: "a", b: "b", extra: "extra" };
const a1 = { ...extra1 };
