/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: /a.js
//// module.exports.a = 1

// @Filename: /b.js
//// const a/*a*/ = require('./a');

goTo.file('/b.js')
const markers = test.markers();
verify.getInlayHints([
    {
        text: ':typeof import("/a")',
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    }
], undefined, {
    includeInlayVariableTypeHints: true,
    includeInlayRequireAssignedVariableTypeHints: true
});
