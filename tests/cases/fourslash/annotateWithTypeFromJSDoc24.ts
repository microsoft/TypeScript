/// <reference path="fourslash.ts" />
// @strict: true

////class C {
////    /**
////     * @private
////     * @param {number} foo
////     * @param {Object} [bar]
////     * @param {String} bar.a
////     * @param {Number} [bar.b]
////     * @param bar.c
////     */
////    m(foo, bar) { }
////}

verify.codeFix({
    description: ts.Diagnostics.Annotate_with_type_from_JSDoc.message,
    index: 2,
    newFileContent:
`class C {
    /**
     * @private
     * @param {number} foo
     * @param {Object} [bar]
     * @param {String} bar.a
     * @param {Number} [bar.b]
     * @param bar.c
     */
    m(foo: number, bar: { a: string; b?: number; c: any; }) { }
}`,
});
