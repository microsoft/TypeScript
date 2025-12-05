// @strict: true
// @declaration: true

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
