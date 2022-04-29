/// <reference path='fourslash.ts' />

////a = () => {
////    x = 0;
////    [y] = [1];
////  weirdlyIndented = 2;
////};
////b = 3;

verify.codeFixAll({
    fixId: "addMissingConst",
    fixAllDescription: "Add 'const' to all unresolved variables",
    newFileContent: `const a = () => {
    const x = 0;
    const [y] = [1];
  const weirdlyIndented = 2;
};
const b = 3;`
});
