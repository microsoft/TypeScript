/// <reference lib="es2021.string" />

interface String {
    /**
     * Access string by relative indexing.
     * @param index index to access.
     */
     at(index: number): string | undefined;
}
