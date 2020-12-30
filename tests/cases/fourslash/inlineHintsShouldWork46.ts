/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: /a.js
//// module.exports.a = 1

// @Filename: /b.js
//// const a/*a*/ = require('./a');

goTo.file('/b.js')
const markers = test.markers();
verify.getInlineHints([
    {
        text: ':typeof import("/a")',
        position: markers[0].position,
        whitespaceBefore: true
    }
], undefined, {
    includeInlineVariableType: true,
    includeInlineRequireAssignedVariableType: true
});
