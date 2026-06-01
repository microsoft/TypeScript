// @checkJs: true
// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/4037

// TS7 doesn't support overloads with arrow functions and function expressions, so the
// @overload tags are ignored in the const declaration below.

// @filename: main.js

const createElementC = /**
	 * @template {keyof HTMLElementTagNameMap} T
	 * @param {T}t
	 * @param {NodeList|HTMLCollection=}c
	 *
	 * @overload
	 * @param {T}t
	 * @return {HTMLElementTagNameMap[T]}
	 *
	 * @overload
	 * @param {T}t
	 * @param {NodeList|HTMLCollection}c
	 * @return {HTMLElementTagNameMap[T]}
	 */(t, c) => {
		/* ... omitted for brevity ... */ return document.createElement(t)
	}

/**
 * @template {keyof HTMLElementTagNameMap} T
 * @param {T}t
 * @param {NodeList|HTMLCollection=}c
 *
 * @overload
 * @param {T}t
 * @return {HTMLElementTagNameMap[T]}
 *
 * @overload
 * @param {T}t
 * @param {NodeList|HTMLCollection}c
 * @return {HTMLElementTagNameMap[T]}
 */
function createElementF(t, c) {
	/* ... omitted for brevity ... */ return document.createElement(t)
}
