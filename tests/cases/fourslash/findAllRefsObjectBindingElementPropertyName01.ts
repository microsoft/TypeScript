/// <reference path='fourslash.ts'/>

////interface I {
////    [|{| "isWriteAccess": true, "isDefinition": true |}property1|]: number;
////    property2: string;
////}
////
////var foo: I;
////var { [|property1|]: prop1 } = foo;

verify.singleReferenceGroup("(property) I.property1: number");
