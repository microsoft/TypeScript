/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
////abstract class A {
////    abstract f(a: number, b: string): boolean;
////    abstract f(a: number, b: string): this;
////    abstract f(a: string, b: number): Function;
////    abstract f(a: string): Function;
////    abstract foo(): number;
////}
////
////class C extends A {}

verify.codeFix({
    description: "Implement inherited abstract class",
    newFileContent:
`abstract class A {
    abstract f(a: number, b: string): boolean;
    abstract f(a: number, b: string): this;
    abstract f(a: string, b: number): Function;
    abstract f(a: string): Function;
    abstract foo(): number;
}

class C extends A {
    override f(a: number, b: string): boolean;
    override f(a: number, b: string): this;
    override f(a: string, b: number): Function;
    override f(a: string): Function;
    override f(a: unknown, b?: unknown): boolean | Function | this {
        throw new Error("Method not implemented.");
    }
    override foo(): number {
        throw new Error("Method not implemented.");
    }
}`
});
