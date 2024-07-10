interface Array<T> {
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for searchElement.
     */
    includes(searchElement: T, fromIndex?: number): boolean;
}

interface ReadonlyArray<T> {
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for searchElement.
     */
    includes(searchElement: T, fromIndex?: number): boolean;
}

interface TypedArray<T extends number | bigint, A extends TypedArray<T, A>> {
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for searchElement.
     */
    includes(searchElement: T, fromIndex?: number): boolean;
}

interface Int8Array extends TypedArray<number, Int8Array> {}

interface Uint8Array extends TypedArray<number, Uint8Array> {}

interface Uint8ClampedArray extends TypedArray<number, Uint8ClampedArray> {}

interface Int16Array extends TypedArray<number, Int16Array> {}

interface Uint16Array extends TypedArray<number, Uint16Array> {}

interface Int32Array extends TypedArray<number, Int32Array> {}

interface Uint32Array extends TypedArray<number, Uint32Array> {}

interface Float32Array extends TypedArray<number, Float32Array> {}

interface Float64Array extends TypedArray<number, Float64Array> {}
