/// <reference path='fourslash.ts'/>

// @strictNullChecks: true
////interface Thing {
////    hello: number;
////    world: string;
////}
////
////declare function funcA(x : Thing): void;
////declare function funcB(x?: Thing): void;
////declare function funcC(x : Thing | null): void;
////declare function funcD(x : Thing | undefined): void;
////declare function funcE(x : Thing | null | undefined): void;
////declare function funcF(x?: Thing | null | undefined): void;
////
////funcA({ /*A*/ });
////funcB({ /*B*/ });
////funcC({ /*C*/ });
////funcD({ /*D*/ });
////funcE({ /*E*/ });
////funcF({ /*F*/ });


for (const marker of test.markers()) {
    goTo.position(marker.position);
    verify.completionListContains("hello");
    verify.completionListContains("world");
}
