/// <reference path='fourslash.ts'/>

////var x/*1*/x = true ? [1] : [undefined]; 
////var y/*2*/ = true ? [1] : [];

goTo.marker('1');
verify.quickInfoIs('number[]');

goTo.marker('2');
verify.quickInfoIs('number[]');
