/// <reference path='fourslash.ts' />

////interface I {
////    m1(): void;
////    m2(): void;
////    m3(): void;
////}
////class C implements I {
////}

verify.codeFixAll({
    fixId: "fixClassIncorrectlyImplementsInterface",
    fixAllDescription: "Implement all unimplemented interfaces",
    newFileContent:
`interface I {
    m1(): void;
    m2(): void;
    m3(): void;
}
class C implements I {
    m1(): void {
        throw new Error("Method not implemented.");
    }
    m2(): void {
        throw new Error("Method not implemented.");
    }
    m3(): void {
        throw new Error("Method not implemented.");
    }
}`,
});
