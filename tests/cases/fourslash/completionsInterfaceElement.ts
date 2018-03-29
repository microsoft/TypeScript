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

for (const marker of test.markerNames()) {
    verify.completionsAt(marker, ["readonly"], { isNewIdentifierLocation: true });
}
