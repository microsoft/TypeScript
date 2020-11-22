/// <reference path="fourslash.ts" />
// @strict: true

//// /** @deprecated */
//// interface Foo {
////     /** @deprecated */
////     bar(): void
////     /** @deprecated */
////     prop: number
//// }
//// declare const foo: Foo;
//// declare const foooo: Fo/*1*/;
//// foo.ba/*2*/;
//// foo.pro/*3*/;

verify.completions({
    marker: "1",
    includes: [
      { name: "Foo", kind: "interface", kindModifiers: "deprecated" }
    ]
}, {
    marker: "2",
    includes: [
      { name: "bar", kind: "method", kindModifiers: "deprecated" }
    ]
}, {
    marker: "3",
    includes: [
      { name: "prop", kind: "property", kindModifiers: "deprecated" }
    ]
});

