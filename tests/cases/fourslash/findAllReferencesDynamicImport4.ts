/// <reference path='fourslash.ts' />

// @strict: true

// @Filename: definition.ts
//// export default function X/*1*/() {};

// @Filename: usage.ts
//// import X/*2*/ from "./definition";
//// X/*3*/;
//// async function asd() {
////   const a = await import("./definition");
////   a.default/*4*/;
////   await import("./definition").then((m) => m.default/*5*/);
//// }

verify.baselineFindAllReferences('1', '2', '3', '4', '5');
