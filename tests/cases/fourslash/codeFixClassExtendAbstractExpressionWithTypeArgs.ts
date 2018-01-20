/// <reference path='fourslash.ts' />

////function foo<T>(a: T) {
////    abstract class C<U> {
////        abstract a: T | U;
////    }
////    return C;
////}
////
////class B extends foo("s")<number> {[|  |]}

verify.codeFix({
    description: "Implement inherited abstract class",
    // TODO: GH#18795
    newFileContent:
`function foo<T>(a: T) {
    abstract class C<U> {
        abstract a: T | U;
    }
    return C;
}

class B extends foo("s")<number> {
    a: string | number;
}`
});
