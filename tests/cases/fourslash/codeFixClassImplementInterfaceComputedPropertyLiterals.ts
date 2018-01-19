/// <reference path='fourslash.ts' />

////interface I {
////    ["foo"](o: any): boolean;
////    ["x"]: boolean;
////    [1](): string;
////    [2]: boolean;
////}
////
////class C implements I {}

verify.codeFix({
    description: "Implement interface 'I'",
    newFileContent:
`interface I {
    ["foo"](o: any): boolean;
    ["x"]: boolean;
    [1](): string;
    [2]: boolean;
}

class C implements I {
    ["foo"](o: any): boolean {
        throw new Error("Method not implemented.");
    }
    ["x"]: boolean;
    [1](): string {
        throw new Error("Method not implemented.");
    }
    [2]: boolean;
}`,
});
