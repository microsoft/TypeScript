/// <reference path='fourslash.ts'/>

// References to labels with close names

/////*1*/labela: while (true) {
/////*2*/labelb:     while (false) { /*3*/break /*4*/labelb; }
////            break labelc;
////}

verify.baselineFindAllReferences('1', '2', '3', '4');
