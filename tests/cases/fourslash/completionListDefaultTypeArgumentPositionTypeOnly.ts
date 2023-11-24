/// <reference path='fourslash.ts'/>

//// const foo = "foo";
//// function test1<T = /*1*/>() {}

verify.completions({ marker: "1", exact: completion.globalTypes });
