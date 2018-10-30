/// <reference path="../fourslash.ts"/>

// Because the fourslash runner automatically opens the first file with the default setting,
// to test the openFile function, the targeted file cannot be the first one.

// @Filename: dumbFile.ts
//// var x;

// @allowJs: true
// @Filename: test.ts
//// /**
////  * @type {number}
////  */
//// var t;
//// t.

goTo.file("test.ts", /*content*/ undefined, "JS");
goTo.eof();
verify.completions({ includes: "toExponential" });
