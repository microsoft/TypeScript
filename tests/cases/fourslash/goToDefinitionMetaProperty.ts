/// <reference path='fourslash.ts' />

////im/*1*/port.met/*2*/a;
////function t() { n/*3*/ew.t/*4*/arget; }

for (const marker of test.markerNames()) {
    verify.goToDefinition(marker, []);
}
