/// <reference path='fourslash.ts' />

// @Filename: 0.d.ts
//// export function doThing(): string;
//// export function doTheOtherThing(): void;

//// export as namespace /*0*/myLib;

// @Filename: 1.ts
//// /// <reference path="0.d.ts" />
//// /*1*/myLib.doThing();

verify.quickInfos({
    0: "export namespace myLib",
    1: "export namespace myLib"
});
