/// <reference path='fourslash.ts' />

////class C extends Object {
////    constructor() {}
////}
////class D extends Object {
////    constructor() {}
////}

verify.codeFixAll({
    groupId: "constructorForDerivedNeedSuperCall",
    // TODO: GH#18445 GH#20073
    newFileContent: `class C extends Object {
    constructor() {super();\r
}
}
class D extends Object {
    constructor() {super();\r
}
}`,
});
