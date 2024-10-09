// @strict: true
// @noEmit: true
// @target: esnext
// @checkJs: true
// @filename: file.js

/** @type {Map<string, string>} */
const sources = new Map();
/**

 * @param {string=} type the type of source that should be generated
 * @returns {String}
 */
function source(type = "javascript") {
    return /** @type {String} */ (
        type
            ? sources.get(type)
            : sources.get("some other thing")
    );
}

/**
 * @template {boolean} T
 * @param {T} b
 * @returns {T extends true ? 1 : T extends false ? 2 : never}
 */
function simple(b) {
    return b ? 1 : 2;
}