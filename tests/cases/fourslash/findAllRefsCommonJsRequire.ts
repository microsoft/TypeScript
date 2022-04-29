/// <reference path='fourslash.ts'/>

// @allowJs: true

// @Filename: /a.js
//// function f() { }
//// export { f }

// @Filename: /b.js
//// const { f } = require('./a')
//// /**/f


verify.baselineFindAllReferences("");
