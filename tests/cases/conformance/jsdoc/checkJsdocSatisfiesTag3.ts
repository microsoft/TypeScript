// @strict: true
// @noEmit: true
// @allowJS: true
// @checkJs: true

// @filename: /a.js
/** @type {{ f(s: string): void } & Record<string, unknown> }} */
let obj = /** @satisfies {{ g(s: string): void } & Record<string, unknown>} */ ({
    f(s) { }, // "incorrect" implicit any on 's'
    g(s) { }
});

// This needs to not crash (outer node is not expression)
/** @satisfies {{ f(s: string): void }} */ ({ f(x) { } })
