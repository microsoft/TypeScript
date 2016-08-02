/// <reference path='fourslash.ts' />

// @Filename: 0.d.ts
//// export function doThing(): string;
//// export function doTheOtherThing(): void;

//// export as namespace /*0*/myLib;

// @Filename: 1.ts
//// /// <reference path="0.d.ts" />
//// /*1*/myLib.doThing();

goTo.marker("0");
verify.quickInfoIs("export namespace myLib");

goTo.marker("1");
verify.quickInfoIs("export namespace myLib");
