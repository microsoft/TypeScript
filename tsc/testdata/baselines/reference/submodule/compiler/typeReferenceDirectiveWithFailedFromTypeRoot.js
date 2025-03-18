//// [tests/cases/compiler/typeReferenceDirectiveWithFailedFromTypeRoot.ts] ////

//// [dummy.d.ts]
declare const a2: number;

//// [phaser.d.ts]
declare const a: number;

//// [package.json]
{ "name": "phaser", "version": "1.2.3", "types": "types/phaser.d.ts" }

//// [a.ts]
a;

//// [a.js]
a;
