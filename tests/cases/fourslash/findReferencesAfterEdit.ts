/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////interface A {
////    [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}foo|]: string;|]
////}

// @Filename: b.ts
///////<reference path='a.ts'/>
/////**/
////function foo(x: A) {
////    x.[|foo|]
////}

verify.singleReferenceGroup("(property) A.foo: string", "foo");

goTo.marker("");
edit.insert("\n");

verify.singleReferenceGroup("(property) A.foo: string", "foo");
