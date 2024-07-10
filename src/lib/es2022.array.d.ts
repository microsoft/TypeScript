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

interface TypedArray<T extends number | bigint, A extends TypedArray<T, A>> {
    /**
     * Returns the item located at the specified index.
     * @param index The zero-based index of the desired code unit. A negative index will count back from the last item.
     */
    at(index: number): T | undefined;
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

interface BigInt64Array extends TypedArray<bigint, BigInt64Array> {}

interface BigUint64Array extends TypedArray<bigint, BigUint64Array> {}
