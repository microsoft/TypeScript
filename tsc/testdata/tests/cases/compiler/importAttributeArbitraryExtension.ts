// @strict: true
// @module: preserve
// @moduleResolution: bundler
// @allowArbitraryExtensions: true
// @noEmit: true
// @allowImportingTsExtensions: true

// @filename: /types.d.ts
declare module "*.ext" with { type: "custom" } {
    export const ambient: "ambient";
}

declare module "*" with { type: "text" } {
    const content: string;
    export default content;
}

// @filename: /file.d.ext.ts
export const physical: "physical";

// @filename: /index.ts
import * as value from "./file.ext";
import * as valueAttr from "./file.ext" with { type: "custom" };

value.physical;
value.ambient;

valueAttr.physical;
valueAttr.ambient;

// @filename: /foo.ts
const someConstant: number = 42;
export default someConstant;

// @filename: /bar.ts
import someConstant from "./foo.ts";
import someText from "./foo.ts" with { type: "text" };
someConstant;
someText;
