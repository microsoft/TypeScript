/// <reference path='fourslash.ts'/>

////class Foo {
////    public "[|{| "isDefinition": true |}ss|]": any;
////}
////
////var x: Foo;
////x.[|ss|];
////x["[|ss|]"];
////x = { "[|{| "isWriteAccess": true, "isDefinition": true |}ss|]": 0 };
////x = { [|{| "isWriteAccess": true, "isDefinition": true |}ss|]: 0 };

verify.singleReferenceGroup('(property) Foo["ss"]: any');
