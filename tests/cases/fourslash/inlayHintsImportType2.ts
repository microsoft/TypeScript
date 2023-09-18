/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: /a.js
//// module.exports.a = 1

// @Filename: /b.js
//// function foo () { return require('./a'); }
//// function bar () { return require('./a').a; }
//// const c = foo()
//// const d = bar()

goTo.file('/b.js')
verify.baselineInlayHints(undefined, {
    includeInlayVariableTypeHints: true,
    includeInlayFunctionLikeReturnTypeHints: true
});
