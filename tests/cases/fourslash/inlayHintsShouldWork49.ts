/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: /a.js
//// /**
////  * @type {string}
////  */
//// var x = ""


goTo.file('/a.js')
verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals"
});
