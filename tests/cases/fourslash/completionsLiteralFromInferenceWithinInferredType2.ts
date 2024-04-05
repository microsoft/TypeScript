/// <reference path="fourslash.ts" />

// @Filename: /a.tsx
//// type Values<T> = T[keyof T];
////
//// type GetStates<T> = T extends { states: object } ? T["states"] : never;
////
//// type IsNever<T> = [T] extends [never] ? 1 : 0;
////
//// type GetIds<T, Gathered extends string = never> = IsNever<T> extends 1
////   ? Gathered
////   : "id" extends keyof T
////   ? GetIds<Values<GetStates<T>>, Gathered | `#${T["id"] & string}`>
////   : GetIds<Values<GetStates<T>>, Gathered>;
////
//// type StateConfig<
////   TStates extends Record<string, StateConfig> = Record<
////     string,
////     StateConfig<any>
////   >,
////   TIds extends string = string
//// > = {
////   id?: string;
////   initial?: keyof TStates & string;
////   states?: {
////     [K in keyof TStates]: StateConfig<GetStates<TStates[K]>, TIds>;
////   };
////   on?: Record<string, TIds | `.${keyof TStates & string}`>;
//// };
////
//// declare function createMachine<const T extends StateConfig<GetStates<T>, GetIds<T>>>(
////   config: T
//// ): void;
////
//// createMachine({
////   initial: "child",
////   states: {
////     child: {
////       initial: "foo",
////       states: {
////         foo: {
////           id: "wow_deep_id",
////         },
////       },
////     },
////   },
////   on: {
////     EV: "/*ts*/",
////   },
//// });

verify.completions({ marker: ["ts"], exact: ["#wow_deep_id", ".child"] });
