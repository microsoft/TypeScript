/// <reference path='fourslash.ts'/>

//// 
//// //MyFile Comments
//// //more comments
//// /// <reference path="so/**/mePath.ts" />
////
//// class clsInOverload {
////     static fnOverload();
////     static fnOverload(foo: string);
////     static fnOverload(foo: any) { }
//// }
////

goTo.marker();
verify.not.definitionLocationExists();
