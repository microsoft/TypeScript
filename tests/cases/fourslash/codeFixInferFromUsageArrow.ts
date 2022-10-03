/// <reference path='fourslash.ts' />
////const a = (x) => x;
////const b = x => x;
////const c = x => x + 1;
////const d = x => x;
////d(1);
verify.codeFixAll({
    fixId: "inferFromUsage",
    fixAllDescription: "Infer all types from usage",
    newFileContent: `const a = (x: any) => x;
const b = (x: any) => x;
const c = (x: number) => x + 1;
const d = (x: number) => x;
d(1);`,
});
