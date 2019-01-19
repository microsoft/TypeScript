/// <reference path='fourslash.ts'/>

////class Foo {
////    public [|{| "isDefinition": true |}12|]: any;
////}
////
////var x: Foo;
////x[[|12|]];
////x = { "[|{| "isWriteAccess": true, "isDefinition": true |}12|]": 0 };
////x = { [|{| "isWriteAccess": true, "isDefinition": true |}12|]: 0 };

verify.singleReferenceGroup("(property) Foo[12]: any");
