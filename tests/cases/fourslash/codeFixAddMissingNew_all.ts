/// <reference path='fourslash.ts' />

////class C {
////    constructor(num?: number) {}
////}
////var a = C();
////var b = C(3);

verify.codeFixAll({
    fixId: "addMissingNewOperator",
    fixAllDescription: "Add missing 'new' operator to all calls",
    newFileContent:
`class C {
    constructor(num?: number) {}
}
var a = new C();
var b = new C(3);`
});
