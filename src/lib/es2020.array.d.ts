interface Array<T> {
    /**
     * Returns a string representation of an array.
     * Each element is converted to a string using its `toLocaleString` method, then concatenated using the list separator of the current locale.
     * @param locales Passed as the `locales` parameter to each array element's `toLocaleString` method.
     * @param options Passed as the `options` parameter to each array element's `toLocaleString` method.
     */
    toLocaleString(
        locales?: Intl.LocalesArgument,
        options?: (T extends { toLocaleString(locales?: any, options?: infer O): string; } ? (options: O) => void : never) extends (options: infer P) => void ? P : unknown,
    ): string;
}

interface ReadonlyArray<T> {
    /**
     * Returns a string representation of an array.
     * Each element is converted to a string using its `toLocaleString` method, then concatenated using the list separator of the current locale.
     * @param locales Passed as the `locales` parameter to each array element's `toLocaleString` method.
     * @param options Passed as the `options` parameter to each array element's `toLocaleString` method.
     */
    toLocaleString(
        locales?: Intl.LocalesArgument,
        options?: (T extends { toLocaleString(locales?: any, options?: infer O): string; } ? (options: O) => void : never) extends (options: infer P) => void ? P : unknown,
    ): string;
}

interface Int8Array {
    /**
     * Returns a string representation of a TypedArray.
     * Each element is converted to a string using its `toLocaleString` method, then concatenated using the list separator of the current locale.
     * @param locales The preferred locale, or list of preferred locales, to use for the comparison. If omitted, the default locale is used.
     * @param options Corresponds to the `options` parameter of the `Intl.NumberFormat` constructor.
     */
    toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): string;
}

interface Uint8Array {
    /**
     * Returns a string representation of a TypedArray.
     * Each element is converted to a string using its `toLocaleString` method, then concatenated using the list separator of the current locale.
     * @param locales The preferred locale, or list of preferred locales, to use for the comparison. If omitted, the default locale is used.
     * @param options Corresponds to the `options` parameter of the `Intl.NumberFormat` constructor.
     */
    toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): string;
}

interface Uint8ClampedArray {
    /**
     * Returns a string representation of a TypedArray.
     * Each element is converted to a string using its `toLocaleString` method, then concatenated using the list separator of the current locale.
     * @param locales The preferred locale, or list of preferred locales, to use for the comparison. If omitted, the default locale is used.
     * @param options Corresponds to the `options` parameter of the `Intl.NumberFormat` constructor.
     */
    toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): string;
}

interface Int16Array {
    /**
     * Returns a string representation of a TypedArray.
     * Each element is converted to a string using its `toLocaleString` method, then concatenated using the list separator of the current locale.
     * @param locales The preferred locale, or list of preferred locales, to use for the comparison. If omitted, the default locale is used.
     * @param options Corresponds to the `options` parameter of the `Intl.NumberFormat` constructor.
     */
    toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): string;
}

interface Uint16Array {
    /**
     * Returns a string representation of a TypedArray.
     * Each element is converted to a string using its `toLocaleString` method, then concatenated using the list separator of the current locale.
     * @param locales The preferred locale, or list of preferred locales, to use for the comparison. If omitted, the default locale is used.
     * @param options Corresponds to the `options` parameter of the `Intl.NumberFormat` constructor.
     */
    toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): string;
}

interface Int32Array {
    /**
     * Returns a string representation of a TypedArray.
     * Each element is converted to a string using its `toLocaleString` method, then concatenated using the list separator of the current locale.
     * @param locales The preferred locale, or list of preferred locales, to use for the comparison. If omitted, the default locale is used.
     * @param options Corresponds to the `options` parameter of the `Intl.NumberFormat` constructor.
     */
    toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): string;
}

interface Uint32Array {
    /**
     * Returns a string representation of a TypedArray.
     * Each element is converted to a string using its `toLocaleString` method, then concatenated using the list separator of the current locale.
     * @param locales The preferred locale, or list of preferred locales, to use for the comparison. If omitted, the default locale is used.
     * @param options Corresponds to the `options` parameter of the `Intl.NumberFormat` constructor.
     */
    toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): string;
}

interface Float32Array {
    /**
     * Returns a string representation of a TypedArray.
     * Each element is converted to a string using its `toLocaleString` method, then concatenated using the list separator of the current locale.
     * @param locales The preferred locale, or list of preferred locales, to use for the comparison. If omitted, the default locale is used.
     * @param options Corresponds to the `options` parameter of the `Intl.NumberFormat` constructor.
     */
    toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): string;
}

interface Float64Array {
    /**
     * Returns a string representation of a TypedArray.
     * Each element is converted to a string using its `toLocaleString` method, then concatenated using the list separator of the current locale.
     * @param locales The preferred locale, or list of preferred locales, to use for the comparison. If omitted, the default locale is used.
     * @param options Corresponds to the `options` parameter of the `Intl.NumberFormat` constructor.
     */
    toLocaleString(locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions): string;
}
