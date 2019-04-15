/// <reference lib="es2015.iterable" />

interface ObjectConstructor {
    fromEntries(entries: Iterable<[string | symbol, any]>): any;
}
