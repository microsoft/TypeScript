/// <reference path='fourslash.ts' />

////abstract class A {
////    abstract f(a: number, b: string): boolean;
////    abstract f(a: number, b: string): this;
////    abstract f(a: string, b: number): Function;
////    abstract f(a: string): Function;
////    abstract foo(): number;
////}
////
////class C extends A {[| |]}

verify.codeFix({
    description: "Implement inherited abstract class.",
    // TODO: GH#18795
    newRangeContent: `f(a: number, b: string): boolean;\r
f(a: number, b: string): this;\r
f(a: string, b: number): Function;\r
f(a: string): Function;\r
f(a: any, b?: any) {\r
    throw new Error("Method not implemented.");\r
}\r
foo(): number {\r
    throw new Error("Method not implemented.");\r
}\r
 `
});
