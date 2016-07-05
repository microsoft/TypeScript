/// <reference path='../fourslash.ts' />

/////// <reference types="foo" />
////var x: number;
////x./*1*/

goTo.marker("1");
verify.not.completionListIsEmpty();

