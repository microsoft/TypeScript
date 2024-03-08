///<reference path="fourslash.ts" />

// @noEmit: true
// @allowJS: true
// @checkJs: true

// @filename: /a.js
/////**
//// * @satisfies {/**/}
//// */
////const t = { a: 1 };

verify.completions(
    { marker: "", exact: completion.globalTypes },
);
