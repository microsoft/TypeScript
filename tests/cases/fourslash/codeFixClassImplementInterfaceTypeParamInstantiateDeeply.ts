/// <reference path='fourslash.ts' />

////interface I<T> {
////    x: { y: T, z: T[] };
////}
////class C implements I<number> {[| |]}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "I<number>"],
    index: 1,
    newFileContent:
`interface I<T> {
    x: { y: T, z: T[] };
}
class C implements I<number> {
    x: { y: number; z: number[]; };
}`,
});
