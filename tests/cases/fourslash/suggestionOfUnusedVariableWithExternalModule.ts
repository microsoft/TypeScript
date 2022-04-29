/// <reference path='fourslash.ts' />

//@allowJs: true

// @Filename: /mymodule.js
////(function ([|root|], factory) {
////    module.exports = factory();
////}(this, function () {
////    var [|unusedVar|] = "something";
////    return {};
////}));

// @Filename: /app.js
//////@ts-check
////require("./mymodule");

const [range0, range1] = test.ranges();

goTo.file("/app.js");
verify.getSuggestionDiagnostics([]);

goTo.file("/mymodule.js");
verify.getSuggestionDiagnostics([
    {
        message: "'root' is declared but its value is never read.",
        code: 6133,
        range: range0,
        reportsUnnecessary: true,
    },
    {
        message: "'unusedVar' is declared but its value is never read.",
        code: 6133,
        range: range1,
        reportsUnnecessary: true,
    },
]);
