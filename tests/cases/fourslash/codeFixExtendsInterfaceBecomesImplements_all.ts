/// <reference path='fourslash.ts' />

////interface I {}
////class C extends I {}
////class D extends I {}

verify.codeFixAll({
    fixId: "extendsInterfaceBecomesImplements",
    fixAllDescription: "Change all extended interfaces to 'implements'",
    newFileContent: `interface I {}
class C implements I {}
class D implements I {}`,
});
