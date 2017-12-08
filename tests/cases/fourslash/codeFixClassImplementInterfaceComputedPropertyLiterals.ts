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
    // TODO: GH#18445
    newFileContent:
`interface I {
    ["foo"](o: any): boolean;
    ["x"]: boolean;
    [1](): string;
    [2]: boolean;
}

class C implements I {\r
    ["foo"](o: any): boolean {\r
        throw new Error("Method not implemented.");\r
    }\r
    ["x"]: boolean;\r
    [1](): string {\r
        throw new Error("Method not implemented.");\r
    }\r
    [2]: boolean;\r
}`,
});
