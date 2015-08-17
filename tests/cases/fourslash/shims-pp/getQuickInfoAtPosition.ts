/// <reference path='fourslash.ts'/>

////class SS<T>{}
////
////var x/*1*/1 = new SS<number>();
////var x/*2*/2 = new SS();
////var x/*3*/3 = new SS;

goTo.marker('1');
verify.quickInfoIs('var x1: SS<number>');

goTo.marker('2');
verify.quickInfoIs('var x2: SS<{}>');

goTo.marker('3');
verify.quickInfoIs('var x3: SS<{}>');
