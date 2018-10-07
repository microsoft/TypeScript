/// <reference path='fourslash.ts' />

////class Test {
////    readonly prop = 5;
////}
////let testInstance = new Test();
////testInstance.prop = 3;

verify.codeFix({
    description: "Change 'readonly' to 'non-readonly'",
    newFileContent:
`class Test {
 prop = 5;
}
let testInstance = new Test();
testInstance.prop = 3;`,
});
