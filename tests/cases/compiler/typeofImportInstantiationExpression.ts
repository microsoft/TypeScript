// @strict

// Repro from #52248

// @filename: input.ts
interface Arg<T = any, Params extends Record<string, any> = Record<string, any>> {
    "__is_argument__"?: true;
    meta?: T;
    params?: Params;
}

export function myFunction<T = any, U extends Record<string, any> = Record<string, any>>(arg: Arg<T, U>) { return (arg.params || {}) as U }

// @filename: main.ts
type T1 = typeof import('./input.js').myFunction;
type T2 = typeof import('./input.js').myFunction<any, { slug: 'hello' }>;
