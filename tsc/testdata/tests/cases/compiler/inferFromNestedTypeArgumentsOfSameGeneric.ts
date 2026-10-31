// @strict: true
// @target: esnext
// @noEmit: true

// Repro from #64757. Inference from the type arguments of two references to the
// same generic type must not stop when that type also appears nested inside
// one of its own arguments: `Box<() => Box<A, R>>` is not a cycle, and the
// inner `R` must still be inferred. These shapes come from Effect's
// `HttpRouter.middleware`, Prisma's nested `select` results and
// `Saga.toLayer` of alchemy.run.

interface Eff<out A, out R> {
  readonly _a: A;
  readonly _r: R;
  [Symbol.iterator](): Iterator<Eff<A, R>, A>;
}
type ReqOf<E> = [E] extends [never] ? never : [E] extends [Eff<any, infer R>] ? R : never;
declare function fn<E extends Eff<any, any>, A, Args extends any[]>(
  body: (...args: Args) => Generator<E, A, any>,
): (...args: Args) => Eff<A, ReqOf<E>>;
declare function succeed<A>(a: A): Eff<A, never>;

interface Request {
  readonly url: string;
}
declare const request: Eff<Request, Request>;

// Shape 1: a call signature from an instantiated generic type alias.
type Make<P> = <R>(m: Eff<() => Eff<string, R>, never>) => [R];
declare const make: Make<unknown>;
const r1 = make(succeed(fn(function* () {
  yield* request;
  return "";
})));
const check1: [Request] = r1;

// Shape 2: a method of an instantiated generic interface, where the outer
// type argument appears inside the nested type.
interface S<F> {
  toLayer<Req>(build: Eff<(p: { n: number }) => Eff<F, Req>, never>): Req;
}
declare const s: S<{ p: boolean }>;
const r2 = s.toLayer(succeed(fn(function* ({ n }) { return { p: n > 0 }; })));
const check2: never = r2;
const r3 = s.toLayer(succeed(fn(function* ({ n }) {
  yield* request;
  return { p: n > 0 };
})));
const check3: Request = r3;

// Shape 3: a generic alias as a parameter type, with the result nested two
// levels deep (cut down from Prisma's nested `select` results).
type Payload<T> = { readonly data: T };
type Selected<T, S> = S extends { select: infer Sel } ? { [K in keyof Sel & keyof T]: T[K] } : T;
declare function viaAlias<T, S>(p: Payload<Payload<Selected<T, S>>>, s: S): Selected<T, S>;
declare const p: Payload<Payload<{ id: number }>>;
const r4 = viaAlias(p, { select: { id: true } });
const check4: { id: number } = r4;
