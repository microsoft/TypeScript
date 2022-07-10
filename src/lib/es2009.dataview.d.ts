/// <reference lib="es2009.arraybuffer" />

interface DataView {
    readonly buffer: ArrayBuffer;
    readonly byteLength: number;
    readonly byteOffset: number;
    /**
     * Gets the Float32 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     * @param littleEndian If false or undefined, a big-endian value should be read.
     */
    getFloat32(byteOffset: number, littleEndian?: boolean): number;

    /**
     * Gets the Float64 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     * @param littleEndian If false or undefined, a big-endian value should be read.
     */
    getFloat64(byteOffset: number, littleEndian?: boolean): number;

    /**
     * Gets the Int8 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     */
    getInt8(byteOffset: number): number;

    /**
     * Gets the Int16 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     * @param littleEndian If false or undefined, a big-endian value should be read.
     */
    getInt16(byteOffset: number, littleEndian?: boolean): number;
    /**
     * Gets the Int32 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     * @param littleEndian If false or undefined, a big-endian value should be read.
     */
    getInt32(byteOffset: number, littleEndian?: boolean): number;

    /**
     * Gets the Uint8 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     */
    getUint8(byteOffset: number): number;

    /**
     * Gets the Uint16 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     * @param littleEndian If false or undefined, a big-endian value should be read.
     */
    getUint16(byteOffset: number, littleEndian?: boolean): number;

    /**
     * Gets the Uint32 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     * @param littleEndian If false or undefined, a big-endian value should be read.
     */
    getUint32(byteOffset: number, littleEndian?: boolean): number;

    /**
     * Stores an Float32 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     * @param littleEndian If false or undefined, a big-endian value should be written.
     */
    setFloat32(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
     * Stores an Float64 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     * @param littleEndian If false or undefined, a big-endian value should be written.
     */
    setFloat64(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
     * Stores an Int8 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     */
    setInt8(byteOffset: number, value: number): void;

    /**
     * Stores an Int16 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     * @param littleEndian If false or undefined, a big-endian value should be written.
     */
    setInt16(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
     * Stores an Int32 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     * @param littleEndian If false or undefined, a big-endian value should be written.
     */
    setInt32(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
     * Stores an Uint8 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     */
    setUint8(byteOffset: number, value: number): void;

    /**
     * Stores an Uint16 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     * @param littleEndian If false or undefined, a big-endian value should be written.
     */
    setUint16(byteOffset: number, value: number, littleEndian?: boolean): void;

    /**
     * Stores an Uint32 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     * @param littleEndian If false or undefined, a big-endian value should be written.
     */
    setUint32(byteOffset: number, value: number, littleEndian?: boolean): void;
}

interface DataViewConstructor {
    readonly prototype: DataView;
    new(buffer: ArrayBufferLike, byteOffset?: number, byteLength?: number): DataView;
}
declare var DataView: DataViewConstructor;
