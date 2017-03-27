/// <reference path='fourslash.ts' />

//// class D {[| |]
////      constructor(){
////          class C { x: number; }
////          this.x = new C;
////      }
////  }

verify.rangeAfterCodeFix(`x: any;`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, 0);
