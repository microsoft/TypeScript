/// <reference path="fourslash.ts" />
// @strict: true

////class C {
////    /**
////     * @private
////     * @param {Object} [foo]
////     * @param {Object} foo.a
////     * @param {String} [foo.a.b]
////     */
////    m(foo) { }
////}

verify.codeFix({
    description: ts.Diagnostics.Annotate_with_type_from_JSDoc.message,
    index: 1,
    newFileContent:
`class C {
    /**
     * @private
     * @param {Object} [foo]
     * @param {Object} foo.a
     * @param {String} [foo.a.b]
     */
    m(foo: { a: { b?: string; }; }) { }
}`,
});
