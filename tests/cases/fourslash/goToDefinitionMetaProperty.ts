/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////im/*1*/port.met/*2*/a;
////function /*functionDefinition*/f() { n/*3*/ew.[|t/*4*/arget|]; }

// @Filename: /b.ts
////im/*5*/port.m;
////class /*classDefinition*/c { constructor() { n/*6*/ew.[|t/*7*/arget|]; } }

verify.goToDefinition("1", []);
verify.goToDefinition("2", []);
verify.goToDefinition("3", []);
verify.goToDefinition("4", ["functionDefinition"]);
verify.goToDefinition("5", []);
verify.goToDefinition("6", []);
verify.goToDefinition("7", ["classDefinition"]);
