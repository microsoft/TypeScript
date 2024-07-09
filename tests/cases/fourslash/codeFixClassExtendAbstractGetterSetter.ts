/// <reference path='fourslash.ts' />

// @noImplicitOverride: true
////abstract class A {
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
////class C extends A {}

verify.codeFix({
    description: "Implement inherited abstract class",
    newFileContent:
`abstract class A {
    abstract get a(): number | string;
    abstract get b(): this;
    abstract get c(): A;

    abstract set d(arg: number | string);
    abstract set e(arg: this);
    abstract set f(arg: A);

    abstract get g(): string;
    abstract set g(newName: string);
}

// Don't need to add anything in this case.
abstract class B extends A {}

class C extends A {
    override get a(): string | number {
        throw new Error("Method not implemented.");
    }
    override get b(): this {
        throw new Error("Method not implemented.");
    }
    override get c(): A {
        throw new Error("Method not implemented.");
    }
    override set d(arg: string | number) {
        throw new Error("Method not implemented.");
    }
    override set e(arg: this) {
        throw new Error("Method not implemented.");
    }
    override set f(arg: A) {
        throw new Error("Method not implemented.");
    }
    override get g(): string {
        throw new Error("Method not implemented.");
    }
    override set g(newName: string) {
        throw new Error("Method not implemented.");
    }
}`
});
