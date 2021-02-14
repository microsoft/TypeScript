/// <reference path='fourslash.ts' />

////class A {
////    A: typeof A;
////}
////class D implements A {[| |]}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "A"],
    index: 1,
    newFileContent:
`class A {
    A: typeof A;
}
class D implements A {
    A: typeof A;
}`,
});
