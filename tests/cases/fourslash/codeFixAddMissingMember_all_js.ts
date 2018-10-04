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
    fixAllDescription: "Add all missing members",
    newFileContent:
`class C {
    constructor() {
        this.x = undefined;
    }
    method() {
        this.x;
        this.y();
        this.x;
    }
    y() {
        throw new Error("Method not implemented.");
    }
}`,
});
