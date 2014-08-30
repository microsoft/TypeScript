/// <reference path='fourslash.ts'/>

// References to lable wiht close names

/////*1*/labela: while (true) {
/////*2*/labelb:     while (false) { break labelb; }
////            break labelc;
////}

goTo.marker("1");
verify.referencesCountIs(1);

goTo.marker("2");
verify.referencesCountIs(2);