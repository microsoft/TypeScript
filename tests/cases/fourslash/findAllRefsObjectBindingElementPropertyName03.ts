/// <reference path='fourslash.ts'/>

////interface I {
////    [|property1|]: number;
////    property2: string;
////}
////
////var foo: I;
////var [{ [|property1|]: prop1 }, { [|property1|], property2 } ] = [foo, foo];

verify.rangesReferenceEachOther();
