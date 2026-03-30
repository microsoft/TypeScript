/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true

// @filename: a.js
//// class Classe {
////     non = 'oui'
////     method() {
////         // no error on 'this' references
////         return this.none
////     }
//// }
//// class Derivee extends Classe {
////     method() {
////         // no error on 'super' references
////         return super.none
////     }
//// }
verify.noErrors()

