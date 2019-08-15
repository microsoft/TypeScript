/// <reference path='fourslash.ts' />

////abstract class A {
////    abstract get a(): string;
////    abstract set a(newName: string);
////
////    abstract get b(): number;
////
////    abstract set c(arg: number | string);
////}
////
////declare class C implements A {}

verify.codeFix({
    description: "Implement interface 'A'",
    newFileContent:
`abstract class A {
    abstract get a(): string;
    abstract set a(newName: string);

    abstract get b(): number;

    abstract set c(arg: number | string);
}

declare class C implements A {
    get a(): string;
    set a(newName: string);
    get b(): number;
    set c(arg: string | number);
}`,
});
