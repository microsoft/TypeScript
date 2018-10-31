/// <reference path='fourslash.ts' />

// Should define spans for replacement that appear after the last directory seperator in dynamic import statements

// @typeRoots: my_typings

// @Filename: test.ts
//// const a = import("./some/*0*/
//// const a = import("./sub/some/*1*/");
//// const a = import("[|some-/*2*/|]");
//// const a = import("..//*3*/");


// @Filename: someFile1.ts
//// /*someFile1*/

// @Filename: sub/someFile2.ts
//// /*someFile2*/

// @Filename: my_typings/some-module/index.d.ts
//// export var x = 9;

verify.completions(
    { marker: "0", exact: ["someFile1", "my_typings", "sub"], isNewIdentifierLocation: true },
    { marker: "1", exact: "someFile2", isNewIdentifierLocation: true },
    { marker: "2", exact: { name: "some-module", replacementSpan: test.ranges()[0] }, isNewIdentifierLocation: true },
    { marker: "3", exact: "fourslash", isNewIdentifierLocation: true },
);
