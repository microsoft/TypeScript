/// <reference path='fourslash.ts' />

////abstract class A {
////    private _a: string;
////
////    abstract get a(): string;
////    abstract set a(newName: string);
////
////    abstract get b(): number;
////
////    abstract set c(arg: number | string);
////}
////
////class C implements A {}

verify.codeFix({
    description: "Implement interface 'A'",
    newFileContent:
`abstract class A {
    private _a: string;

    abstract get a(): string;
    abstract set a(newName: string);

    abstract get b(): number;

    abstract set c(arg: number | string);
}

class C implements A {
    a: string;
    b: number;
    c: string | number;
}`,
});
