///<reference path="fourslash.ts" />

//// var x = class myClass <TypeParam> {
////    getClassName (){
////        /*0*/
////    }
////    prop: Ty/*1*/
//// }

goTo.marker("0");
verify.completionListContains("TypeParam", "(type parameter) TypeParam in myClass<TypeParam>", /*documentation*/ undefined, "type parameter");

goTo.marker("1");
verify.completionListContains("TypeParam", "(type parameter) TypeParam in myClass<TypeParam>", /*documentation*/ undefined, "type parameter");