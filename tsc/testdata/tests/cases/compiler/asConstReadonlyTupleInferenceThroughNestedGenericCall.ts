// @strict: true
// regression test for https://github.com/microsoft/TypeScript/issues/63666

interface Box<T> {
    readonly value: T;
}
type Content<R> = R extends Box<infer U> ? U : never;
type BoxLike<R> = Box<Content<R>>;

declare function box<T>(value: T): Box<T>;
declare function f<R extends BoxLike<R>>(v: R): R;
declare function f2<R extends BoxLike<R>>(body: () => R): R;
declare function id<T>(x: T): T;

declare const a: { a: number };
declare const b: { b: number };
declare const neverValue: never;

// nested generic call under a conditional-type-based F-bounded constraint
const r1 = f(box([a, b] as const));
// @ts-expect-error
const check1: Box<[{ a: number }, { b: number }]> = r1;
const ok1: Box<readonly [{ a: number }, { b: number }]> = r1;

// context-sensitive callback
const r2 = f2(() => box([a, b] as const));
const ok2: Box<readonly [{ a: number }, { b: number }]> = r2;

// direct literal and non-circular constraints keep readonly
const r3 = f({ value: [a, b] as const });
declare function g<R extends Box<unknown>>(v: R): R;
const r4 = g(box([a, b] as const));
declare function h<R extends Box<R["value"]>>(v: R): R;
const r5 = h(box([a, b] as const));

// a contextual type of never must not make the const tuple mutable
// @ts-expect-error
const z = id<typeof neverValue>([a, b] as const);
