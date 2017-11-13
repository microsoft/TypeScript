/// <reference path='fourslash.ts' />

////class C {
////    method() {
////        this.x = 0;
////        this.y();
////        this.x = "";
////    }
////}

verify.codeFixAll({
    groupId: "addMissingMember",
    newFileContent:
    // TODO: GH#18445
`class C {
    x: number;\r
    y(): any {\r
        throw new Error("Method not implemented.");\r
    }\r
    method() {
        this.x = 0;
        this.y();
        this.x = "";
    }
}`,
});
