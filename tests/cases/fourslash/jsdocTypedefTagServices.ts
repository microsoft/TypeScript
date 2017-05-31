///<reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js

/////**
//// * Doc comment
//// * @typedef /*def*/[|{| "isWriteAccess": true, "isDefinition": true |}Product|]
//// * @property {string} title
//// */

/////**
//// * @type {/*use*/[|Product|]}
//// */
////const product = null;

const desc = `type Product = {
    title: string;
}`;

verify.quickInfoAt("use", desc, "Doc comment");

verify.goToDefinition("use", "def");

verify.rangesAreOccurrences();
verify.rangesAreDocumentHighlights();
verify.singleReferenceGroup(desc);
verify.rangesAreRenameLocations();
