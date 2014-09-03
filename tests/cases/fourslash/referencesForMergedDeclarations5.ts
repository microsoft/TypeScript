/// <reference path='fourslash.ts'/>

////interface Foo { }
////module Foo { export interface Bar { } }
////function Foo() { }
////
////export = /*1*/Foo;

goTo.marker("1");
verify.referencesCountIs(4);