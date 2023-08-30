// @strict: true
// @checkJs: true
// @noEmit: true

// @filename: index.js

/**
 * @typedef {{ [K in keyof B]: { fn: (a: A, b: B) => void; thing: B[K]; } }} Funcs
 * @template A
 * @template {Record<string, unknown>} B
 */

/**
 * @template A
 * @template {Record<string, unknown>} B
 * @param {Funcs<A, B>} fns
 * @returns {[A, B]}
 */
function foo(fns) {
  return /** @type {any} */ (null);
}

const result = foo({
  bar: {
    fn:
      /** @param {string} a */
      (a) => {},
    thing: "asd",
  },
});