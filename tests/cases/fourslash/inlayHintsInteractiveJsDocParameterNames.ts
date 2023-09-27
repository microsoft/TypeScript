/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: /a.js
//// var x
//// x.foo(1, 2);

//// /**
////  * @type {{foo: (a: number, b: number) => void}}
////  */
//// var y
//// y.foo(1, 2)

//// /**
////  * @type {string}
////  */
//// var z = ""

goTo.file('/a.js')
verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals",
    interactiveInlayHints: true
});
