/// <reference path='fourslash.ts' />

//// (x => x)(/*1*/x => x/*2*/)(1); 

goTo.select('1', '2');
edit.applyRefactor('Extract Method', 'scope_0');
