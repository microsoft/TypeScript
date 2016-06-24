/// <reference path='fourslash.ts'/>

////declare module "jquery" {
////    function $(s: string): any;
////    export = $;
////}

////import [|$|] = require("jquery");
////[|$|]("a");

////import [|$|] = require("jquery");

const [r0, r1, r2] = test.ranges();
verify.rangesReferenceEachOther([r0, r1]);
verify.referencesOf(r2, [r2]);
