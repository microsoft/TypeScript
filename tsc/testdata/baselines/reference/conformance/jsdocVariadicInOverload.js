//// [tests/cases/conformance/jsdoc/jsdocVariadicInOverload.ts] ////

//// [typeTagForMultipleVariableDeclarations.js]
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


//// [typeTagForMultipleVariableDeclarations.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Processor = void 0;
// based on code from unifiedjs/unified
class Node {
}
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
class Processor {
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
exports.Processor = Processor;
var p = new Processor();
var x = 1, y = 2, z = 3;
p.use(x, y, z);


//// [typeTagForMultipleVariableDeclarations.d.ts]
declare class Node {
}
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
export declare class Processor<ParseTree extends Node | undefined = undefined, HeadTree extends Node | undefined = undefined, TailTree extends Node | undefined = undefined, CompileTree extends Node | undefined = undefined, CompileResult extends string | undefined = undefined> {
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
    use(preset?: string | null | undefined): Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>;
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
    use<Parameters extends Array<unknown> = [], Input extends Node | string | undefined = undefined, Output = Input>(plugin: number, ...parameters: (Parameters | [boolean])): Processor;
}
export {};
