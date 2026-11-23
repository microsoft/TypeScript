// @strict: true
// @noEmit: true

// A conditional type keeps its base constraint when its instantiation nests
// types deeply in ways that cannot expand without end: chains of indexed
// accesses, and types nested in themselves without type variables.

// @filename: indexedAccessChain.ts
// From trpc's CreateContextCallback.
type Router<T> = { _def: { _config: { $types: { ctx: T } } } };
type Ctx<R extends Router<any>> = R["_def"]["_config"]["$types"]["ctx"];
type PartialIf<C extends boolean, T> = C extends true ? Partial<T> : T;
type CreateContextCallback<TContext> = PartialIf<object extends TContext ? true : false, { createContext: () => TContext }>;

function g<R extends Router<any>>(o: CreateContextCallback<Ctx<R>>) {
    o.createContext;
}

type Box<X> = X extends string ? { a: 1 } : { a: 2 };

function f<R extends { a: { b: { c: { d: string } } } }>(o: Box<R["a"]["b"]["c"]["d"]>) {
    o.a;
}
export {};

// @filename: nestedReferences.ts
// From ariakit, whose recipes nest recipes made by function calls.
interface Box<T> {
    value: T;
}
declare function box<T>(value: T): Box<T>;

const box5 = box(box(box(box(box("")))));

type Like<Base, Candidate> = keyof Base extends keyof Candidate ? Base : never;

function nested<R extends Like<typeof box5, R>>(r: R) {
    r.value;
}
export {};

// @filename: nestedObjectLiterals.ts
// From react-navigation, whose screen parameters nest navigators.
type Wrap<T> = { value: T };
type Two<T> = { a: T; b: number };

interface Nav<P> {
    navigate<K extends keyof P>(...args: K extends unknown ? [key: K, value: P[K]] : never): K;
}

declare const deep: Nav<Two<Wrap<Wrap<Wrap<Wrap<Wrap<string>>>>>>>;
const key = deep.navigate("a", { value: { value: { value: { value: { value: "" } } } } });
const a: "a" = key;

deep.navigate("a", { value: { value: { value: { value: { value: 0 } } } } });
export {};
