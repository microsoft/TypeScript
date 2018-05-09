/// <reference path='fourslash.ts' />

// Should define spans for replacement that appear after the last directory seperator in triple slash references

// @typeRoots: my_typings

// @Filename: test.ts
//// /// <reference path="./[|some|]/*0*/
//// /// <reference types="[|some|]/*1*/

//// /// <reference path="./sub/[|some|]/*2*/" />
//// /// <reference types="[|some|]/*3*/" />

// @Filename: someFile.ts
//// /*someFile*/

// @Filename: sub/someOtherFile.ts
//// /*someOtherFile*/

// @Filename: my_typings/some-module/index.d.ts
//// export var x = 9;

verify.completionsAt("0", ["someFile.ts", "my_typings", "sub"], { isNewIdentifierLocation: true });
verify.completionsAt("1", ["some-module"], { isNewIdentifierLocation: true });
verify.completionsAt("2", ["someOtherFile.ts"], { isNewIdentifierLocation: true });
verify.completionsAt("3", ["some-module"], { isNewIdentifierLocation: true });
