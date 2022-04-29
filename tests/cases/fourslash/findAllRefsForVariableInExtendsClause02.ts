/// <reference path="fourslash.ts"/>

/////*1*/interface /*2*/Base { }
////namespace n {
////    var Base = class { };
////    interface I extends /*3*/Base { }
////}

verify.baselineFindAllReferences('1', '2', '3');
