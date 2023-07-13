/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
//// export class Foo {
////   readonly someVar = "foo";
////
////   bar() {
////     // lack of the semicolon here is important
////     // this parses `const foo = this.return` which is legal
////     // and then continues to parse the rest as something else than the intended return statement
////     const foo = this./*1*/
////
////     return { baz: this.baz() };
////   }
////
////   baz() {}
////
////   anotherOne() {}
//// }

verify.completions({ marker: "1", exact: ["anotherOne", "bar", "baz", "someVar"] });
