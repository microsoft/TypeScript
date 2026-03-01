/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
//// abstract class A {
////   abstract foo(n: number | string): number | string;
//// }
////
//// abstract class B extends A {
////   abstract override foo(n: number): number;
//// }
////
//// class C extends B { }

verify.codeFix({
  description: "Implement inherited abstract class",
  newFileContent: `abstract class A {
  abstract foo(n: number | string): number | string;
}

abstract class B extends A {
  abstract override foo(n: number): number;
}

class C extends B {
    override foo(n: number): number {
        throw new Error("Method not implemented.");
    }
}`,
});
