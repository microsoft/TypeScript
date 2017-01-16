/// <reference path='fourslash.ts'/>

////interface One {
////    common: { [|a|]: number; };
////}
////
////interface Base {
////    [|a|]: string;
////    b: string;
////}
////
////interface HasAOrB extends Base {
////    [|a|]: string;
////    b: string;
////}
////
////interface Two {
////    common: HasAOrB;
////}
////
////var x : One | Two;
////
////x.common.[|a|];

const [one, base, hasAOrB, x] = test.ranges();
verify.referencesOf(one, [one, x]);
verify.referencesOf(base, [base, hasAOrB, x]);
verify.referencesOf(hasAOrB, [base, hasAOrB, x]);
verify.referencesOf(x, [one, base, hasAOrB, x]);
