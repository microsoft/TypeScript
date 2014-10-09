/// <reference path='fourslash.ts'/>

////interface A { }
////var f44: (x: A) => (y: A) => A = /*1*/x => /*2*/y => /*3*/x;

goTo.marker('1');
verify.quickInfoIs('(parameter) x: A');

goTo.marker('2');
verify.quickInfoIs('(parameter) y: A');

goTo.marker('3');
verify.quickInfoIs('(parameter) x: A');