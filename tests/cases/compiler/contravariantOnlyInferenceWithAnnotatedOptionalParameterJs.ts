// @strict: true
// @checkJs: true
// @noEmit: true

// @filename: index.js

/**
 * @template T
 * @param {(value: T, index: number) => boolean} predicate
 * @returns {T}
 */
function filter(predicate) {
  return /** @type {any} */ (null);
}

const a = filter(
  /**
   * @param {number} [pose]
   */
  (pose) => true
);

const b = filter(
  /**
   * @param {number} [pose]
   * @param {number} [_]
   */
  (pose, _) => true
);
