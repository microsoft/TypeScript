// @allowJs: true
// @checkJs: true
// @noEmit: true
// @target: es2017
// @filename: file.js

// Error (good)
/** @type {function(): string} */
const a = () => 0

// Error (good)
/** @type {function(): string} */
const b = async () => 0

// No error (bad)
/** @type {function(): string} */
const c = async () => {
	return 0
}

// Error (good)
/** @type {function(): string} */
const d = async () => {
	return ""
}

/** @type {function(function(): string): void} */
const f = (p) => {}

// Error (good)
f(async () => {
	return 0
})