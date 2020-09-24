/// <reference path='fourslash.ts'/>

// @allowJs: true

// @Filename: /a.js
//// function f() { }
//// module.exports = { f }

// @Filename: /b.js
//// const { f } = require('./a')
//// /**/f


verify.baselineFindAllReferences("");
