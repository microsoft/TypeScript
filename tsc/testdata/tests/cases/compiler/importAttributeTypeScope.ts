// @strict: true
// @module: preserve
// @moduleResolution: bundler
// @noEmit: true
// @noTypesAndSymbols: true

// @filename: /types.d.ts
type AttributeValue = "css";

declare module "*.asset" with { type: AttributeValue } {
    export type AttributeValue = "text";
    export const value: "css";
}

// @filename: /index.ts
import { value } from "./file.asset" with { type: "css" };

const result: "css" = value;