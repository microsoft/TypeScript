// @allowJs: true
// @checkJs: true
// @strict: true
// @noEmit: true
// @filename: a.js
/** @template T */
class Base {
    /** @type {T | undefined} */
    value;
}

/** @implements {Base} */
class C {
    value = 1;
}
