/// <reference path='fourslash.ts'/>

// @lib: es5

//// const foo = "foo";
//// function test1<T = /*1*/>() {}

verify.completions({ marker: "1", exact: completion.globalTypes });
