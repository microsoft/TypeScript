/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: file.js

////class Prv {
////    #privatething = 1;
////    notSoPrivate = 1;
////}
////new Prv()['[|/**/|]'];

verify.completions({
    marker: "",
    exact: [{
        name: "notSoPrivate",
        replacementSpan: test.ranges()[0]
    }]
});
