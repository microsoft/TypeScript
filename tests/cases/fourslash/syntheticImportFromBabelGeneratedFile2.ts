/// <reference path='fourslash.ts'/>

// @allowJs: true
// @allowSyntheticDefaultImports: true

// @Filename: /a.js
////Object.defineProperty(exports, "__esModule", {
////    value: true
////});
////exports.default = f;
/////**
//// * Run this function
//// * @param {string} t
//// */
////function f(t) {}

// @Filename: /b.js
////import f from "./a"
/////**/f

verify.quickInfoAt("", `(alias) function f(t: string): void
import f`, "Run this function"); // Passes
