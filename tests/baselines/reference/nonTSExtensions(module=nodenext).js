//// [tests/cases/conformance/externalModules/rewriteRelativeImportExtensions/nonTSExtensions.ts] ////

//// [example.json]
{}

//// [styles.d.css.ts]
export {};

//// [index.mts]
import {} from "./example.json" with { type: "json" }; // Ok
import {} from "./styles.css"; // Ok

//// [index.mjs]
export {};
