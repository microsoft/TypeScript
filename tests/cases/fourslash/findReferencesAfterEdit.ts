/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////interface A {
////    [|{| "isWriteAccess": true, "isDefinition": true |}foo|]: string;
////}

// @Filename: b.ts
///////<reference path='a.ts'/>
/////**/
////function foo(x: A) {
////    x.[|foo|]
////}

verify.singleReferenceGroup("(property) A.foo: string");

goTo.marker("");
edit.insert("\r\n");

verify.singleReferenceGroup("(property) A.foo: string");
