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
////interface ThingIndex {
////    [key: string]: Thing;
////}
////
////interface ThingStrictIndex {
////    [key: string]: ThingStrict;
////}
////
////declare function funcA<T extends ThingIndex>(x : T): void;
////declare function funcB<T extends ThingStrictIndex>(x : T): void;
////
////funcA({ test: { /*1*/ } });
////funcB({ test: { /*2*/ } });
////funcB({ test: { strict: true, /*3*/ } });

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