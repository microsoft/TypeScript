// @module: esnext
// @target: esnext
// @filename: ./a.ts
export default {};

// @filename: ./b.ts
declare global {
    interface  ImportAttributes {
        type: "json"
    }
}

import * as ns from "./a" with { type: "not-json" };
void ns;

async function f() {
    await import("./a", {
        with: {
            type: "not-json",
        },
    });
}
