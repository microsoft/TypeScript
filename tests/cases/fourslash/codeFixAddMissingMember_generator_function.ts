/// <reference path='fourslash.ts' />

////class C {
////    *method() {
////        yield* this.y();
////    }
////}

verify.codeFixAll({
    fixId: "addMissingMember",
    fixAllDescription: "Add all missing members",
    newFileContent:
        `class C {
    *method() {
        yield* this.y();
    }
    *y() {
        throw new Error("Method not implemented.");
    }
}`,
});
