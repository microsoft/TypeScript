//// [tests/cases/compiler/stableTypeMapperOrdering.ts] ////

//// [stableTypeMapperOrdering.ts]
// https://github.com/microsoft/TypeScript/issues/64589

interface Endpoint<Name, Params, Middleware, Services> {
  readonly name: Name;
  readonly params: Params;
  readonly middleware: Middleware;
  readonly services: Services;
}

type Same<A, R> = R;

type AddMiddleware<E, I> =
  E extends Endpoint<infer N, infer P, infer M, infer S>
    ? Endpoint<N, P, M | I, Same<I, S>>
    : never;

interface Group<Endpoints> {
  add<N extends string, P = never>(
    name: N,
    params?: P,
  ): Group<Endpoints | Endpoint<N, P, never, never>>;
  middleware<I>(id: I): Group<AddMiddleware<Endpoints, I>>;
}

declare const group: Group<never>;

export const result = group.add("a", { id: "" }).add("c").middleware("m" as const);


//// [stableTypeMapperOrdering.js]
// https://github.com/microsoft/TypeScript/issues/64589
export const result = group.add("a", { id: "" }).add("c").middleware("m");


//// [stableTypeMapperOrdering.d.ts]
interface Endpoint<Name, Params, Middleware, Services> {
    readonly name: Name;
    readonly params: Params;
    readonly middleware: Middleware;
    readonly services: Services;
}
type Same<A, R> = R;
type AddMiddleware<E, I> = E extends Endpoint<infer N, infer P, infer M, infer S> ? Endpoint<N, P, M | I, Same<I, S>> : never;
interface Group<Endpoints> {
    add<N extends string, P = never>(name: N, params?: P): Group<Endpoints | Endpoint<N, P, never, never>>;
    middleware<I>(id: I): Group<AddMiddleware<Endpoints, I>>;
}
export declare const result: Group<Endpoint<"a", {
    id: string;
}, "m", never> | Endpoint<"c", never, "m", never>>;
export {};
