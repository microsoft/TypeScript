// @target: esnext
type T1 = Awaited<number>; // number (same as 'await')
type T2 = Awaited<Promise<number>>; // number (same as 'await')
type T3 = Awaited<Promise<Promise<number>>>; // number (same as 'await')
type T4 = Awaited<Promise<Promise<Promise<number>>>>; // number (same as 'await')
type T5 = Awaited<PromiseLike<number>>; // number (same as 'await')
type T6 = Awaited<PromiseLike<PromiseLike<number>>>; // number (same as 'await')
type T7 = Awaited<PromiseLike<PromiseLike<PromiseLike<number>>>>; // number (same as 'await')
type T8 = Awaited<Promise<PromiseLike<number>>>; // number (same as 'await')
type T9 = Awaited<PromiseLike<Promise<number>>>; // number (same as 'await')
type T10 = Awaited<{ then: any; }>; // never (no way to know what this might resolve to, differs from 'await')
type T11 = Awaited<{ then: number; }>; // { then: number; } (same as 'await')
type T12 = Awaited<{ then(): void; }>; // never (no way to know what this might resolve to, error for 'await')
type T13 = Awaited<{ then(x: any): void; }>; // never (no way to know what this might resolve to, error for 'await')
type T14 = Awaited<{ then(x: number): void; }>; // never (cannot be resolved correctly, error for 'await')
type T15 = Awaited<{ then(x: () => void): void; }>; // never (no way to know what this might resolve to)
type T16 = Awaited<{ then(x: (y: any) => void): void; }>; // any (same as 'await')
type T17 = Awaited<{ then(x: (y: number) => void): void; }>; // number (same as 'await')
type T18 = Awaited<{ then(x: (y: { then: any; }) => void): void; }>; // { then: any; } (no recursive unwrap, differs from 'await')
type T19 = Awaited<{ then(x: (y: { then: number; }) => void): void; }>; // { then: number; } (no recursive unwrap, differs from 'await')
type T20 = Awaited<{ then(x: (y: { then(): void; }) => void): void; }>; // { then(): void; } (no recursive unwrap, differs from 'await')
type T21 = Awaited<{ then(x: (y: { then(x: any): void; }) => void): void; }>; // { then(x: any): void; } (no recursive unwrap, differs from 'await')
type T22 = Awaited<{ then(x: (y: { then(x: number): void; }) => void): void; }>; // { then(x: number): void; } (no recursive unwrap, differs from 'await')
type T23 = Awaited<{ then(x: (y: { then(x: () => void): void; }) => void): void; }>; // { then(x: () => void): void; } (no recursive unwrap, differs from 'await')
type T24 = Awaited<{ then(x: (y: { then(x: (y: any) => void): void; }) => void): void; }>; // { then(x: (y: any) => void): void; } (no recursive unwrap, differs from 'await')
type T25 = Awaited<{ then(x: (y: { then(x: (y: number) => void): void; }) => void): void; }>; // { then(x: (y: number) => void): void; } (no recursive unwrap, differs from 'await')

// self recursive bad promise
type T26 = Awaited<BadPromise>; // BadPromise (no recursive unwrap, differs from 'await')
interface BadPromise { then(cb: (value: BadPromise) => void): any; }

// mutually recursive bad promises
type T27 = Awaited<BadPromiseA>; // BadPromiseB (no recursive unwrap, differs from 'await')
interface BadPromiseA { then(cb: (value: BadPromiseB) => void): any; }
interface BadPromiseB { then(cb: (value: BadPromiseA) => void): any; }

type T28 = Awaited<never>; // never (same as 'await')
type T29 = Awaited<number | Promise<string>>; // string | number (same as 'await')
type T30 = Awaited<number | Promise<never>>; // number (same as 'await')
type T31 = Awaited<PromiseLike<number> | Promise<string>>; // string | number (same as 'await')
type T32 = Awaited<Awaited<number>>; // number (same as 'await')
type T33 = Awaited<Promise<Awaited<Promise<number>>>>; // number (same as 'await')