/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
////abstract class A {
////    abstract f(a: number, b: string): boolean;
////    abstract f(a: number, b: string): this;
////    abstract f(a: string, b: number): Function;
////    abstract f(a: string): Function;
////
////    abstract f1(this: A): number;
////    abstract f2(this: A, a: number, b: string): number;
////
////    abstract foo(): number;
////}
////
////declare class C extends A {}

verify.codeFix({
    description: ts.Diagnostics.Implement_inherited_abstract_class.message,
    newFileContent:
`abstract class A {
    abstract f(a: number, b: string): boolean;
    abstract f(a: number, b: string): this;
    abstract f(a: string, b: number): Function;
    abstract f(a: string): Function;

    abstract f1(this: A): number;
    abstract f2(this: A, a: number, b: string): number;

    abstract foo(): number;
}

declare class C extends A {
    override f(a: number, b: string): boolean;
    override f(a: number, b: string): this;
    override f(a: string, b: number): Function;
    override f(a: string): Function;
    override f1(this: A): number;
    override f2(this: A, a: number, b: string): number;
    override foo(): number;
}`
});
