/// <reference path='fourslash.ts' />

////class C extends Object {
////    constructor() {
////        this;
////        this;
////        super();
////    }
////}
////class D extends Object {
////    constructor() {
////        this;
////        super();
////    }
////}

verify.codeFixAll({
    groupId: "classSuperMustPrecedeThisAccess",
    newFileContent: `class C extends Object {
    constructor() {
        super();\r
        this;
        this;
    }
}
class D extends Object {
    constructor() {
        super();\r
        this;
    }
}`,
});

