///<reference path="fourslash.ts" />

//// export class C {
////      /**
////       * @deprecated Use {@linkplain PerspectiveCamera#setFocalLength .setFocalLength()} and {@linkcode PerspectiveCamera#filmGauge .filmGauge} instead.
////       */
////     m() { }
//// }
//// new C().m/**/

verify.noErrors()
verify.baselineQuickInfo();
