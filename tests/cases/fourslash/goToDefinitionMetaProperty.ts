/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////im/*1*/port.met/*2*/a;
////function /*functionDefinition*/f() { n/*3*/ew.[|t/*4*/arget|]; }

// @Filename: /b.ts
////im/*5*/port.m;
////class /*classDefinition*/c { constructor() { n/*6*/ew.[|t/*7*/arget|]; } }

verify.baselineGoToDefinition(
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
);