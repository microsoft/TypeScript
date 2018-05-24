/// <reference path='fourslash.ts' />

////class C {
////    method() {
////        this.x = 0;
////        this.y();
////        this.x = "";
////    }
////}

verify.codeFixAll({
    fixId: "addMissingMember",
    fixAllDescription: "Add all missing members",
    newFileContent:
`class C {
    x: number;
    y(): any {
        throw new Error("Method not implemented.");
    }
    method() {
        this.x = 0;
        this.y();
        this.x = "";
    }
}`,
});
