/// <reference path='fourslash.ts' />

//// class D {[| |]
////      constructor(){
////          class C { x: number; }
////          this.x = new C;
////      }
////  }

// Note, neither property declaration not index signature declaration should be available.
verify.not.codeFixAvailable();