/// <reference path='fourslash.ts'/>

////class A<T> { }
////var foo/**/ = new A<number>();

goTo.marker();
verify.quickInfoIs('A<number>');
