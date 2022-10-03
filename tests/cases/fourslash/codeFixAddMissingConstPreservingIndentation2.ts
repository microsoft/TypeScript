/// <reference path='fourslash.ts' />

////a = () => {
////    for (x in []) {
////        y = 0;
////    }
////};
////b = 3;

verify.codeFixAll({
    fixId: "addMissingConst",
    fixAllDescription: "Add 'const' to all unresolved variables",
    newFileContent: `const a = () => {
    for (const x in []) {
        const y = 0;
    }
};
const b = 3;`
});
