///<reference path="fourslash.ts" />

// https://github.com/microsoft/TypeScript/issues/62069

//// class Base {
////   /**
////    * This is a description of `someField` in the `Base` class.
////    *
////    * @deprecated
////    */
////   someField: string = "whatever";
//// }
////
//// class Derived extends Base {
////   constructor(someField: string) {
////     super();
////     console.log(someField/*1*/);
////   }
//// }

verify.quickInfoAt("1", "(parameter) someField: string", undefined);
