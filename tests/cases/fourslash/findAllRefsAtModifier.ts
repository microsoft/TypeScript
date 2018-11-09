/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////class C {
////    /**/public [|{| "isDefinition": true |}x|]: number;
////}
////new C().[|x|];

verify.referenceGroups("", [{ definition: "(property) C.x: number", ranges: test.ranges() }]);
