// @strict: true
// @noEmit: true

const f1: (...args: [number, string, ...boolean[]] | [string, number, ...boolean[]]) => void = (a, b, c) => {};

const f2: (x: string, ...args: [string] | [number, boolean]) => void = (a, b, c) => {};

const f3: (...args: [type: "one"] | [type: "two", x: string]) => void = (type, x) => {}

const f4: (...args: [type: "one", x?: number] | [type: "two", x: string]) => void = (type, x) => {}

// #45972
type Fn1 = (...args: [...strs: string[], num1: number, num2: number]) => void;
const f5: Fn1 = () => {}
const f6: Fn1 = (arg1) => {}
const f7: Fn1 = (arg1, arg2) => {}
const f8: Fn1 = (arg1, arg2, arg3) => {}

// #45972#issuecomment-1140417029
const f9: Fn1 = (...[arg1]: [string | number]) => {}
const f10: Fn1 = (...[arg1, arg2]: [string | number, string | number]) => {}
const f11: Fn1 = (...[arg1, arg2, arg3]: [string | number, string | number, string | number]) => {}

const f12: (...args: [...strs: string[], num: number]) => void = (a, ...rest) => {}

// #49218#pullrequestreview-1241473951
const f13: <T extends string[]>(...rest: [number, ...T, boolean] ) => void = (a: number, ...arg: [...string[], boolean]) => {};

const f14: <T extends boolean>(...rest: [number, ...string[], T] ) => void = (a: number, ...arg: [...string[], boolean]) => {};
const f15: <T extends string>(...rest: [number, ...T[], boolean] ) => void = (a: number, ...arg: [...string[], boolean]) => {};

const f16: (...rest: [...string[], number]) => void = (...rest: [...string[], number]) => {};

const f17: (...rest: [...string[], number]) => void = (a, b, c?) => {};
const f18: (...rest: [...string[], number]) => void = (a, b, c?: string | number) => {};

const f19: (...rest: [string, ...boolean[], string] | [number]) => void = (a, ...rest) => {};