/// <reference path='fourslash.ts'/>

////interface I {
////    propertyOfI_1: number;
////    propertyOfI_2: string;
////}
////interface J {
////    property1: I;
////    property2: string;
////}
////
////var foo: J[];
////var [{ property1: { propertyOfI_1, }, /*1*/ }, { /*2*/ }] = foo;

verify.completions(
    { marker: "1", exact: "property2" },
    { marker: "2", exact: ["property1", "property2"] },
);
