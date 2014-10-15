/// <reference path='fourslash.ts'/>

////var x/*1*/x = true ? [1] : [undefined]; 
////var y/*2*/y = true ? [1] : [];

goTo.marker('1');
verify.quickInfoIs('(var) xx: number[]');

goTo.marker('2');
verify.quickInfoIs('(var) yy: number[]');
