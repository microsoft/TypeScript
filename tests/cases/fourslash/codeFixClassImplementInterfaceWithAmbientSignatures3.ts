/// <reference path='fourslash.ts' />

////declare abstract class A {
////    abstract method(): void;
////}
////class B implements A {}

verify.codeFix({
    description: "Implement interface 'A'",
    newFileContent:
`declare abstract class A {
    abstract method(): void;
}
class B implements A {
    method(): void {
        throw new Error("Method not implemented.");
    }
}`
});
