/// <reference path='fourslash.ts' />

////interface I {
////    f<T extends number>(x: T): T;
////}
////class C implements I {}

verify.codeFix({
    description: "Implement interface 'I'",
    newFileContent:
`interface I {
    f<T extends number>(x: T): T;
}
class C implements I {
    f<T extends number>(x: T): T {
        throw new Error("Method not implemented.");
    }
}`,
});
