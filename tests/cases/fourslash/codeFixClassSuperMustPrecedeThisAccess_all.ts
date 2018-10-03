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
    fixId: "classSuperMustPrecedeThisAccess",
    newFileContent: `class C extends Object {
    constructor() {
        super();
        this;
        this;
    }
}
class D extends Object {
    constructor() {
        super();
        this;
    }
}`,
});

