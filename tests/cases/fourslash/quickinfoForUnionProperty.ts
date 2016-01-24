/// <reference path="fourslash.ts"/>

////interface One {
////    commonProperty: number;
////    commonFunction(): number;
////}
////
////interface Two {
////    commonProperty: string
////    commonFunction(): number;
////}
////
////var /*1*/x : One | Two;
////
////x./*2*/commonProperty;
////x./*3*/commonFunction;


goTo.marker("1");
verify.quickInfoIs('var x: One | Two');


goTo.marker("2");
verify.quickInfoIs('(property) commonProperty: number | string');

goTo.marker("3");
verify.quickInfoIs('(method) commonFunction(): number');
