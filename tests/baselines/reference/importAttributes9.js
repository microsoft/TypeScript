//// [tests/cases/conformance/importAttributes/importAttributes9.ts] ////

//// [a.ts]
export default {};

//// [b.ts]
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


//// [a.js]
export default {};
//// [b.js]
import * as ns from "./a" with { type: "not-json" };
void ns;
async function f() {
    await import("./a", {
        with: {
            type: "not-json",
        },
    });
}
