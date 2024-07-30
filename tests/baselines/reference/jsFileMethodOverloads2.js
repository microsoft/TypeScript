//// [tests/cases/compiler/jsFileMethodOverloads2.ts] ////

//// [jsFileMethodOverloads2.js]
// Also works if all @overload tags are combined in one comment.
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
   * @param {Example<number>} this
   * @returns {'number'}
   *
   * @overload
   * @param {Example<string>} this
   * @returns {'string'}
   *
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
   *
   * @overload
   * @returns {T}
   *
   * @param {(y: T) => unknown} [fn]
   * @returns {unknown}
   */
  transform(fn) {
    return fn ? fn(this.value) : this.value;
  }
}


//// [jsFileMethodOverloads2.js]
// Also works if all @overload tags are combined in one comment.
/**
 * @template T
 */
var Example = /** @class */ (function () {
    /**
     * @param {T} value
     */
    function Example(value) {
        this.value = value;
    }
    /**
     * @overload
     * @param {Example<number>} this
     * @returns {'number'}
     *
     * @overload
     * @param {Example<string>} this
     * @returns {'string'}
     *
     * @returns {string}
     */
    Example.prototype.getTypeName = function () {
        return typeof this.value;
    };
    /**
     * @template U
     * @overload
     * @param {(y: T) => U} fn
     * @returns {U}
     *
     * @overload
     * @returns {T}
     *
     * @param {(y: T) => unknown} [fn]
     * @returns {unknown}
     */
    Example.prototype.transform = function (fn) {
        return fn ? fn(this.value) : this.value;
    };
    return Example;
}());


//// [jsFileMethodOverloads2.d.ts]
/**
 * @template T
 */
declare class Example<T> {
    /**
     * @param {T} value
     */
    constructor(value: T);
    value: T;
    /**
     * @overload
     * @param {Example<number>} this
     * @returns {'number'}
     *
     * @overload
     * @param {Example<string>} this
     * @returns {'string'}
     *
     * @returns {string}
     */
    getTypeName(this: Example<number>): "number";
    /**
     * @overload
     * @param {Example<number>} this
     * @returns {'number'}
     *
     * @overload
     * @param {Example<string>} this
     * @returns {'string'}
     *
     * @returns {string}
     */
    getTypeName(this: Example<string>): "string";
    /**
     * @template U
     * @overload
     * @param {(y: T) => U} fn
     * @returns {U}
     *
     * @overload
     * @returns {T}
     *
     * @param {(y: T) => unknown} [fn]
     * @returns {unknown}
     */
    transform<U>(fn: (y: T) => U): U;
    /**
     * @template U
     * @overload
     * @param {(y: T) => U} fn
     * @returns {U}
     *
     * @overload
     * @returns {T}
     *
     * @param {(y: T) => unknown} [fn]
     * @returns {unknown}
     */
    transform<U>(): T;
}
