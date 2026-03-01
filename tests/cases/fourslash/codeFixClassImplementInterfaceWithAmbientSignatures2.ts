/// <reference path='fourslash.ts' />

////declare class A {
////    method(): void;
////}
////class B implements A {}

verify.codeFix({
    description: "Implement interface 'A'",
    newFileContent:
`declare class A {
    method(): void;
}
class B implements A {
    method(): void {
        throw new Error("Method not implemented.");
    }
}`
});
