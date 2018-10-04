/// <reference path='fourslash.ts'/>

////interface I {
////    [|{| "isDefinition": true |}property1|]: number;
////    property2: string;
////}
////
////var foo: I;
////var { [|property1|]: {} } = foo;

verify.singleReferenceGroup("(property) I.property1: number");
