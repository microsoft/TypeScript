/// <reference path='fourslash.ts' />

////class C {
////    z: boolean = true;
////    method() {
////        const x = 0;
////        this.y(x, "a", this.z);
////    }
////}

verify.codeFixAll({
    fixId: "addMissingMember",
    fixAllDescription: "Add all missing members",
    newFileContent:
`class C {
    z: boolean = true;
    method() {
        const x = 0;
        this.y(x, "a", this.z);
    }
    y(x: number, arg1: string, z: boolean): any {
        throw new Error("Method not implemented.");
    }
}`,
});
