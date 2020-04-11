/// <reference path="fourslash.ts" />

/////**
//// * @typedef {object} T
//// * /**/
//// */


// 1x - jsdoc tags are listed when there is more than one whitespace after "*"
/////**
//// * /*10*/
//// */
////
/////**
//// *       /*11*/
//// */
////

// 2x - Also, if there are two or more blanks at the beginning of the line
/////**
////  /*20*/
//// */
////
/////**
////      /*21*/
//// */
////

// 3x - jsdoc tag names will be listed
/////** @/*30*/ */
////
/////**    @/*31*/ */
////
/////**
//// * @/*32*/
//// */
////
/////**
//// *       @/*33*/
//// */
////
/////**
////  @/*34*/
//// */
////
/////**
////        @/*35*/
//// */
////
/////**
//// * @pa/*36*/
//// */
////

// 4x - jsdoc tag name completions should not occur
/////**@/*40*/ */
////
/////**
//// *@/*41*/
//// */
////
/////**
//// * @type {@/*42*/
//// */
////
/////**
//// +@/*43*/
//// */
////
/////** some description @/*44*/ */
////
/////**
//// * ### jsdoc @/*45*/
//// */
////
/////**
////@/*46*/
//// */
////

// 5x - jsdoc tag completions should not occur
/////**
//// */*50*/
//// */
////
/////**
//// /*51*/
//// */
////
/////**
/////*52*/
//// */
////

verify.completions({ marker: "", includes: { name: "@property", text: "@property", kind: "keyword" } });


//
// test for src/services/completions.ts#getCompletionData.insideComment.hasDocComment (#37546)
//
test.markerNames().forEach(marker => {
    if (marker) {
        let completionOpt: FourSlashInterface.CompletionsOptions;
        const n = +marker;
        switch (n) {
            // jsdoc tags will be listed when there is more than one whitespace after "*"
            case 10: case 11:
            // Also, if there are two or more blanks at the beginning of the line
            case 20: case 21:
                completionOpt = { marker, includes: [
                    "@abstract", "@access",
                ]};
                break;

            // 3x - jsdoc tag names will be listed
            case 30: case 31: case 32: case 33: case 34: case 35: case 36:
                completionOpt = {
                    marker,
                    triggerCharacter: "@",
                    includes: ["package", "param"]
                };
                break;

            // 4x - jsdoc tag name completions should not occur
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            //  before the fix, jsdoc tag names was listed but no longer appears
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            case 40: case 41: case 42: case 43: case 44: case 45: case 46:
                completionOpt = {
                    marker,
                    triggerCharacter: "@",
                    exact: []
                };
                break;

            // 5x - jsdoc tag completions should not occur
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            //  before the fix, jsdoc tags was listed but no longer appears
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            case 50: case 51: case 52:
                completionOpt = { marker, exact: [] };
                break;

            default:
                break;
        }
        if (completionOpt) {
            verify.completions(completionOpt);
        }
    }
});
