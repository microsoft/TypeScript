/// <reference path='fourslash.ts' />

////xyz => x/*1*/y

goTo.marker("1");
verify.completionListContains("xyz");