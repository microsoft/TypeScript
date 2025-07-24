// @checkJs: true
// @filename: typeTagForMultipleVariableDeclarations.js
// @allowJs: true
// @outdir: out
// @declaration: true

// based on code from unifiedjs/unified
class Node {}
/**
 * @template {Node | undefined} [ParseTree=undefined]
 *   Output of `parse` (optional).
 * @template {Node | undefined} [HeadTree=undefined]
 *   Input for `run` (optional).
 * @template {Node | undefined} [TailTree=undefined]
 *   Output for `run` (optional).
 * @template {Node | undefined} [CompileTree=undefined]
 *   Input of `stringify` (optional).
 * @template {string | undefined} [CompileResult=undefined]
 *   Output of `stringify` (optional).
 */
export class Processor {
  /**
   * @overload
   * @param {string | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   * @overload
   * @param {number} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {Processor}
   *
   * @param {string | number | boolean | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(value, ...parameters) {
    return this;
  }
}
var p = new Processor();
var x = 1, y = 2, z = 3;
p.use(x, y, z);
