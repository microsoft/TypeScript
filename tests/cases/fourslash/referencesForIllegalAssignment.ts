/// <reference path='fourslash.ts'/>

////f/*1*/oo = fo/*2*/o;

////var /*bar*/bar = function () { };
////bar = bar + 1;

verify.baselineFindAllReferences('1', '2', 'bar')
