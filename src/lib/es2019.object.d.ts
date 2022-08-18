/// <reference lib="es2015.iterable" />

interface ObjectConstructor {
    /**
     * Returns an object created by key-value entries for properties and methods
     * @param entries An iterable object that contains key-value entries for properties and methods.
     */
    fromEntries<KeyValue extends readonly [PropertyKey, any]>(
      entries: Iterable<KeyValue>,
    ): [KeyValue] extends [[PropertyKey, any]]
      ? { [k: string]: KeyValue[1] }
      : { [K in KeyValue[0]]: KeyValue extends readonly [K, infer V] ? V : never };

    /**
     * Returns an object created by key-value entries for properties and methods
     * @param entries An iterable object that contains key-value entries for properties and methods.
     */
    fromEntries(entries: Iterable<readonly any[]>): any;
}
