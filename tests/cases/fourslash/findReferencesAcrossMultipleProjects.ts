/// <reference path="fourslash.ts" />

//@Filename: a.ts
/////*1*/var /*2*/x: number;

//@Filename: b.ts
/////// <reference path="a.ts" />
/////*3*/x++;

//@Filename: c.ts
/////// <reference path="a.ts" />
/////*4*/x++;

verify.baselineFindAllReferences('1', '2', '3', '4');
