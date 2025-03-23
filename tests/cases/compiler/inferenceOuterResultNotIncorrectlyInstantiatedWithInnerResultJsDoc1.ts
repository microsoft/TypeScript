// @strict: true
// @noEmit: true
// @target: esnext
// @lib: esnext
// @checkJs: true
// @allowJs: true

// @filename: index.js

// https://github.com/microsoft/TypeScript/issues/60988

/**
 * @template [T = any]
 */
class S {

	/**
	 * @type {Set<T>}
	 */
	set;

	/**
	 * @param {Set<T>} set
	 */
	constructor(set) {
		this.set = set;
	}

	array() {
		return new S(new Set([...this.set].map(item => [item])));
	}
}

/**
 * @template [T = any]
 * @param {Set<T>} set
 */
const sArray = (set) => {
	return new S(new Set([...set].map(item => [item])));
};
