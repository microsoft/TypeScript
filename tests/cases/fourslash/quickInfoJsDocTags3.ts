/// <reference path="fourslash.ts" />

// @Filename: quickInfoJsDocTags3.ts
////interface Foo {
////    /**
////     * comment
////     * @author Me <me@domain.tld>
////     * @see x (the parameter)
////     * @param {number} x - x comment
////     * @param {number} y - y comment
////     * @throws {Error} comment
////     */
////    method(x: number, y: number): void;
////}
////
////class Bar implements Foo {
////    /**/method(): void {
////        throw new Error("Method not implemented.");
////    }
////}

verify.baselineQuickInfo();
