/// <reference path="fourslash.ts" />

// @filename: /a.d.ts
/////** docs - type T */
////export type T = () => void;
/////**
//// * docs - const A: T
//// */
////export declare const A: T;

// @filename: /b.ts
////import { A } from "./a";
////A/**/()

verify.baselineQuickInfo();
