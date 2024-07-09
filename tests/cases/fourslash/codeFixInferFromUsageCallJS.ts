/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: test.js
////function wat(b) {
////    b();
////}

verify.codeFix({
    index: 0,
    description: ignoreInterpolations(ts.Diagnostics.Infer_parameter_types_from_usage),
    newFileContent:
`/**
 * @param {() => void} b
 */
function wat(b) {
    b();
}`});
