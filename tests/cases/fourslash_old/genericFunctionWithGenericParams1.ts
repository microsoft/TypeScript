/// <reference path='fourslash.ts'/>

////var obj = function f<T>(a: T) {
////    var x/**/x: T;
////    return a;
////};

goTo.marker();
verify.quickInfoIs('T', null, 'xx')
