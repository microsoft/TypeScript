// @strict: true
// @lib: esnext
// @noEmit: true
// @checkJs: true
// @allowJs: true

// @filename: index.js

/** @type {Map<string, string | Set<string>>} */
const cache = new Map()

/**
 * @param {string} key
 * @returns {() => string}
 */
const getStringGetter = (key) => {
  return () => {
    return /** @type {string} */ (cache.get(key))
  }
}
