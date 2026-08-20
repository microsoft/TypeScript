// Proposal: microsoft/TypeScript#46135 — ambient module declarations keyed on
// import attributes. Two declarations for the same specifier pattern "*" are
// discriminated purely by their `with { type: ... }` clause, so the same file
// can be typed as `string` or `Uint8Array` depending on the import's attributes.

// @module: esnext
// @moduleResolution: bundler
// @target: esnext
// @strict: true
// @noEmit: true

// @filename: /ambient.d.ts
declare module "*" with { type: "text" } {
    const data: string;
    export default data;
}
declare module "*" with { type: "bytes" } {
    const data: Uint8Array<ArrayBuffer>;
    export default data;
}

// @filename: /main.ts
import textData from "./file.txt" with { type: "text" };
import bytesData from "./file.txt" with { type: "bytes" };

// textData is string
textData.charAt(0);
// bytesData is Uint8Array
bytesData.byteLength;

// Attribute mismatches are caught by the usual assignability checks.
const asString: string = textData;
const asBytes: Uint8Array = bytesData;
const wrong: number = textData; // error: string is not assignable to number
