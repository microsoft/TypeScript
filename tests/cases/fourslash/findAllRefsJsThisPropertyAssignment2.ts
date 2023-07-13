/// <reference path="fourslash.ts" />

// @allowJs: true
// @noImplicitThis: true

// @Filename: infer.d.ts
//// export declare function infer(o: { m: Record<string, Function> } & ThisType<{ x: number }>): void;

// @Filename: a.js
//// import { infer } from "./infer";
//// infer({
////     m: {
////         initData() {
////             this.x = 1;
////             this./*1*/x;
////         },
////     }
//// });

// @Filename: b.ts
//// import { infer } from "./infer";
//// infer({
////     m: {
////         initData() {
////             this.x = 1;
////             this./*2*/x;
////         },
////     }
//// });

verify.baselineFindAllReferences("1", "2");
