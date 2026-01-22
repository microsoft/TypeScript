// @module: nodenext
// @filename: types.d.ts
// Test exact match with attributes
declare module "*.css" with { type: "css" } {
    const stylesheet: CSSStyleSheet;
    export default stylesheet;
}

// Test exact match with different attributes
declare module "*.json" with { type: "json" } {
    const data: any;
    export default data;
}

// Test exact match without attributes
declare module "*.txt" {
    const content: string;
    export default content;
}

// Test multiple attributes
declare module "*.wasm" with { type: "module", version: "1" } {
    const module: WebAssembly.Module;
    export default module;
}

// @filename: test.ts
// Should resolve correctly - matching attributes
import styles from "styles.css" with { type: "css" };
styles; // Should be CSSStyleSheet

// Should resolve correctly - matching attributes
import data from "data.json" with { type: "json" };
data; // Should be any

// Should resolve correctly - no attributes on either side
import text from "file.txt";
text; // Should be string

// Should resolve correctly - multiple matching attributes
import wasmModule from "module.wasm" with { type: "module", version: "1" };
wasmModule; // Should be WebAssembly.Module

// Should NOT resolve - import has attributes but declaration doesn't
import text2 from "file2.txt" with { type: "text" };
text2; // Should be any (no match)

// Should NOT resolve - import has no attributes but declaration does
import styles2 from "styles2.css";
styles2; // Should be any (no match)

// Should NOT resolve - mismatched attribute values
import styles3 from "styles3.css" with { type: "style" };
styles3; // Should be any (no match)

// Should NOT resolve - missing attribute
import wasmModule2 from "module2.wasm" with { type: "module" };
wasmModule2; // Should be any (no match - missing version attribute)

// Should NOT resolve - extra attribute
import wasmModule3 from "module3.wasm" with { type: "module", version: "1", extra: "value" };
wasmModule3; // Should be any (no match - extra attribute)

