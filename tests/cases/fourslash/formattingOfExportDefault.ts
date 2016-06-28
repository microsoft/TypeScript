/// <reference path="fourslash.ts"/>

////module Foo {
/////*1*/    export        default        class        Test { }
////}
/////*2*/export        default        function        bar() { }

format.document();
goTo.marker("1");
verify.currentLineContentIs("    export default class Test { }")
goTo.marker("2");
verify.currentLineContentIs("export default function bar() { }")
