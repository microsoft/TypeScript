///<reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js

/////**
//// * Doc comment
//// * [|@typedef /*def*/[|{| "contextRangeIndex": 0 |}Product|]
//// * @property {string} title
//// |]*/

/////**
//// * @type {[|/*use*/Product|]}
//// */
////const product = null;

const desc = `type Product = {
    title: string;
}`;

const [r0Def, ...ranges] = test.ranges();
verify.quickInfoAt("use", desc, "Doc comment");

verify.baselineCommands(
    { type: "findAllReferences", markerOrRange: ["use", "def"] },
    { type: "findRenameLocations", markerOrRange: ranges },
    { type: "documentHighlights", markerOrRange: ranges },
    { type: "goToDefinition", markerOrRange: "use" },
);
