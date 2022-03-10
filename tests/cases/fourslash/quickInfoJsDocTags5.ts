/// <reference path="fourslash.ts" />

// @noEmit: true
// @allowJs: true

// @Filename: quickInfoJsDocTags5.js
////class Foo {
////    /**
////     * comment
////     * @author Me <me@domain.tld>
////     * @see x (the parameter)
////     * @param {number} x - x comment
////     * @param {number} y - y comment
////     * @returns The result
////     */
////    method(x, y) {
////       return x + y;
////    }
////}
////
////class Bar extends Foo {
////    /**/method(x, y) {
////        const res = super.method(x, y) + 100;
////        return res;
////    }
////}

verify.baselineQuickInfo();
