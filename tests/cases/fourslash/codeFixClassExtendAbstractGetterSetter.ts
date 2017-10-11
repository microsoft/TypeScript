/// <reference path='fourslash.ts' />

////abstract class A {
////    private _a: string;
////
////    abstract get a(): number | string;
////    abstract get b(): this;
////    abstract get c(): A;
////
////    abstract set d(arg: number | string);
////    abstract set e(arg: this);
////    abstract set f(arg: A);
////
////    abstract get g(): string;
////    abstract set g(newName: string);
////}
////
////// Don't need to add anything in this case.
////abstract class B extends A {}
////
////class C extends A {[| |]}

verify.codeFix({
    description: "Implement inherited abstract class.",
    // TODO: GH#18795
    newRangeContent: `a: string | number;\r
b: this;\r
c: A;\r
d: string | number;\r
e: this;\r
f: A;\r
g: string;\r
 `
});
