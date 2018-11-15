/// <reference path="fourslash.ts" />

////function /*a*/ ;
////function* /*b*/ ;
////interface I {
////    abstract baseMethod(): Iterable<number>;
////}
////class C implements I {
////    */*c*/ ;
////    public */*d*/
////}
////const o: I = {
////    */*e*/
////};
////1 * /*f*/

verify.completions(
    { marker: ["a", "b"], exact: undefined, isNewIdentifierLocation: true },
    { marker: ["c", "d"], exact: ["baseMethod"], isNewIdentifierLocation: true },
    { marker: "e", exact: ["baseMethod"] },
    { marker: "f", includes: ["Number"] },
);
