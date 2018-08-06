/// <reference path='fourslash.ts' />

//// const a = { a: 1, b: 2, c: 3,           d: 4, e: 5, f: (1, 2, 3, 4), g: 6 }

format.setOption("placeNewLineForMultiLineBlocks", true);
format.document();

verify.currentFileContentIs(`const a = { a: 1, b: 2, c: 3, d: 4, e: 5, f: (1, 2, 3, 4), g: 6 }`);
