/// <reference path="fourslash.ts" />

/////**
//// * JSDoc for things
//// */
////function f() {
////    /** more
////        jsdoc */
////    var t;
////    /**
////     * multiline
////     */
////    var multiline;
////}

format.document();

verify.currentFileContentIs(`/**
 * JSDoc for things
 */
function f() {
    /** more
        jsdoc */
    var t;
    /**
     * multiline
     */
    var multiline;
}`);
