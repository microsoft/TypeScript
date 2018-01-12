/// <reference path='fourslash.ts' />

////interface I {}
////class C extends I {}
////class D extends I {}

verify.codeFixAll({
    fixId: "extendsInterfaceBecomesImplements",
    newFileContent: `interface I {}
class C implements I {}
class D implements I {}`,
});
