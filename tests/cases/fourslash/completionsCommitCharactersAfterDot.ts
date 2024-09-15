/// <reference path='fourslash.ts' />

//// declare const obj: { banana: 1 };
//// const x = obj./*1*/
//// declare module obj./*2*/ {}
//// declare const obj2: { banana: 1 } | undefined;
//// const y = obj2?./*3*/
//// declare const obj3: { [x: string]: number };
//// const z = obj3./*4*/
//// declare const obj4: { (): string; [x: string]: number } | undefined;
//// const w = obj4?./*5*/
//// declare const obj5: { (): string } | undefined;
//// const a = obj5?./*6*/


verify.baselineCompletions();