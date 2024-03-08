/// <reference path='fourslash.ts' />

////const obj = { /*1*/a: 1, b: 2 };
////const filtered: { [P in keyof typeof obj as P extends 'b' ? never : P]: 0; } = { /*2*/a: 0 };
////filtered./*3*/a;

verify.baselineFindAllReferences('1', '2', '3');
