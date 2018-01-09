/// <reference path='fourslash.ts'/>

// @allowJs: true

// @Filename: /a.js
/////** @type {/*type*/number} */
////let /*x*/x;

verify.quickInfoAt("x", "let x: number");

goTo.marker("type");
edit.replace(test.markers()[0].position, "number".length, "string");

verify.quickInfoAt("x", "let x: string");
