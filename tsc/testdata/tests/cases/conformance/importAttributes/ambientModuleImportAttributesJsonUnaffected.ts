// Proposal: microsoft/TypeScript#46135 — attribute-keyed ambient modules must
// not disturb the built-in `type: "json"` behavior, and an attribute-keyed
// `declare module "*"` must not shadow a plain `declare module "*"`. An import
// whose attributes match no declaration falls through to normal resolution.

// @module: esnext
// @moduleResolution: bundler
// @target: esnext
// @strict: true
// @resolveJsonModule: true
// @noEmit: true

// @filename: /ambient.d.ts
declare module "*" {
    const anything: { plain: true };
    export default anything;
}
declare module "*" with { type: "text" } {
    const data: string;
    export default data;
}

// @filename: /data.json
{ "value": 1 }

// @filename: /main.ts
// Built-in json typing is unaffected by the attribute-keyed ambients.
import config from "./data.json" with { type: "json" };
const value: number = config.value;

// The plain wildcard ambient still applies to attribute-less imports.
import plain from "./whatever.asset";
const isPlain: boolean = plain.plain;

// The attribute-keyed ambient applies only to the matching attributes.
import text from "./whatever.asset" with { type: "text" };
const asString: string = text;
