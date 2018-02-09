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
