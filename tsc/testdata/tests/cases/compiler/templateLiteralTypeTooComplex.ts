// @strict: true

// Large template literal types with combinatorial explosion should produce an error, not hang.
type N = 0 | 1 | 2 | 3;
type T = `${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}${N}`;
