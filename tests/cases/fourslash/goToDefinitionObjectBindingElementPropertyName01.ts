/// <reference path='fourslash.ts'/>

////interface I {
////    /*def*/property1: number;
////    property2: string;
////}
////
////var foo: I;
////var { [|/*use*/property1|]: prop1 } = foo;

verify.baselineGoToDefinition("use");
