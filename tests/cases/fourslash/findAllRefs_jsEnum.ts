/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////** @enum {string} */
////const [|{| "isWriteAccess": true, "isDefinition": true |}E|] = { A: "" };
////[|E|]["A"];
/////** @type {[|E|]} */
////const e = [|E|].A;

verify.singleReferenceGroup(
`enum E
const E: {
    A: string;
}`);
