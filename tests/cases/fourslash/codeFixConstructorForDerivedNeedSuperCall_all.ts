/// <reference path='fourslash.ts' />

////class C extends Object {
////    constructor() {}
////}
////class D extends Object {
////    constructor() {}
////}

verify.codeFixAll({
    fixId: "constructorForDerivedNeedSuperCall",
    fixAllDescription: "Fix all like: Add missing 'super()' call",
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
