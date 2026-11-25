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

// Shape 3: a generic alias as a parameter type, with the inference descending
// through nested arrays of a type computed by a recursive conditional type
// (cut down from Prisma's nested `select` results). The same type written
// inline still infers on every version.
type Payload = { scalars: object; objects: object };

type FindResult<P extends Payload, A> = A extends { select: infer S extends object }
  ? {
      [K in keyof S]: S[K] extends object
        ? P extends { objects: { [k in K]: (infer O)[] } }
          ? FindResult<O & Payload, S[K]>[]
          : never
        : P['scalars'][K & keyof P['scalars']];
    }
  : never;

type MessagePayload = { objects: {}; scalars: { body: string } };
type ConversationPayload = { objects: { messages: MessagePayload[] }; scalars: {} };
type ThreadPayload = { objects: { conversations: ConversationPayload[] }; scalars: {} };

declare function findThread<A>(args: A): FindResult<ThreadPayload, A>;

const thread = findThread({
  select: { conversations: { select: { messages: { select: { body: true } } } } },
});

type ThreadRow<M> = { conversations: Array<{ messages: Array<M> }> };

declare function firstMessageViaAlias<M>(thread: ThreadRow<M>): M;
declare function firstMessageInline<M>(thread: { conversations: Array<{ messages: Array<M> }> }): M;

const inline: string = firstMessageInline(thread).body;
const viaAlias: string = firstMessageViaAlias(thread).body;
