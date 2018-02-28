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
    newFileContent:
`class C {
    y(x: number, arg1: string, z: boolean): any {
        throw new Error("Method not implemented.");
    }
    z: boolean = true;
    method() {
        const x = 0;
        this.y(x, "a", this.z);
    }
}`,
});
