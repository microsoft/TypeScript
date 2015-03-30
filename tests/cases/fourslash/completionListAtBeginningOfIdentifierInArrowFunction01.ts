/// <reference path='fourslash.ts' />

////xyz => /*1*/x

goTo.marker("1");
verify.completionListContains("xyz");