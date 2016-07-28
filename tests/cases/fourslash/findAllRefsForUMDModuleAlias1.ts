/// <reference path='fourslash.ts' />

// @filename: 0.d.ts
//// export function doThing(): string;
//// export function doTheOtherThing(): void;

//// export as namespace [|myLib|];

// @filename: 1.ts

//// /// <reference path="0.d.ts" />
//// [|myLib|].doThing();
