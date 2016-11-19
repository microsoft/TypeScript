/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// function f1 () {
////    [|let x = 10;
////    {
////        let x = 11;
////    }
////    x;|]
//// }

verify.codeFixAtPosition(`let x = 10;
   {
   }
   x;`);
