///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js

/////**
//// * Filters a path based on a regexp or glob pattern.
//// * @param {String} basePath The base path where the search will be performed.
//// * @param {String} pattern A string defining a regexp of a glob pattern.
//// * @param {String} type The search pattern type, can be a regexp or a glob.
//// * @param {Object} options A object containing options to the search.
//// * @return {Array} A list containing the filtered paths.
//// */
////function pathFilter(basePath, pattern, type, options){
//////...
////}
////pathFilter(/**/'foo', 'bar', 'baz', {});

verify.signatureHelp({
    marker: "",
    docComment: "Filters a path based on a regexp or glob pattern.",
    parameterDocComment: "The base path where the search will be performed.",
    tags: [
        { name: "param", text: "basePath The base path where the search will be performed." },
        { name: "param", text: "pattern A string defining a regexp of a glob pattern." },
        { name: "param", text: "type The search pattern type, can be a regexp or a glob." },
        { name: "param", text: "options A object containing options to the search." },
        { name: "return", text: "A list containing the filtered paths." },
    ],
});
