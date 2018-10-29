/// <reference path="fourslash.ts" />

////const foo = 0;
////interface I {
////    m(): void;
////    fo/*i*/
////}
////interface J { /*j*/ }
////interface K { f; /*k*/ }

////type T = { fo/*t*/ };
////type U = { /*u*/ };

////interface EndOfFile { f; /*e*/

verify.completions({ marker: test.markers(), exact: "readonly", isNewIdentifierLocation: true });
