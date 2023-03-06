/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: /a.js
//// module.exports.a = 1

// @Filename: /b.js
//// function foo () { return require('./a'); }
//// function bar ()/*a*/ { return require('./a').a; }
//// const c = foo()
//// const d/*b*/ = bar()

goTo.file('/b.js')
const markers = test.markers();
verify.getInlayHints([
    {
        text: ': 1',
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ': 1',
        position: markers[1].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
], undefined, {
    includeInlayVariableTypeHints: true,
    includeInlayFunctionLikeReturnTypeHints: true
});
