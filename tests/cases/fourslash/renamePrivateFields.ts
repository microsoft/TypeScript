/// <reference path='fourslash.ts' />

////class Foo {
////   [|/**/#foo|] = 1;
////
////   getFoo() {
////       return this.#foo;
////   }
////}

goTo.marker("");
verify.renameInfoSucceeded("#foo");
