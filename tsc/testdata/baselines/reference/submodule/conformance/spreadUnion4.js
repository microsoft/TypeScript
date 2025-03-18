//// [tests/cases/conformance/types/spread/spreadUnion4.ts] ////

//// [spreadUnion4.ts]
declare const a: { x: () => void }
declare const b: { x?: () => void }

const c = { ...a, ...b };


//// [spreadUnion4.js]
const c = { ...a, ...b };
