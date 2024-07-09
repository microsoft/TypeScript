/// <reference path="fourslash.ts" />

////var re = /\w+   /*1*//;

goTo.marker('1');
edit.insert("\n");

verify.currentFileContentIs("var re = /\\w+\n    /;");
