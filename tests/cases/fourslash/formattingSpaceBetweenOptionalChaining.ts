/// <reference path='fourslash.ts' />

/////*1*/a    ?.    b   ?.   c   .   d;
/////*2*/o    .  m()   ?.   length;

format.document();
goTo.marker("1");
verify.currentLineContentIs("a?.b?.c.d;");
goTo.marker("2");
verify.currentLineContentIs("o.m()?.length;");
