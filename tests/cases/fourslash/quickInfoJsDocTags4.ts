/// <reference path="fourslash.ts" />

// @Filename: quickInfoJsDocTags4.ts
////class Foo {
////    /**
////     * comment
////     * @author Me <me@domain.tld>
////     * @see x (the parameter)
////     * @param {number} x - x comment
////     * @param {number} y - y comment
////     * @returns The result
////     */
////    method(x: number, y: number): number {
////       return x + y;
////    }
////}
////
////class Bar extends Foo {
////    /**/method(x: number, y: number): number {
////        const res = super.method(x, y) + 100;
////        return res;
////    }
////}

verify.baselineQuickInfo();
