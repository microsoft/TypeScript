/// <reference path='fourslash.ts'/>

////declare module "jquery" {
////    function $(s: string): any;
////    export = $;
////}

/////*1*/import /*2*/$ = require("jquery");
/////*3*/$("a");

/////*4*/import /*5*/$ = require("jquery");

verify.baselineFindAllReferences('1', '2', '3', '4', '5');
