/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////im/*1*/port.met/*2*/a;
////function f() { n/*3*/ew.t/*4*/arget; }

// @Filename: /b.ts
////im/*5*/port.m;
////class c { constructor() { n/*6*/ew.t/*7*/arget; } }

for (const marker of test.markerNames()) {
    verify.goToDefinition(marker, []);
}
