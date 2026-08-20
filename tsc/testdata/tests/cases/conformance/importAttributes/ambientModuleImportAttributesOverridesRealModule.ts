// Proposal: microsoft/TypeScript#46135 — an attribute-keyed ambient module is
// consulted before a specifier's own file resolution, so an import that carries
// matching attributes is typed by the ambient declaration even when the
// specifier also resolves to a real module. This is the case plain extension
// ambients (`declare module "*.txt"`) cannot express.

// @module: esnext
// @moduleResolution: bundler
// @target: esnext
// @strict: true
// @noEmit: true
// @allowImportingTsExtensions: true

// @filename: /ambient.d.ts
declare module "*" with { type: "text" } {
    const data: string;
    export default data;
}

// @filename: /real.ts
export const realExport = 123;
export default { shape: "object" as const };

// @filename: /main.ts
// Without attributes: the real module is used.
import real from "./real.ts";
real.shape;

// With `type: "text"`: the ambient declaration wins over the real module.
import asText from "./real.ts" with { type: "text" };
asText.charAt(0);

const s: string = asText;
const bad: number = asText; // error: string is not assignable to number
