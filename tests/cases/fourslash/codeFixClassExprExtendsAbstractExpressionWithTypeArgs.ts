/// <reference path='fourslash.ts' />

////function foo<T>(a: T) {
////    abstract class C<U> {
////        abstract a: T | U;
////    }
////    return C;
////}
////
////let B = class extends foo("s")<number> {[|  |]}

verify.codeFix({
    description: "Implement inherited abstract class.",
    // TODO: GH#18795
    newRangeContent: `a: string | number;\r
  `
});
