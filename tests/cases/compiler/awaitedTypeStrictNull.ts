// @target: esnext
// @strictNullChecks: true

type T1 = Awaited<number>;
type T2 = Awaited<Promise<number>>;
type T3 = Awaited<number | Promise<number>>;
type T4 = Awaited<number | Promise<string>>;
type T5 = Awaited<{ then: number }>;
type T6 = Awaited<{ then(): void }>; // never (non-promise "thenable")
type T7 = Awaited<{ then(x: number): void }>; // never (non-promise "thenable")
type T8 = Awaited<{ then(x: () => void): void }>; // unknown
type T9 = Awaited<any>;
type T10 = Awaited<never>;
type T11 = Awaited<unknown>;
type T12 = Awaited<Promise<Promise<number>>>;
type T13 = _Expect<Awaited<Promise<Promise<number>> | string | null>, /*expected*/ string | number | null>; // otherwise just prints T13 in types tests, which isn't very helpful
type T14 = _Expect<Awaited<Promise<Promise<number>> | string | undefined>, /*expected*/ string | number | undefined>; // otherwise just prints T14 in types tests, which isn't very helpful
type T15 = _Expect<Awaited<Promise<Promise<number>> | string | null | undefined>, /*expected*/ string | number | null | undefined>; // otherwise just prints T15 in types tests, which isn't very helpful

type TUndefined = Awaited<undefined>;
type TNull = Awaited<null>;
type TNullOrUndefined = Awaited<null | undefined>;

interface BadPromise { then(cb: (value: BadPromise) => void): void; }
type T16 = Awaited<BadPromise>; // error

interface BadPromise1 { then(cb: (value: BadPromise2) => void): void; }
interface BadPromise2 { then(cb: (value: BadPromise1) => void): void; }
type T17 = Awaited<BadPromise1>; // error

// https://github.com/microsoft/TypeScript/issues/46934
type T18 = Awaited<{ then(cb: (value: number, other: { }) => void)}>; // number

// https://github.com/microsoft/TypeScript/issues/33562
type MaybePromise<T> = T | Promise<T> | PromiseLike<T>
declare function MaybePromise<T>(value: T): MaybePromise<T>;

async function main() {
    let aaa: number;
    let bbb: string;
    [
        aaa,
        bbb,
    ] = await Promise.all([
        MaybePromise(1),
        MaybePromise('2'),
        MaybePromise(true),
    ])
}

// https://github.com/microsoft/TypeScript/issues/45924
class Api<D = {}> {
	// Should result in `Promise<T>` instead of `Promise<Awaited<T>>`.
	async post<T = D>() { return this.request<T>(); }
	async request<D>(): Promise<D> { throw new Error(); }
}

declare const api: Api;
interface Obj { x: number }

async function fn<T>(): Promise<T extends object ? { [K in keyof T]: Obj } : Obj> {
	// Per #45924, this was failing due to incorrect inference both above and here.
	// Should not error.
	return api.post();
}

// helps with tests where '.types' just prints out the type alias name
type _Expect<TActual extends TExpected, TExpected> = TActual;
