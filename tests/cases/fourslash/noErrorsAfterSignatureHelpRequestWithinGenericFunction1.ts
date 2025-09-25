/// <reference path="fourslash.ts" />

// @strict: true
// @target: esnext
// @lib: esnext

//// export interface Pipeable {
////   pipe<A, B = never>(this: A, ab: (_: A) => B): B;
//// }
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
//// declare const EffectTypeId: unique symbol;
////
//// interface Variance<out A, out E, out R> {
////   readonly [EffectTypeId]: VarianceStruct<A, E, R>;
//// }
////
//// interface Effect<out A, out E = never, out R = never>
////   extends Variance<A, E, R>,
////     Pipeable {}
////
//// interface Class<Fields> extends Pipeable {
////   new (): Fields;
//// }
////
//// interface TaggedErrorClass<Tag extends string, Fields> extends Class<Fields> {
////   readonly _tag: Tag;
//// }
////
//// declare const TaggedError: (identifier?: string) => <
////   Tag extends string,
////   Fields
//// >(
////   tag: Tag,
////   fieldsOr: Fields
//// ) => TaggedErrorClass<
////   Tag,
////   {
////     readonly _tag: Tag;
////   }
//// >;
////
//// declare const log: (
////   ...message: ReadonlyArray<any>
//// ) => Effect<void, never, never>;
////
//// export const categoriesKey = "@effect/error/categories";
////
//// export declare const withCategory: <Categories extends Array<PropertyKey>>(
////   ...categories: Categories
//// ) => <Args extends Array<any>, Ret, C extends { new (...args: Args): Ret }>(
////   C: C
//// ) => C & {
////   new (...args: Args): Ret & {
////     [categoriesKey]: { [Cat in Categories[number]]: true };
////   };
//// };
////
//// export type AllKeys<E> = E extends { [categoriesKey]: infer Q }
////   ? keyof Q
////   : never;
//// export type ExtractAll<E, Cats extends PropertyKey> = Cats extends any
////   ? Extract<E, { [categoriesKey]: { [K in Cats]: any } }>
////   : never;
////
//// export declare const catchCategory: <
////   E,
////   const Categories extends Array<AllKeys<E>>,
////   A2,
////   E2,
////   R2
//// >(
////   ...args: [
////     ...Categories,
////     f: (err: ExtractAll<E, Categories[number]>) => Effect<A2, E2, R2>
////   ]
//// ) => <A, R>(
////   effect: Effect<A, E, R>
//// ) => Effect<A | A2, E2 | Exclude<E, ExtractAll<E, Categories[number]>>, R | R2>;
////
//// class FooError extends TaggedError()("FooError", {}).pipe(
////   withCategory("domain")
//// ) {}
////
//// class BarError extends TaggedError()("BarError", {}).pipe(
////   withCategory("system", "domain")
//// ) {}
////
//// class BazError extends TaggedError()("BazError", {}).pipe(
////   withCategory("system")
//// ) {}
////
//// declare const baz: (
////   x: number
//// ) => Effect<never, FooError | BarError | BazError, never>;
////
//// export const program = baz(1).pipe(catchCategory("domain",/*1*/ (_) => log(_._tag)));

verify.noErrors();
goTo.marker("1");
edit.insert(",");
verify.signatureHelpPresentForTriggerReason({
    kind: "characterTyped",
    triggerCharacter: ",",
});
edit.backspace(1);
verify.signatureHelpPresentForTriggerReason({
    kind: "retrigger",
});
verify.noErrors();
