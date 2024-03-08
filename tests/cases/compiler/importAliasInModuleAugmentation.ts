export { }

namespace A {
    export const y = 34;
    export interface y { s: string }
}

declare global {
    export import x = A.y;

    // Should still error
    import f = require("fs");
}

const m: number = x;
let s: x = { s: "" };
void s.s;