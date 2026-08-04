/// <reference lib="es2015.iterable" />

interface Math {
    /**
     * Returns the sum of the values in the iterable using a more precise
     * summation algorithm than naive floating-point addition.
     * Returns `-0` if the iterable is empty.
     * @param numbers An iterable (such as an Array) of numbers.
     * @throws {TypeError} If `numbers` is not iterable, or if any value in the iterable is not of type `number`.
     * @throws {RangeError} If the iterable yields 2^53 or more values.
     * @see https://tc39.es/proposal-math-sum/
     */
    sumPrecise(numbers: Iterable<number>): number;
}
