// @strict: true
// @module: preserve
// @moduleResolution: bundler
// @allowArbitraryExtensions: true
// @noEmit: true

// @filename: /types.d.ts
declare module "*.ext" with { type: "custom" } {
    export const ambient: "ambient";
}

// @filename: /file.d.ext.ts
export const physical: "physical";

// @filename: /index.ts
import * as value from "./file.ext" with { type: "custom" };
value.physical;
value.ambient;