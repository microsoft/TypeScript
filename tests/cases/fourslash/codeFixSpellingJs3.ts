/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true

// @filename: a.js
//// class Classe {
////     non = 'oui'
////     methode() {
////         // no error on 'this' references
////         return this.none
////     }
//// }
//// class Derivee extends Classe {
////     methode() {
////         // no error on 'super' references
////         return super.none
////     }
//// }
verify.noErrors()

