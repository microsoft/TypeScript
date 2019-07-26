/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////** @enum {string} */
////[|const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}E|] = { A: "" };|]
////[|E|]["A"];
/////** @type {[|E|]} */
////const e = [|E|].A;

verify.singleReferenceGroup(
`type E = string
const E: {
    A: string;
}`, "E");
