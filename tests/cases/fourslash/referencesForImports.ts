/// <reference path='fourslash.ts'/>

////declare module "jquery" {
////    function $(s: string): any;
////    export = $;
////}


////import /*1*/$ = require("jquery");
/////*2*/$("a");


////import /*3*/$ = require("jquery");


goTo.marker("1");
verify.referencesCountIs(2);

goTo.marker("2");
verify.referencesCountIs(2);

goTo.marker("3");
verify.referencesCountIs(1);