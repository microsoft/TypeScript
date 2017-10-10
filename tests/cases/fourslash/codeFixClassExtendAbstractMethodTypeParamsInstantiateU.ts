/// <reference path='fourslash.ts' />

////abstract class A<T> {
////    abstract f(x: T): T;
////}
////
////class C<U> extends A<U> {[| |]}

verify.codeFix({
    description: "Implement inherited abstract class.",
    // TODO: GH#18795
    newRangeContent: `f(x: U): U {\r
    throw new Error("Method not implemented.");\r
}\r
 `
});
