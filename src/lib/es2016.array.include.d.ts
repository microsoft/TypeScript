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

interface TypedArray<T extends number | bigint> {
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for searchElement.
     */
    includes(searchElement: T, fromIndex?: number): boolean;
}

interface Int8Array extends TypedArray<number> {}

interface Uint8Array extends TypedArray<number> {}

interface Uint8ClampedArray extends TypedArray<number> {}

interface Int16Array extends TypedArray<number> {}

interface Uint16Array extends TypedArray<number> {}

interface Int32Array extends TypedArray<number> {}

interface Uint32Array extends TypedArray<number> {}

interface Float32Array extends TypedArray<number> {}

interface Float64Array extends TypedArray<number> {}
