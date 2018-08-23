/// <reference path="fourslash.ts" />

////function /*a*/ ;
////function* /*b*/ ;
////class C {
////    */*c*/
////    public */*d*/
////}
////const o = {
////    */*e*/
////};
////1 * /*f*/

verify.completions(
    { marker: ["a", "b", "c", "d", "e"], exact: undefined, isNewIdentifierLocation: true },
    { marker: "f", includes: ["Number"] },
);
