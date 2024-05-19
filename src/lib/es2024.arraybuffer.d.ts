interface ArrayBuffer {
    /**
     * If this ArrayBuffer is resizable, returns the maximum byte length given during construction; returns the byte length if not.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/maxByteLength)
     */
    get maxByteLength(): number;

    /**
     * Returns true if this ArrayBuffer can be resized.
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/resizable)
     */
    get resizable(): boolean;

    /**
     * Resizes the ArrayBuffer to the specified size (in bytes).
     *
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/resize)
     */
    resize(newByteLength: number): undefined;
}

interface ArrayBufferConstructor {
    new (byteLength: number, options?: { maxByteLength?: number; }): ArrayBuffer;
}
