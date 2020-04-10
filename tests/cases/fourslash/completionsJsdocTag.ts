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

// 2x - also, if there is more than one whitespace at the beginning of the line.
/////**
//// /*20*/
//// */
////
/////**
////  /*21*/
//// */
////
/////**
////      /*22*/
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

// 5x - jsdoc tag completions should not occur
/////**
//// */*50*/
//// */
////

// also, can support the inline jsdoc tags
/////**
//// * link to {/*70*/
//// */
////
/////**
//// * link to {@/*71*/
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
            /* https://coderwall.com/p/zbc2zw/the-comment-toggle-trick

            // - - - - - -
            // before fix
            // - - - - - -

            // jsdoc tags will be listed when there is more than one whitespace after "*"
            case 10: case 11:
            // also, if there is more than one whitespace at the beginning of the line.
            case 20: case 21: case 22:

            // 5x - jsdoc tag completions should not occur
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            //  jsdoc tags will be listed but this does not the expected behavior
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            case 50:
                completionOpt = { marker, includes: ["@abstract", "@access"] };
                break;

            // 3x - jsdoc tag names will be listed
            case 30: case 31: case 32: case 33: case 34: case 35: case 36:

            // 4x - jsdoc tag name completions should not occur
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            //  jsdoc tag names will be listed but this does not the expected behavior
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            case 40: case 41: case 42: case 43: case 44: case 45:

            // does not the expected behavior... because ts.JsDoc@jsDocTagNames is missing inline jsdoc tag name
            // In other words, inline jsdoc tag is interpreted as not intending to support
            case 71:
                completionOpt = {
                    marker,
                    triggerCharacter: "@",
                    includes: ["package", "param"]
                };
                break;
            /*/

            // - - - - - -
            // after fix
            // - - - - - -

            // jsdoc tags will be listed when there is more than one whitespace after "*"
            case 10: case 11:
            // also, if there is more than one whitespace at the beginning of the line.
            case 20: case 21: case 22:

            // // also, can support the inline jsdoc tags
            // case 70:
                completionOpt = { marker, includes: [
                    "@abstract", "@access",
                ]};
                break;

            // 3x - jsdoc tag names will be listed
            case 30: case 31: case 32: case 33: case 34: case 35: case 36:

            // 4x - jsdoc tag name completions should not occur
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            //  this behavior does not by getCompletionData.insideComment.hasDocComment clause
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            case 40: case 41: case 42:

            // // also, can support the inline jsdoc tags
            // case 71:
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
            case 43: case 44: case 45:
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
            case 50:
                completionOpt = { marker, exact: [] };
                break;
            //*/

            default:
                break;
        }
        if (completionOpt) {
            // verify.completions(completionOpt);
            try {
                verify.completions(completionOpt);
            } catch (e) {
                console.log(e.message);
                console.log("please switch the code of src/services/completions.ts#getCompletionData");
            }
        }
    }
});
