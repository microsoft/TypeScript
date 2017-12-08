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
    // TODO: GH#18445
    newFileContent:
`abstract class A {
    private _a: string;

    abstract get a(): string;
    abstract set a(newName: string);

    abstract get b(): number;

    abstract set c(arg: number | string);
}

class C implements A {\r
    a: string;\r
    b: number;\r
    c: string | number;\r
}`,
});
