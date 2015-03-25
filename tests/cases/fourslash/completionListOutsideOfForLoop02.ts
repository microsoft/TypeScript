/// <reference path='fourslash.ts' />

////for (let i = 0; i < 10; i++);/*1*/

goTo.marker("1");
verify.not.completionListContains("i");