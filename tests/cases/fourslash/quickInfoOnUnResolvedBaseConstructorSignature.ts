/// <reference path='fourslash.ts'/>

////class baseClassWithConstructorParameterSpecifyingType {
////    constructor(loading?: boolean) {
////    }
////}
////class genericBaseClassInheritingConstructorFromBase<TValue> extends baseClassWithConstructorParameterSpecifyingType {
////}
////class classInheritingSpecializedClass extends genericBaseClassInheritingConstructorFromBase<string> {
////}
////new class/*1*/InheritingSpecializedClass();

goTo.marker('1');
verify.quickInfoExists();