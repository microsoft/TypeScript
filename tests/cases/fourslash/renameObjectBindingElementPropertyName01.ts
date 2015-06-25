/// <reference path='fourslash.ts'/>

////interface I {
////    /*1*/[|property1|]: number;
////    property2: string;
////}
////
////var foo: I;
////var { /*2*/[|property1|]: prop1 } = foo;

for (let m of test.markers()) {
    goTo.position(m.position);
    verify.renameInfoSucceeded("property1", "I.property1", "property");
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}