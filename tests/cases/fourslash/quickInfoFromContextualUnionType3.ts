/// <reference path='fourslash.ts' />

// https://github.com/microsoft/TypeScript/issues/61382

// @strict: true
//// declare const foo1: <D extends Foo1<D>>(definition: D) => D;
////
//// type Foo1<D, Bar = Prop<D, "bar">> = {
////   bar: {
////     [K in keyof Bar]: Bar[K] extends boolean
////       ? Bar[K]
////       : "Error: bar should be boolean";
////   };
//// };
////
//// declare const foo2: <D extends Foo2<D>>(definition: D) => D;
////
//// type Foo2<D, Bar = Prop<D, "bar">> = {
////   bar?: {
////     [K in keyof Bar]: Bar[K] extends boolean
////       ? Bar[K]
////       : "Error: bar should be boolean";
////   };
//// };
////
//// type Prop<T, K> = K extends keyof T ? T[K] : never;
////
//// foo1({ bar: { /*1*/X: "test" } });
////
//// foo2({ bar: { /*2*/X: "test" } });

verify.quickInfoAt("1", '(property) X: "Error: bar should be boolean"');
verify.quickInfoAt("2", '(property) X: "Error: bar should be boolean"');