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
    fixId: "addMissingMember",
    newFileContent:
    // TODO: GH#18445
`class C {
    y() {\r
        throw new Error("Method not implemented.");\r
    }\r
    constructor() {\r
        this.x = undefined;\r
    }
    method() {
        this.x;
        this.y();
        this.x;
    }
}`,
});
