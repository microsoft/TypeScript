/// <reference path="fourslash.ts"/>

//// class Foo {
////     a: number;
////     b() {
////         var x = () => {
////             this./**/;
////         }
////     }
//// }

verify.completions({ marker: "", exact: ["a", "b"] });
