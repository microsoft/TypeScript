// @allowJs: true
// @noEmit: true
// @filename: 0.js

/**
 * @template T
 */
 class Example {
  /**
   * @param {T} value 
   */
  constructor(value) {
    this.value = value;
  }

  /**
   * @overload
   * @this {Example<'number'>}
   * @returns {'number'}
   */
  /**
   * @overload
   * @this {Example<'string'>}
   * @returns {'string'}
   */
  /**
   * @returns {string}
   */
  getTypeName() {
    return typeof this.value;
  }

  /**
   * @template U
   * @overload
   * @param {(y: T) => U} fn
   * @returns {U}
   */
  /**
   * @overload
   * @returns {T}
   */
  /**
   * @param {(y: T) => unknown} [fn]
   * @returns {unknown}
   */
  transform(fn) {
    return fn ? fn(this.value) : this.value;
  }
}
