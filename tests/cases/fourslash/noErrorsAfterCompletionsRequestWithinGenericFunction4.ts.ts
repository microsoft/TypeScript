/// <reference path="fourslash.ts" />

// @strict: true
// @target: esnext
// @lib: esnext

//// type ObjectFromEntries<T> = T extends readonly [
////   infer Key extends string | number | symbol,
////   infer Value,
//// ][]
////   ? { [key in Key]: Value }
////   : never;
////
//// type KeyValuePairs<T> = {
////   [K in keyof T]: [K, T[K]];
//// }[keyof T];
////
//// declare function mapObjectEntries<
////   const T extends object,
////   const TMapped extends [string | number | symbol, unknown],
//// >(
////   obj: T,
////   mapper: ([a, b]: KeyValuePairs<T>) => TMapped,
//// ): ObjectFromEntries<TMapped[]>;
////
//// mapObjectEntries({ a: 1, b: 2 }, ([x, y]) => ["a/*1*/", y]);

verify.completions({
    marker: "1",
    exact: ["a"],
});
verify.getSemanticDiagnostics([]);
