/// <reference path='fourslash.ts' />

////const variable = 5;
////variable = 4;
////class Test {
////    readonly prop = 5;
////}
////let testInstance = new Test();
////testInstance.prop = 3;

verify.codeFixAll({
    fixId: "fixConvertConstantVariableOrProperty",
    fixAllDescription: "Make variables and properties mutable where necessary",
    newFileContent: `let variable = 5;
variable = 4;
class Test {
    prop = 5;
}
let testInstance = new Test();
testInstance.prop = 3;`,
});
