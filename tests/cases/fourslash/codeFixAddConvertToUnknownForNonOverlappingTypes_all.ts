/// <reference path='fourslash.ts' />

////const s1 = 1 as string;
////const o1 = s + " word" as object;
////
////const s2 = <string>2;
////const o2 = <object>s2;

verify.codeFixAll({
    fixId: "addConvertToUnknownForNonOverlappingTypes",
    fixAllDescription: "Add 'unknown' to all conversions of non-overlapping types",
    newFileContent:
`const s1 = 1 as unknown as string;
const o1 = s + " word" as unknown as object;

const s2 = <string><unknown>2;
const o2 = <object><unknown>s2;`
});