/// <reference path='fourslash.ts'/>

////interface IFoo {
////    a: number;
////}
////
////with (x) {
////    var y: IFoo = { /*1*/ }; 
////}

goTo.marker('1');
verify.completionListIsEmpty();