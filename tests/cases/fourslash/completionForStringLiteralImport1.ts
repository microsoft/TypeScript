/// <reference path='fourslash.ts' />

// Should define spans for replacement that appear after the last directory seperator in import statements

// @typeRoots: my_typings

// @Filename: test.ts
//// import * as foo0 from  "./some/*0*/
//// import * as foo1 from  "./sub/some/*1*/
//// import * as foo2 from  "[|some-|]/*2*/"
//// import * as foo3 from  "..//*3*/";


// @Filename: someFile1.ts
//// /*someFile1*/

// @Filename: sub/someFile2.ts
//// /*someFile2*/

// @Filename: my_typings/some-module/index.d.ts
//// export var x = 9;

verify.completionsAt("0", ["someFile1", "my_typings", "sub"], { isNewIdentifierLocation: true });
verify.completionsAt("1", ["someFile2"], { isNewIdentifierLocation: true });
verify.completionsAt("2", [{ name: "some-module", replacementSpan: test.ranges()[0] }], { isNewIdentifierLocation: true });
verify.completionsAt("3", ["fourslash"], { isNewIdentifierLocation: true });
