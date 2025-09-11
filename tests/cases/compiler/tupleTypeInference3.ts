// @strict: true

// Repro from #55632

type InferArg =
  | [1, (a: number) => void]
  | [2, (b: string) => void];
const arg: InferArg = [1, (a) => { }];

// More tests

type T1 = [1, (a: number) => void];
type T2 = { 0: 1, 1: (a: boolean) => void, 2: number };
type T3 = T1 | T2;
const v31: T3 = [1, (a) => { a === 0 }];
const v32: T3 = [1, (a) => { a === true }, 0];
const v33: T3 = [1, (a) => { a === true }, 0, 0];
const v34: T3 = [1, (a: boolean) => { a === true }]; // Error

type T4 = T3 | [2, (b: string) => void]
const v41: T4 = [1, (a) => { a === 0 }];
const v42: T4 = [1, (a) => { a === true }, 0];
const v43: T4 = [2, (a) => { a === "" }];

type T5 = T4 | {}
const v52: T5 = [1, (a) => { a === 0 }];
const v53: T5 = [1, (a) => { a === true }, 0];
const v54: T5 = [2, (a) => { a === "" }];

type T6 = T1 | { 0: 1, 1: (a: boolean) => void, 2?: number }
const v61: T6 = [1, (a) => { a === true }, 0];
const v62: T6 = [1, (a) => { }]; // Error

type T7 = [1, (a: number) => void, ...number[]];
type T8 = T7 | [1, (a: boolean) => void]
const v81: T8 = [1, (a) => { a === 0 }, 0];
const v82: T8 = [1, (a) => { }]; // Error

type T9 = [1, (a: number) => void, ...[number, string]] | [1, (b: string) => void, number?];
const v91: T9 = [1, (a) => { a === 0 }, 0, ""];
const v92: T9 = [1, (a) => { a === "" }];
const v93: T9 = [1, (a) => { a === "" }, 0];

type T10 = [1, (a: number) => void, ...[number, string]] | [1, (b: string) => void, number?, string?];
const v101: T10 = [1, (a) => { a === "" }];
const v102: T10 = [1, (a) => { a === "" }, 0];
const v103: T10 = [1, (a) => { }, 0, ""]; // Error

type T11 = [1, (a: number) => void, ...[number, string]] | [1, (b: string) => void, number?, boolean?];
const v111: T11 = [1, (a) => { a === "" }];
const v112: T11 = [1, (a) => { a === "" }, 0];
const v113: T11 = [1, (a) => { a === 0 }, 0, ""];
const v114: T11 = [1, (a) => { a === "" }, 0, true];

type T12 =
  | { 1: (arg: File) => void }
  | { 0?: number, 1: (arg: Date) => void }
  | { 0: (arg: boolean) => void }
  | { 0: boolean, 1: (arg: number) => void }
  | [null, (arg: string) => void];
declare function f(a: T12): void;
f([null, (a) => { a === "" }]);
f([true, (a) => { a === 0 }]);
f([(a) => { a === true }]);
f([0, (a) => { a as Date }]);
f([, (a) => { }]); // Error

declare function f2(_: { 0: number, 1: (arg: number) => void } | { 0: number, 1: (arg: boolean) => void, 2: any }): void;
f2([1, arg => { arg === 0 }] as const);

declare function f3(_: { 0: number, 1: (arg: number) => void } | { 0: number, 1: (arg: boolean) => void, 2?: any }): void;
f3([1, arg => { }] as const); // Error

declare function f4(_: [(arg: number) => void] | [(arg: string) => void, true]): void;
f4([arg => { arg === 0 }] as const);

declare function f5(arg: { 0: null, 1: (arg: number) => void, foo?: string } | [1, (arg: boolean) => void]): void;
f5([null, (arg) => { arg === 0 }] as const);
f5([1, (arg) => { arg === true }] as const);

declare function f6(arg: { 1: (arg: number) => void, [k: number]: (...args: never) => void } | [1, (arg: boolean) => void]): void;
f6([1, (arg) => { }] as const); // Error