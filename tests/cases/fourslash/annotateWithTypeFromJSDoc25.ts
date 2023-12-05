/// <reference path="fourslash.ts" />
// @strict: true

////class C {
////    /**
////     * @private
////     * @param {number} foo
////     * @param {Object} [bar]
////     * @param {String} bar.a
////     * @param {Object} [baz]
////     * @param {number} baz.c
////     */
////    m(foo, bar, baz) { }
////}

verify.codeFix({
    description: ts.Diagnostics.Annotate_with_type_from_JSDoc.message,
    index: 3,
    newFileContent:
`class C {
    /**
     * @private
     * @param {number} foo
     * @param {Object} [bar]
     * @param {String} bar.a
     * @param {Object} [baz]
     * @param {number} baz.c
     */
    m(foo: number, bar: { a: string; }, baz: { c: number; }) { }
}`,
});
