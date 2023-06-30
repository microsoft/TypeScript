/// <reference path="fourslash.ts" />

////interface Options {
////   /**
////    * A description of 'a'
////    */
////    a: {
////       /**
////        * A description of 'b'
////        */
////       b: string;
////   }
////}
////
////function f({ a, a: { b } }: Options) {
////    a/*1*/;
////    b/*2*/;
////}

verify.baselineQuickInfo();
