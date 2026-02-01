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
async function testDynamicImports() {
    // Should resolve correctly - matching attributes
    const styles = await import("styles.css", { with: { type: "css" } });
    styles.default; // Should be CSSStyleSheet

    // Should resolve correctly - matching attributes
    const data = await import("data.json", { with: { type: "json" } });
    data.default; // Should be any

    // Should resolve correctly - no attributes on either side
    const text = await import("file.txt");
    text.default; // Should be string

    // Should resolve correctly - multiple matching attributes
    const wasmModule = await import("module.wasm", { with: { type: "module", version: "1" } });
    wasmModule.default; // Should be WebAssembly.Module

    // Should NOT resolve - import has attributes but declaration doesn't
    const text2 = await import("file2.txt", { with: { type: "text" } });
    text2.default; // Should be any (no match)

    // Should NOT resolve - import has no attributes but declaration does
    const styles2 = await import("styles2.css");
    styles2.default; // Should be any (no match)

    // Should NOT resolve - mismatched attribute values
    const styles3 = await import("styles3.css", { with: { type: "style" } });
    styles3.default; // Should be any (no match)

    // Should NOT resolve - missing attribute
    const wasmModule2 = await import("module2.wasm", { with: { type: "module" } });
    wasmModule2.default; // Should be any (no match - missing version attribute)

    // Should NOT resolve - extra attribute
    const wasmModule3 = await import("module3.wasm", { with: { type: "module", version: "1", extra: "value" } });
    wasmModule3.default; // Should be any (no match - extra attribute)
}

