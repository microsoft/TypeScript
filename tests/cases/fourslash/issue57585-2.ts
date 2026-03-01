/// <reference path="fourslash.ts" />

// @strict: true
// @target: esnext
// @lib: esnext

//// declare const EffectTypeId: unique symbol;
////
//// type Covariant<A> = (_: never) => A;
////
//// interface VarianceStruct<out A, out E, out R> {
////   readonly _V: string;
////   readonly _A: Covariant<A>;
////   readonly _E: Covariant<E>;
////   readonly _R: Covariant<R>;
//// }
////
//// interface Variance<out A, out E, out R> {
////   readonly [EffectTypeId]: VarianceStruct<A, E, R>;
//// }
////
//// type Success<T extends Effect<any, any, any>> = [T] extends [
////   Effect<infer _A, infer _E, infer _R>,
//// ]
////   ? _A
////   : never;
////
//// declare const YieldWrapTypeId: unique symbol;
////
//// class YieldWrap<T> {
////   readonly #value: T;
////   constructor(value: T) {
////     this.#value = value;
////   }
////   [YieldWrapTypeId](): T {
////     return this.#value;
////   }
//// }
////
//// interface EffectGenerator<T extends Effect<any, any, any>> {
////   next(...args: ReadonlyArray<any>): IteratorResult<YieldWrap<T>, Success<T>>;
//// }
////
//// interface Effect<out A, out E = never, out R = never>
////   extends Variance<A, E, R> {
////   [Symbol.iterator](): EffectGenerator<Effect<A, E, R>>;
//// }
////
//// declare const gen: {
////   <Eff extends YieldWrap<Effect<any, any, any>>, AEff>(
////     f: () => Generator<Eff, AEff, never>,
////   ): Effect<
////     AEff,
////     [Eff] extends [never]
////       ? never
////       : [Eff] extends [YieldWrap<Effect<infer _A, infer E, infer _R>>]
////       ? E
////       : never,
////     [Eff] extends [never]
////       ? never
////       : [Eff] extends [YieldWrap<Effect<infer _A, infer _E, infer R>>]
////       ? R
////       : never
////   >;
//// };
////
//// declare const succeed: <A>(value: A) => Effect<A>;
////
//// gen(function* () {
////   const a = yield* succeed(1);
////   const b/*1*/ = yield* succeed(2);
////   return a + b;
//// });

verify.quickInfoAt("1", "const b: number");
verify.getSemanticDiagnostics([]);