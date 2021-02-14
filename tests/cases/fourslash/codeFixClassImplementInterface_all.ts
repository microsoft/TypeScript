/// <reference path='fourslash.ts' />

////interface I { i(): void; }
////interface J { j(): void; }
////class C implements I, J {}
////class D implements J {}

verify.codeFixAll({
    fixId: "fixClassIncorrectlyImplementsInterface_required",
    fixAllDescription: ts.Diagnostics.Implement_required_members_of_interfaces_in_all_classes.message,
    newFileContent:
`interface I { i(): void; }
interface J { j(): void; }
class C implements I, J {
    i(): void {
        throw new Error("Method not implemented.");
    }
    j(): void {
        throw new Error("Method not implemented.");
    }
}
class D implements J {
    j(): void {
        throw new Error("Method not implemented.");
    }
}`,
});
