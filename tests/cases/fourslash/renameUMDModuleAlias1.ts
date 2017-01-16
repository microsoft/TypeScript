/// <reference path='fourslash.ts' />

// @Filename: 0.d.ts
//// export function doThing(): string;
//// export function doTheOtherThing(): void;

//// export as namespace [|myLib|];

// @Filename: 1.ts
//// /// <reference path="0.d.ts" />
//// [|myLib|].doThing();

const ranges = test.ranges()
for (const range of ranges) {
    goTo.position(range.start);
    verify.renameLocations(/*findInStrings*/ false, /*findInComments*/ false);
}