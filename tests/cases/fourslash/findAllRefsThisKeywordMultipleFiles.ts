/// <reference path='fourslash.ts' />

// @Filename: file1.ts
/////*1*/this; /*2*/this;

// @Filename: file2.ts
/////*3*/this;
/////*4*/this;

// @Filename: file3.ts
//// ((x = /*5*/this, y) => /*6*/this)(/*7*/this, /*8*/this);
//// // different 'this'
//// function f(this) { return this; }

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6', '7', '8');
