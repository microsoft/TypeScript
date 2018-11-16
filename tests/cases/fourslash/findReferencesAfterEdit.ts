/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////interface A {
////    [|{| "isDefinition": true |}foo|]: string;
////}

// @Filename: b.ts
///////<reference path='a.ts'/>
/////**/
////function foo(x: A) {
////    x.[|foo|]
////}

verify.singleReferenceGroup("(property) A.foo: string");

goTo.marker("");
edit.insert("\n");

verify.singleReferenceGroup("(property) A.foo: string");
