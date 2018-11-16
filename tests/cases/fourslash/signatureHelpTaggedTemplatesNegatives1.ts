/// <reference path='fourslash.ts' />

//// function f(templateStrings, x, y, z) { return 10; }
//// function g(templateStrings, x, y, z) { return ""; }
////
//// /*1*/f/*2*/ /*3*/` qwerty ${ 123 } asdf ${   41234   }  zxcvb ${ g `    ` }     `/*4*/

verify.noSignatureHelp(...test.markerNames());
