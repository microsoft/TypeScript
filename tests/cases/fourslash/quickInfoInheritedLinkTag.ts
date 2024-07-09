///<reference path="fourslash.ts" />

//// export class C {
////      /**
////       * @deprecated Use {@link PerspectiveCamera#setFocalLength .setFocalLength()} and {@link PerspectiveCamera#filmGauge .filmGauge} instead.
////       */
////     m() { }
//// }
//// export class D extends C {
////     m() { } // crashes here
//// }
//// new C().m/**/ // and here (with a different thing trying to access undefined)

verify.noErrors()
verify.baselineQuickInfo();
