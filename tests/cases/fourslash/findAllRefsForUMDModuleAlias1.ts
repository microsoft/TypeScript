/// <reference path='fourslash.ts' />

// @Filename: 0.d.ts
//// export function doThing(): string;
//// export function doTheOtherThing(): void;

//// /*1*/export as namespace /*2*/myLib;

// @Filename: 1.ts
//// /// <reference path="0.d.ts" />
//// /*3*/myLib.doThing();

verify.baselineFindAllReferences('1', '2', '3');
