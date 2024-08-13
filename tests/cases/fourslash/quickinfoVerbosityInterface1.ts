/// <reference path='fourslash.ts'/>


//// {
////     interface Foo {
////         a: "a" | "c";
////     }
////     const f/*f*/: Foo = { a: "a" };
//// }


verify.baselineQuickInfo({ "f": [0, 1] });