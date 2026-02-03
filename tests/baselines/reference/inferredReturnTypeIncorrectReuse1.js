//// [tests/cases/compiler/inferredReturnTypeIncorrectReuse1.ts] ////

//// [inferredReturnTypeIncorrectReuse1.ts]
export type inferPipe<t, pipe> =
    pipe extends (In: t) => unknown ? (In: t) => ReturnType<pipe> : never

interface Type<t> {
    pipe<fn extends (In: t) => unknown>(fn: fn): Type<inferPipe<t, fn>>
}

declare const t: Type<string>

/** Type<(In: string) => number> */
export const out = t.pipe(s => parseInt(s))

export type inferPipe2<t, pipe> =
	pipe extends (In: t) => unknown ?
		(In: t) => ReturnType<pipe> extends infer n extends number ? n
		: ReturnType<pipe> extends infer s extends string ? s
		: ReturnType<pipe> extends infer b extends boolean ? b
		: never
	:	never

interface Type2<t> {
	pipe<fn extends (In: t) => unknown>(fn: fn): Type<inferPipe2<t, fn>>
}

declare const t2: Type2<string>

/** Type<(In: string) => number> */
export const out2 = t2.pipe(s => parseInt(s))


//// [inferredReturnTypeIncorrectReuse1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.out2 = exports.out = void 0;
/** Type<(In: string) => number> */
exports.out = t.pipe(function (s) { return parseInt(s); });
/** Type<(In: string) => number> */
exports.out2 = t2.pipe(function (s) { return parseInt(s); });


//// [inferredReturnTypeIncorrectReuse1.d.ts]
export type inferPipe<t, pipe> = pipe extends (In: t) => unknown ? (In: t) => ReturnType<pipe> : never;
interface Type<t> {
    pipe<fn extends (In: t) => unknown>(fn: fn): Type<inferPipe<t, fn>>;
}
/** Type<(In: string) => number> */
export declare const out: Type<(In: string) => number>;
export type inferPipe2<t, pipe> = pipe extends (In: t) => unknown ? (In: t) => ReturnType<pipe> extends infer n extends number ? n : ReturnType<pipe> extends infer s extends string ? s : ReturnType<pipe> extends infer b extends boolean ? b : never : never;
/** Type<(In: string) => number> */
export declare const out2: Type<(In: string) => number>;
export {};
