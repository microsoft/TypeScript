/// <reference path='fourslash.ts' />

////type MyType = [string, number];
////interface I { x: MyType; test(a: MyType): void; }
////class C implements I {}

verify.codeFix({
    description: "Implement interface 'I'",
    // TODO: GH#18445
    newFileContent:
`type MyType = [string, number];
interface I { x: MyType; test(a: MyType): void; }
class C implements I {\r
    x: [string, number];\r
    test(a: [string, number]): void {\r
        throw new Error("Method not implemented.");\r
    }\r
}`,
});
