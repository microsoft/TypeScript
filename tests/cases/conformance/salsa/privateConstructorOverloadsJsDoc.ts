// @allowjs: true
// @checkjs: true
// @noEmit: true
// @filename: privateConstructorOverloadsJsDoc.js

class C {
  /**
   * @private
   * @overload
   * @param x {string}
   * @param y {string}
   */

  /**
   * @private
   * @overload
   * @param x {number}
   * @param y {number}
   */

  /**
   * @private
   * @param {...any} args
   */
  constructor(...args) {}
}

new C('foo', 'bar');
new C(1, 2);
