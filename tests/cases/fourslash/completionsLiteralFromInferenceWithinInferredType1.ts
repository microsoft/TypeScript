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
////
//// test({
////   foo: {},
////   bar: {
////     b: /*ts2*/,
////   },
//// });

verify.completions({ marker: ["ts"], exact: ["bar", "foo"] });
verify.completions({ marker: ["ts2"], includes: ['"foo"', '"bar"'], isNewIdentifierLocation: false });
