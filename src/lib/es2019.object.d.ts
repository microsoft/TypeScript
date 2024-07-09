/// <reference lib="es2015.iterable" />

interface ObjectConstructor {
    /**
     * Returns an object created by key-value entries for properties and methods
     * @param entries An iterable object that contains key-value entries for properties and methods.
     */
    fromEntries<T = any>(entries: Iterable<readonly [PropertyKey, T]>): { [k: string]: T; };

    /**
     * Returns an object created by key-value entries for properties and methods
     * @param entries An iterable object that contains key-value entries for properties and methods.
     */
    fromEntries(entries: Iterable<readonly any[]>): any;
}
