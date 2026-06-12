interface Math {
    /**
     * Returns the exact sum of a stream of numbers, avoiding floating-point rounding errors.
     * @param items An iterable of numbers.
     */
    sumPrecise(items: Iterable<number>): number;
}