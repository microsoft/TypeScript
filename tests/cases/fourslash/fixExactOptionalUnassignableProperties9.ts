/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
// @exactOptionalPropertyTypes: true
//// interface IAny {
////     a?: any
//// }
//// interface J {
////     a?: number | undefined
//// }
//// declare var iany: IAny
//// declare var j: J
//// iany/**/ = j
verify.codeFixAvailable([]);
