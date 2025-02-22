// @strict: true
// @lib: esnext
// @allowJS: true
// @checkJs: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/61172

// @filename: /index.js
function repeat(
	/** @type {string} */ message,
	/** @type {number} */ times,
) {
	return Array(times).fill(message).join(` `);
}

/** @type {Parameters<typeof repeat>[0]} */
const message = `hello`;

/** @type {Parameters<typeof repeat>[1]} */
const times = 3;
