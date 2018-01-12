/// <reference path='fourslash.ts' />

////interface I {
////    method(a: number, b: string): boolean;
////    method(a: string, b: number): Function;
////    method(a: string): Function;
////}
////
////class C implements I {}

verify.codeFix({
    description: "Implement interface 'I'",
    // TODO: GH#18445
    newFileContent:
`interface I {
    method(a: number, b: string): boolean;
    method(a: string, b: number): Function;
    method(a: string): Function;
}

class C implements I {
    method(a: number, b: string): boolean;
    method(a: string, b: number): Function;
    method(a: string): Function;
    method(a: any, b?: any) {
        throw new Error("Method not implemented.");
    }
}`,
});
