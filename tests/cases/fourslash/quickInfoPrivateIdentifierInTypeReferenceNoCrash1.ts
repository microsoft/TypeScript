/// <reference path="fourslash.ts" />

// @target: esnext

//// class Foo {
////   #prop: string = "";
////
////   method() {
////     const test: Foo.#prop/*1*/ = "";
////   }
//// }

verify.quickInfoAt("1", "");
