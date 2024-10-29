// @strict: true
// @noEmit: true
// @target: esnext
// @checkJs: true
// @filename: file.js


// Don't peek into conditional return expression if it's wrapped in a cast
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