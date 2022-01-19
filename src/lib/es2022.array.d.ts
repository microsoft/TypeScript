interface Array<T> {
    /**
     * Returns the item located at the specified index.
     * @param index The zero-based index of the desired item. A negative index will count back from the last item.
     */
    at(index: number): T | undefined;
}

interface ReadonlyArray<T> {
    /**
     * Returns the item located at the specified index.
     * @param index The zero-based index of the desired item. A negative index will count back from the last item.
     */
    at(index: number): T | undefined;
}

interface TypedArray<V extends bigint | number> {
    /**
     * Returns the item located at the specified index.
     * @param index The zero-based index of the desired item. A negative index will count back from the last item.
     */
    at(index: number): V | undefined;
}
