/// <reference path='fourslash.ts' />

////abstract class A {
////    abstract f(): this;
////}
////
////class C extends A {[| |]}

verify.codeFix({
    description: "Implement inherited abstract class.",
    // TODO: GH#18795
    newRangeContent: `f(): this {\r
    throw new Error("Method not implemented.");\r
}\r
 `
});
