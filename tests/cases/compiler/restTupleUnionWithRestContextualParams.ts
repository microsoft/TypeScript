// @strict: true
// @noEmit: true

const f1: (...args: [number, string, ...boolean[]] | [string, number, ...boolean[]]) => void = (a, b, c) => {};

const f2: (x: string, ...args: [string] | [number, boolean]) => void = (a, b, c) => {};
