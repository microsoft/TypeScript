/// <reference path='fourslash.ts' />

////class C extends Object {
////    constructor() {}
////}
////class D extends Object {
////    constructor() {}
////}

verify.codeFixAll({
    fixId: "constructorForDerivedNeedSuperCall",
    // TODO: GH#18445
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
