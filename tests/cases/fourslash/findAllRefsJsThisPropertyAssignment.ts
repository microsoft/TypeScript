/// <reference path="fourslash.ts" />

// @allowJs: true
// @noImplicitThis: true

// @Filename: infer.d.ts
//// export declare function infer(o: { m(): void } & ThisType<{ x: number }>): void;

// @Filename: a.js
//// import { infer } from "./infer";
//// infer({
////     m() {
////         this.x = 1;
////         this./*1*/x;
////     },
//// });

// @Filename: b.js
//// /**
////  * @template T
////  * @param {{m(): void} & ThisType<{x: number}>} o
////  */
//// function infer(o) {}
//// infer({
////     m() {
////         this.x = 2;
////         this./*2*/x;
////     },
//// });

verify.baselineFindAllReferences("1", "2");
