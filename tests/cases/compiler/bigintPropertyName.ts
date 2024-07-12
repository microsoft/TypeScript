// @target: esnext

{ ({1n: 123}); };
const arr = [1, 2, 3] as const;

const { 0n: f } = arr; // bigint should give an index error
const { 0: d } = arr;
const { "0": e } = arr;
