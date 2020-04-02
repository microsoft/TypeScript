/// <reference path="fourslash.ts" />

/////**
//// * @typedef {object} T
//// * /**/
//// */


// jsdoc tags are listed when there is more than one whitespace after "*"
/////**
//// * /*1*/
//// */
////
/////**
//// * link to {/*2*/
//// */
////

// before the fix, jsdoc tag names was listed (but no longer appears
// jsdoc tag names are still listed after the fix.
// however this behavior does not by getCompletionData.insideComment.hasDocComment clause
/////**@/*3*/ */
////
/////**
//// * @type {@/*4*/
//// */
////
/////**
//// *@/*5*/
//// */
////

// before the fix, jsdoc tags was listed but no longer appears
/////**
//// +/*6*/
//// */
////
/////**
//// */*7*/
//// */
////

// jsdoc tag names will be listed
/////**
//// * @/*8*/
//// */
////

// before the fix, jsdoc tag names was listed but no longer appears
/////**
//// +@/*9*/
//// */
////
/////**
//// * ### jsdoc @/*10*/
//// */
////

verify.completions({ marker: "", includes: { name: "@property", text: "@property", kind: "keyword" } });


//
// test for src/services/completions.ts#getCompletionData.insideComment.hasDocComment (#37546)
//
test.markerNames().forEach(marker => {
    if (marker) {
        const n = +marker;
        switch (n) {
            case 1:
            // case 2:
                verify.completions({ marker, includes: ["@abstract", "@access"] });
                break;
            case 3:
            // case 4:
            case 5:
                verify.completions({
                    marker,
                    triggerCharacter: "@",
                    includes: ["abstract", "access"]
                });
                break;
            case 6: case 7:
                verify.completions({ marker, exact: [] });
                break;
            case 8:
                verify.completions({
                    marker,
                    triggerCharacter: "@",
                    includes: ["abstract", "access"]
                });
                break;
            case 9: case 10:
                verify.completions({
                    marker,
                    triggerCharacter: "@",
                    exact: []
                });
                break;
            default: break;
        }
    }
});
