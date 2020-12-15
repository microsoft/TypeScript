/// <reference path='fourslash.ts' />

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
    f(a: number, b: string): boolean;
    f(a: number, b: string): this;
    f(a: string, b: number): Function;
    f(a: string): Function;
    f1(this: A): number;
    f2(this: A, a: number, b: string): number;
    foo(): number;
}`
});
