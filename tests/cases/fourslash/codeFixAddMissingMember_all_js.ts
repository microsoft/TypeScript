/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true

// @Filename: /a.js
////class C {
////    constructor() {}
////    method() {
////        this.x;
////        this.y();
////        this.x;
////    }
////}

verify.codeFixAll({
    groupId: "addMissingMember",
    newFileContent:
    // TODO: GH#18445 GH#20073
`class C {
    y() {\r
        throw new Error("Method not implemented.");\r
    }\r
    constructor() {this.x = undefined;\r
}
    method() {
        this.x;
        this.y();
        this.x;
    }
}`,
});
