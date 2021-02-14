/// <reference path='fourslash.ts' />

////interface I {
////    x: number;
////    y?: number;
////}
////class C1 implements I {}
////class C2 implements I {}
////class C3 implements I {}

verify.codeFixAll({
    fixAllDescription: ts.Diagnostics.Implement_required_members_of_interfaces_in_all_classes.message,
    fixId: "fixClassIncorrectlyImplementsInterface_required",
    newFileContent:
`interface I {
    x: number;
    y?: number;
}
class C1 implements I {
    x: number;
}
class C2 implements I {
    x: number;
}
class C3 implements I {
    x: number;
}`
});
