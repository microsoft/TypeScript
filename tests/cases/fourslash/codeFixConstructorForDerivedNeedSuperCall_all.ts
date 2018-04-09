/// <reference path='fourslash.ts' />

////class C extends Object {
////    constructor() {}
////}
////class D extends Object {
////    constructor() {}
////}

verify.codeFixAll({
    fixId: "constructorForDerivedNeedSuperCall",
    fixAllDescription: "Add all missing super calls",
    newFileContent: `class C extends Object {
    constructor() {
        super();
    }
}
class D extends Object {
    constructor() {
        super();
    }
}`,
});
