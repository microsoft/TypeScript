/// <reference path='fourslash.ts' />

////interface I {
////    method(a: number, ...b: string[]): boolean;
////    method(a: string, ...b: number[]): Function;
////    method(a: string): Function;
////}
////
////class C implements I {}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "I"],
    index: 1,
    newFileContent:
`interface I {
    method(a: number, ...b: string[]): boolean;
    method(a: string, ...b: number[]): Function;
    method(a: string): Function;
}

class C implements I {
    method(a: number, ...b: string[]): boolean;
    method(a: string, ...b: number[]): Function;
    method(a: string): Function;
    method(a: any, ...b?: any[]) {
        throw new Error("Method not implemented.");
    }
}`,
});
