/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true

// @filename: a.js
//// var other = {
////     puuce: 4
//// }
//// var Jimmy = 1
//// var John = 2

// @filename: b.js
//// other.puuuce // OK, from another file
//// new Date().getGMTDate() // OK, from another file
//// window.argle // OK, from globalThis
//// self.blargle // OK, from globalThis
////
//// // No suggestions for globals from other files
//// const atoc = setIntegral(() => console.log('ok'), 500)
//// AudioBuffin // etc
//// Jimmy
//// Jon


verify.noErrors()
