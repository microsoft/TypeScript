// @strict: true
// @noEmit: true

const f1: (...args: [number, string, ...boolean[]] | [string, number, ...boolean[]]) => void = (a, b, c) => {};

const f2: (x: string, ...args: [string] | [number, boolean]) => void = (a, b, c) => {};

const f3: (...args: [type: "one"] | [type: "two", x: string]) => void = (type, x) => {}

const f4: (...args: [type: "one", x?: number] | [type: "two", x: string]) => void = (type, x) => {}
