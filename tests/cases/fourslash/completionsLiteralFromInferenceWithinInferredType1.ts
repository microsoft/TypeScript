/// <reference path="fourslash.ts" />

// @Filename: /a.tsx
//// declare function test<T>(a: {
////   [K in keyof T]: {
////     b?: keyof T;
////   };
//// }): void;
////
//// test({
////   foo: {},
////   bar: {
////     b: "/*ts*/",
////   },
//// });

verify.completions({ marker: ["ts"], exact: ["foo", "bar"] });
