interface ArrayBuffer {
    /**
     * If this ArrayBuffer is resizable, returns the maximum byte length given during construction; returns the byte length if not.
     */
    get maxByteLength(): number;
    /**
     * Returns true if this ArrayBuffer can be resized.
     */
    get resizable(): boolean;

    /**
     * Resizes the ArrayBuffer to the specified size (in bytes).
     * @param newByteLength The new length, in bytes, to resize the ArrayBuffer to.
     */
    resize(newByteLength: number): undefined;
}

interface ArrayBufferOptions {
    maxByteLength?: number;
}

interface ArrayBufferConstructor {
    new(byteLength?: number, options?: ArrayBufferOptions): ArrayBuffer;
}

interface SharedArrayBuffer {
    /**
     * Returns true if this SharedArrayBuffer can grow.
     */
    get growable(): number;

    /**
     * If this SharedArrayBuffer is growable, returns the maximum byte length given during construction; returns the byte length if not.
     */
    get maxByteLength(): number;

    /**
     * Grows the SharedArrayBuffer to the specified size (in bytes).
     * @param newByteLength The new length, in bytes, to resize the SharedArrayBuffer to.
     */
    grow(newByteLength: number): undefined;
}

interface SharedArrayBufferOptions {
    maxByteLength?: number;
}

interface SharedArrayBufferConstructor {
    new(
        byteLength?: number,
        options?: SharedArrayBufferOptions,
    ): SharedArrayBuffer;
}
