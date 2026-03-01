///<reference path="fourslash.ts" />

// @noEmit: true
// @allowJS: true
// @checkJs: true

// @filename: /a.js

/////**
//// * @typedef {Object} [|/*def*/T|]
//// * @property {number} a
//// */
////
/////** @satisfies {/*use*/[|T|]} comment */
////const foo = { a: 1 };

verify.baselineGetDefinitionAtPosition("use");
