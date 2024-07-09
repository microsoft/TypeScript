/// <reference path="fourslash.ts"/>

/////*1*/var /*2*/Base = class { };
////class C extends /*3*/Base { }

verify.baselineFindAllReferences('1', '2', '3');
