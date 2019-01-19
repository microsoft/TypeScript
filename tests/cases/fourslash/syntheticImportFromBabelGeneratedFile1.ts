/// <reference path='fourslash.ts'/>

// @allowJs: true
// @allowSyntheticDefaultImports: true

// @Filename: /a.js
////exports.__esModule = true;
////exports.default = f;
/////**
//// * Run this function
//// * @param {string} t
//// */
////function f(t) {}

// @Filename: /b.js
////import f from "./a"
/////**/f

verify.quickInfoAt("", `(alias) (property) f: (t: string) => void
import f`, "Run this function"); // Passes