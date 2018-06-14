/// <reference path='fourslash.ts' />

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
    a: string | number;
    b: this;
    c: A;
    d: string | number;
    e: this;
    f: A;
    g: string;
}`
});
