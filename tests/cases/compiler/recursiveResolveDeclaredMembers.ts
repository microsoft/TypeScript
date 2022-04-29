// #23025
// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: types.ts
export interface F {
    (): E;
}
export interface D<T extends F = F> {}

// @Filename: other.js
/** @typedef {import("./types").D} E */
