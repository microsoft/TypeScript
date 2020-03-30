/// <reference path="fourslash.ts" />

/////**
//// * @typedef {object} T
//// * /**/
//// */

/////**
//// +/*1*/
//// */
////function a0(s: string) {}
////

verify.completions({ marker: "", includes: { name: "@property", text: "@property", kind: "keyword" } });


//
// test for src/services/completions.ts#getCompletionData.insideComment.hasDocComment (#37546)
//
// line 2: [ +|c|]
verify.completions({
    marker: "1",
    exact: []
});
// line 2: [ +|c|] -> [ +@|c|]
// before the fix, jsdoc tag names was listed but no longer appears
edit.insert("@");
verify.completions({
    marker: "1",
    exact: []
});
// line 2: [ +@|c|] -> [ *|c|]
// before the fix, jsdoc tags was listed but no longer appears
edit.replaceLine(1, " *");
verify.completions({
    exact: []
});
// line 2: [ *|c|] -> [ *@|c|]
// this behavior does not by getCompletionData.insideComment.hasDocComment section
edit.insert("@");
verify.completions({
    triggerCharacter: "@",
    includes: ["abstract", "access"]
});
// line 2: [ *@|c|] -> [ * |c|]
// jsdoc tags are listed when there is more than one whitespace after "*"
edit.replaceLine(1, " * ");
verify.completions({
    includes: ["@abstract", "@access"]
});
// line 2: [ * |c|] -> [ * @|c|]
// jsdoc tag names will be listed
edit.insert("@");
verify.completions({
    triggerCharacter: "@",
    includes: ["abstract", "access"]
});
