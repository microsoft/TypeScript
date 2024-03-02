interface Array<T> {
    /**
     * Returns a string representation of an array.
     * Each element is converted to a string using its `toLocaleString` method, then concatenated using the list separator of the current locale.
     * @param locales Passed as the `locales` parameter to each array element's `toLocaleString` method.
     * @param options Passed as the `options` parameter to each array element's `toLocaleString` method.
     */
    toLocaleString(locales?: string | string[], options?: object): string;
}
