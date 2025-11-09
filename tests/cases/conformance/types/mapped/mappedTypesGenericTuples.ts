// @strict: true
// @noEmit: true

// Property keys are `number` following the fixed part of a tuple

type K<T> = { [P in keyof T]: P };
type M<T> = { [P in keyof T]: T[P] };

type KA = K<[string, string, boolean]>;  // ["0", "1", "2"]
type KB = K<[string, string, ...string[], string]>;  // ["0", "1", ...number[], number]
type KC = K<[...string[]]>;  // number[]
type KD = K<string[]>;  // number[]

type A = { a: string };
type B = { b: string };
type C = { c: string };
type D = { d: string };

type V0<T extends unknown[]> = [A, B?, ...T, ...C[]]
type V1<T extends unknown[]> = [A, ...T, B, ...C[], D]

type K0<T extends unknown[]> = K<V0<T>>;  // ["0", "1"?, ...K<T>, ...number[]]
type K1<T extends unknown[]> = K<V1<T>>;  // ["0", ...K<T>, number, ...number[], number]

type M0<T extends unknown[]> = M<V0<T>>;  // [A, B?, ...M<T>, ...C[]]
type M1<T extends unknown[]> = M<V1<T>>;  // [A, ...M<T>, B, ...C[], D]

// Repro from #48856

type Keys<O extends unknown[]> = { [K in keyof O]: K };

type Keys1 = Keys<[string, ...string[]]>;
type Keys2 = Keys<[string, ...string[], number]>;

// Repro from #56888

type T1 = ['a', 'b', 'c'] extends readonly [infer H, ...unknown[]] ? H : never;  // "a"
type T2 = ['a', 'b', 'c'] extends Readonly<[infer H, ...unknown[]]> ? H : never;  // "a"
type T3 = ['a', 'b', 'c'] extends readonly [...unknown[], infer L] ? L : never;  // "c"
type T4 = ['a', 'b', 'c'] extends Readonly<[...unknown[], infer L]> ? L : never;  // "c"

// Repro from #56888

type R1<T> = readonly [...unknown[], T];  // readonly [...unknown[], T]
type R2<T> = Readonly<[...unknown[], T]>;  // readonly [...unknown[], T]
