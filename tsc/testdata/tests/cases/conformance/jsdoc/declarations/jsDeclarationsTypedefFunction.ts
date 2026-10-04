// @allowJs: true
// @checkJs: true
// @target: esnext
// @outDir: ./out
// @declaration: true
// @filename: foo.js
/**
 * @typedef {{
 *   [id: string]: [Function, Function];
 * }} ResolveRejectMap
 */

let id = 0

/**
 * @param {ResolveRejectMap} handlers
 * @returns {Promise<any>}
 */
const send = handlers => new Promise((resolve, reject) => {
  handlers[++id] = [resolve, reject]
})