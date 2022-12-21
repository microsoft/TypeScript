/// <reference path="fourslash.ts" />

// @allowJs: true

// Test validates that language service getChildren() doesn't
// crash due to invalid identifier in unicode.js.

// @Filename: decl.js
//// var obj = {};

// @Filename: unicode1.js
//// obj.𝒜 ;

// @Filename: unicode2.js
//// obj.¬ ;

// @Filename: unicode3.js
//// obj¬

// @Filename: forof.js
//// for (obj/**/.prop of arr) {
//// 
//// }

verify.baselineRename("", {});
