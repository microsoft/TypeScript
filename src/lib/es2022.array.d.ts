interface Array<T> {
    /**
     * Returns the item located at the specified index.
     * @param index The zero-based index of the desired code unit. A negative index will count back from the last item.
     */
    at(index: number): T | undefined;
}

interface ReadonlyArray<T> {
    /**
     * Returns the item located at the specified index.
     * @param index The zero-based index of the desired code unit. A negative index will count back from the last item.
     */
    at(index: number): T | undefined;
}

interface TypedArray<T extends number | bigint> {
    /**
     * Returns the item located at the specified index.
     * @param index The zero-based index of the desired code unit. A negative index will count back from the last item.
     */
    at(index: number): T | undefined;
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

interface BigInt64Array extends TypedArray<bigint> {}

interface BigUint64Array extends TypedArray<bigint> {}
