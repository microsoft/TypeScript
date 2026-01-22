//// [tests/cases/conformance/ambient/ambientModuleWithImportAttributesDiagnostics.ts] ////

//// [types.d.ts]
// Declare ambient modules with import attributes
declare module "*.css" with { type: "css" } {
    const stylesheet: CSSStyleSheet;
    export default stylesheet;
}

declare module "*.json" with { type: "json" } {
    const data: any;
    export default data;
}

declare module "*.txt" {
    const content: string;
    export default content;
}

//// [test.ts]
// Should error - pattern matches but attributes don't match
import styles1 from "styles.css" with { type: "style" };

// Should error - pattern matches but import has no attributes when declaration requires them
import styles2 from "styles2.css";

// Should error - pattern matches but import has attributes when declaration doesn't
import text from "file.txt" with { type: "text" };

// Should error - pattern matches but attribute value is wrong
import data from "data.json" with { type: "data" };



//// [test.js]
export {};


//// [test.d.ts]
export {};
