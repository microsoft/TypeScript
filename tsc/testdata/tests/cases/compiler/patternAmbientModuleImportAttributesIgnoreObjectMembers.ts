// @strict: true
// @target: esnext
// @module: preserve
// @moduleResolution: bundler
// @noEmit: true

// @filename: /types.d.ts
declare module "*.style" with { type: "css" } {
    export const kind: "css";
}

// @filename: /object.ts
export {};
declare global {
    interface Object {
        type: "css";
    }
}

// @filename: /index.ts
import * as withoutAttributes from "./a.style";
import * as withAttributes from "./b.style" with { type: "css" };
const kind: "css" = withAttributes.kind;

async function test() {
    const dynamicWithoutAttributes = await import("./c.style");
    const dynamicWithAttributes = await import("./d.style", { with: { type: "css" } });
    const dynamicKind: "css" = dynamicWithAttributes.kind;
}
