/// <reference path='fourslash.ts' />

////class A {
////    A: typeof A;
////}
////class D implements A {[| |]}

verify.codeFix({
    description: "Implement interface 'A'",
    newFileContent:
`class A {
    A: typeof A;
}
class D implements A {
    A: typeof A;
}`,
});
