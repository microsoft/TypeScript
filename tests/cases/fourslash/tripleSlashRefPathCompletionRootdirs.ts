/// <reference path='fourslash.ts' />

// Should NOT give completions for directories that are merged via the rootDirs compiler option

// @rootDirs: sub/src1,src2

// @Filename: src2/test0.ts
//// /// <reference path="./mo/*0*/

// @Filename: src2/module0.ts
//// export var w = 0;

// @Filename: sub/src1/module1.ts
//// export var x = 0;

// @Filename: sub/src1/module2.ts
//// export var y = 0;

// @Filename: sub/src1/more/module3.ts
//// export var z = 0;


// @Filename: f1.ts
//// /*f1*/
// @Filename: f2.tsx
//// /*f2*/
// @Filename: folder/f1.ts
//// /*subf1*/
// @Filename: f3.js
//// /*f3*/
// @Filename: f4.jsx
//// /*f4*/
// @Filename: e1.ts
//// /*e1*/
// @Filename: e2.js
//// /*e2*/

verify.completions({ marker: "0", exact: "module0.ts", isNewIdentifierLocation: true });
