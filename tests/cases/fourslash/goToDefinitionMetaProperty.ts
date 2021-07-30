/// <reference path='fourslash.ts' />

////im/*1*/port.met/*2*/a;
////function t() { n/*3*/ew.t/*4*/arget; }

verify.goToDefinition(["1", "2", "3", "4"], []);
