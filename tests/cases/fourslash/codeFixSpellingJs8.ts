/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true

// @filename: a.js
//// var locals = {}
//// // @ts-expect-error
//// Object.keys(locale)
verify.noErrors()
