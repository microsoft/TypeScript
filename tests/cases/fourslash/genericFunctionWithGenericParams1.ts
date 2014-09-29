/// <reference path='fourslash.ts'/>

////var obj = function f<T>(a: T) {
////    var x/**/x: T;
////    return a;
////};

goTo.marker();
// TODO (local var)
//verify.quickInfoIs('(local var) xx: T', null);
verify.quickInfoIs('(var) xx: T', null);

