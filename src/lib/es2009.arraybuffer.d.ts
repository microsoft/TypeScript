/**
 * Represents a raw buffer of binary data, which is used to store data for the
 * different typed arrays. ArrayBuffers cannot be read from or written to directly,
 * but can be passed to a typed array or DataView Object to interpret the raw
 * buffer as needed.
 */
 interface ArrayBuffer {
    /**
     * Read-only. The length of the ArrayBuffer (in bytes).
     */
    readonly byteLength: number;

    /**
     * Returns a section of an ArrayBuffer.
     */
    slice(begin: number, end?: number): ArrayBuffer;
}

/**
 * Allowed ArrayBuffer types for the buffer of an ArrayBufferView and related Typed Arrays.
 */
interface ArrayBufferTypes {
    ArrayBuffer: ArrayBuffer;
}
type ArrayBufferLike = ArrayBufferTypes[keyof ArrayBufferTypes];

interface ArrayBufferConstructor {
    readonly prototype: ArrayBuffer;
    new(byteLength: number): ArrayBuffer;
    isView(arg: any): arg is ArrayBufferView;
}
declare var ArrayBuffer: ArrayBufferConstructor;

interface ArrayBufferView {
    /**
     * The ArrayBuffer instance referenced by the array.
     */
    buffer: ArrayBufferLike;

    /**
     * The length in bytes of the array.
     */
    byteLength: number;

    /**
     * The offset in bytes of the array.
     */
    byteOffset: number;
}
