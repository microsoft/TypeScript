/// <reference path='fourslash.ts' />

////interface I {
////    method(a: number, ...b: string[]): boolean;
////    method(a: string, ...b: number[]): Function;
////    method(a: string): Function;
////}
////
////class C implements I {}

verify.codeFix({
    description: "Implement interface 'I'",
    // TODO: GH#18445
    newFileContent:
`interface I {
    method(a: number, ...b: string[]): boolean;
    method(a: string, ...b: number[]): Function;
    method(a: string): Function;
}

class C implements I {\r
    method(a: number, ...b: string[]): boolean;\r
    method(a: string, ...b: number[]): Function;\r
    method(a: string): Function;\r
    method(a: any, ...b?: any[]) {\r
        throw new Error("Method not implemented.");\r
    }\r
}`,
});
