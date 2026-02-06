/// <reference path="fourslash.ts" />

// @strict: true

//// declare function createMachine<T>(config: {
////   initial: keyof T;
////   states: {
////     [K in keyof T]: {
////       on?: Record<string, keyof T>;
////     };
////   };
//// }): void;
////
//// createMachine({
////   initial: "a",
////   states: {
////     a: {
////       on: {
////         NEXT: "/*1*/",
////       },
////     },
////     b: {
////       on: {
////         NEXT: "/*2*/",
////       },
////     },
////   },
//// });

verify.completions({
    marker: ["1", "2"],
    exact: ["a", "b"]
})
