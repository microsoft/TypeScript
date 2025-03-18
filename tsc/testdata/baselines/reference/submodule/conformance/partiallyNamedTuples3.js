//// [tests/cases/conformance/types/tuple/named/partiallyNamedTuples3.ts] ////

//// [partiallyNamedTuples3.ts]
declare const tuple: [number, name: string, boolean, value: number, string];

const output = ((...args) => args)(...tuple);


//// [partiallyNamedTuples3.js]
const output = ((...args) => args)(...tuple);
