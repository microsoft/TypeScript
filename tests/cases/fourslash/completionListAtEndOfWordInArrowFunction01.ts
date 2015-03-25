/// <reference path='fourslash.ts' />

////xyz => x/*1*/

goTo.marker("1");
verify.completionListContains("xyz");