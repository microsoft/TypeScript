// #41771

type BuildTuple<L extends number, T extends any[] = [any]> = 
    T['length'] extends L ? T : BuildTuple<L, [...T, ...T]>;

type A = BuildTuple<3>

type T0 = [any];
type T1 = [...T0, ...T0];
type T2 = [...T1, ...T1];
type T3 = [...T2, ...T2];
type T4 = [...T3, ...T3];
type T5 = [...T4, ...T4];
type T6 = [...T5, ...T5];
type T7 = [...T6, ...T6];
type T8 = [...T7, ...T7];
type T9 = [...T8, ...T8];
type T10 = [...T9, ...T9];
type T11 = [...T10, ...T10];
type T12 = [...T11, ...T11];
type T13 = [...T12, ...T12];
type T14 = [...T13, ...T13]; // 2^14 > 10,000

const a0 = [0] as const;
const a1 = [...a0, ...a0] as const;
const a2 = [...a1, ...a1] as const;
const a3 = [...a2, ...a2] as const;
const a4 = [...a3, ...a3] as const;
const a5 = [...a4, ...a4] as const;
const a6 = [...a5, ...a5] as const;
const a7 = [...a6, ...a6] as const;
const a8 = [...a7, ...a7] as const;
const a9 = [...a8, ...a8] as const;
const a10 = [...a9, ...a9] as const;
const a11 = [...a10, ...a10] as const;
const a12 = [...a11, ...a11] as const;
const a13 = [...a12, ...a12] as const;
const a14 = [...a13, ...a13] as const; // 2^14 > 10,000
