interface ArrayBuffer {
	/**
	 * Read-only. The maximum length that this ArrayBuffer can be resized to (in bytes).
	 */
	readonly maxByteLength: number;

	/**
	 * Read-only. Whether this ArrayBuffer can be resized or not.
	 */
	readonly resizable: boolean;

	/**
	 * Resizes the ArrayBuffer to the specified size (in bytes).
	 * @param newLength The new length, in bytes, to resize the ArrayBuffer to.
	 */
	resize(newLength: number): undefined;
}

/**
 * ArrayBuffer constructor options
 */
interface ArrayBufferOptions {
	maxByteLength?: number;
}

interface ArrayBufferConstructor {
	new(byteLength: number, options?: ArrayBufferOptions): ArrayBuffer;
}

interface SharedArrayBuffer {
	/**
	 * Read-only. Whether this SharedArrayBuffer can be grow or not.
	 */
	readonly growable: number;

	/**
	 * Read-only. The maximum length that this SharedArrayBuffer can be grown to (in bytes).
	 */
	readonly maxByteLength: number;

	/**
	 * Grows the SharedArrayBuffer to the specified size (in bytes).
	 * @param newLength The new length, in bytes, to resize the SharedArrayBuffer to.
	 */
	grow(newLength: number): undefined;
}

/**
 * ArrayBuffer constructor options
 */
interface SharedArrayBufferOptions {
	maxByteLength?: number;
}

interface SharedArrayBufferConstructor {
	new();
	new(byteLength: number, options?: SharedArrayBufferOptions): SharedArrayBuffer;
}
