/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
////interface Thing {
////    hello?: number;
////    world?: string;
////}
////
////interface ThingStrict {
////    hello?: number;
////    world?: string;
////    strict: boolean;
////}
////
////declare function funcA<T extends Thing>(x : T): void;
////declare function funcB<T extends ThingStrict>(x : T): void;
////
////funcA({ /*1*/ });
////funcB({ /*2*/ });
////funcB({ strict: true, /*3*/ });

goTo.marker(1);
verify.completionListContains("hello");
verify.completionListContains("world");

goTo.marker(2);
verify.completionListContains("hello");
verify.completionListContains("world");
verify.completionListContains("strict");

goTo.marker(3);
verify.completionListContains("hello");
verify.completionListContains("world");