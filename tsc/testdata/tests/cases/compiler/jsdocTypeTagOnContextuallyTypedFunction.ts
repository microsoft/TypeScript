// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strict: true

// @filename: a.js
/** @type {{ f: (a: string | number, ...rest: unknown[]) => string }} */
const context = { f: (a) => "" };

context.f =
    /** @type {(content: string, ...rest: [boolean?]) => string} */
    (content, ...rest) => content.toUpperCase() + rest.length;

/** @type {(content: string | number) => string} */
const g =
    /** @type {(content: string) => string} */
    (content) => content.toUpperCase();
