/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: /a.js
//// module.exports.a = 1

// @Filename: /b.js
//// const a = require('./a');

goTo.file('/b.js')
const markers = test.markers();
verify.getInlineHints([], undefined, {
    includeInlineVariableTypeHints: true,
    includeInlineRequireAssignedVariableTypeHints: false
});
