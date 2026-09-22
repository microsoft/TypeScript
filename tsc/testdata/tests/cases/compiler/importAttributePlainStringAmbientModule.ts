// @strict: true
// @module: preserve
// @moduleResolution: bundler
// @noEmit: true

// @filename: /types.d.ts
declare module "plainstring" with { type: "css" } {
    export const value: "plain";
}

// @filename: /index.ts
import { value as withoutAttributes } from "plainstring";
import { value as withAttributes } from "plainstring" with { type: "ignored" };

const first: "plain" = withoutAttributes;
const second: "plain" = withAttributes;