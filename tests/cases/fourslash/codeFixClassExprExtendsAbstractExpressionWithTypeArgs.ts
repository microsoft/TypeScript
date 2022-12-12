/// <reference path='fourslash.ts' />

////function foo<T>(a: T) {
////    a;
////    abstract class C<U> {
////        abstract a: T | U;
////    }
////    return C;
////}
////
////let B = class extends foo("s")<number> {}

verify.codeFix({
    description: "Implement inherited abstract class",
    newFileContent:
`function foo<T>(a: T) {
    a;
    abstract class C<U> {
        abstract a: T | U;
    }
    return C;
}

let B = class extends foo("s")<number> {
    a: string | number;
}`
});
