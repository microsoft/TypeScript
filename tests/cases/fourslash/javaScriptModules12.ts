///<reference path="fourslash.ts" />

// Invocations of 'require' stop top-level variables from becoming global

// @allowJs: true

// @Filename: mod1.js
//// var x = require('fs');
//// /*1*/

// @Filename: mod2.js
//// var y;
//// if(true) {
////     y = require('fs');
//// }
//// /*2*/

// @Filename: glob1.js
//// var a = require;
//// /*3*/

// @Filename: glob2.js
//// var b = '';
//// /*4*/

// @Filename: consumer.js
//// /*5*/

verify.completions(
    { at: "1", includes: ["x", "a", "b"], excludes: "y" },
    { at: "2", includes: ["y", "a", "b"], excludes: "x" },
    { at: ["3", "4", "5"], includes: ["a", "b"], excludes: ["x", "y"] },
);
