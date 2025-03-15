//// [tests/cases/conformance/jsdoc/jsdocTemplateTagOverload1.ts] ////

//// [index.js]
/**
 * @template {string} Element
 * @overload
 * @param {Element} element
 * @returns {() => void}
 */

/**
 * @template {boolean} Element
 * @overload
 * @param {Element} element
 * @returns {() => void}
 */

/**
 * @overload
 * @param {number} element
 * @returns {() => void}
 */

/**
 * @param {any} element
 */
export function on(element) {
	return () => {}
}




//// [index.d.ts]
/**
 * @template {string} Element
 * @overload
 * @param {Element} element
 * @returns {() => void}
 */
export function on<Element extends string>(element: Element): () => void;
/**
 * @template {boolean} Element
 * @overload
 * @param {Element} element
 * @returns {() => void}
 */
export function on<Element extends boolean>(element: Element): () => void;
/**
 * @overload
 * @param {number} element
 * @returns {() => void}
 */
export function on(element: number): () => void;
