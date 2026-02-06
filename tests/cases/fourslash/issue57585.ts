/// <reference path='fourslash.ts'/>

// @strict: true
// @target: esnext
// @lib: esnext

//// export interface Result<T, E> {
////   mapErr<F>(fn: (error: E) => F): Result<T, F>;
////   [Symbol.iterator](): Generator<E, T>;
//// }
////
//// declare const okIfObject: (
////   value: unknown,
//// ) => Result<Record<string, unknown>, "ERR_NOT_AN_OBJECT">;
////
//// declare const okIfInt: (value: unknown) => Result<number, "ERR_NOT_AN_INT">;
////
//// export declare function Do2<T, E>(job: () => Generator<E, T>): void;
////
//// declare let value: unknown;
////
//// Do2(function* () {
////   const object = yield* okIfObject(value).mapErr((error) => 0);
////   const age = yield* okIfInt(object.age).mapErr((error) => 0);
////   return { age };
//// });

verify.encodedSemanticClassificationsLength('2020', 132);
verify.getSemanticDiagnostics([]);
