/// <reference path='fourslash.ts' />

// @strict: true

// @Filename: definition.ts
//// function X/*1*/() {}
//// export default X/*2*/;

// @Filename: usage.ts
//// import Y/*3*/ from "./definition";
//// Y/*4*/;
//// async function asd() {
////   const a = await import("./definition");
////   a.default/*5*/;
////   await import("./definition").then((m) => m.default/*6*/);
//// }

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6');
