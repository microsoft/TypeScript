interface String {
    /**
     * Returns true if the string does not contain any lone UTF-16 surrogates.
     */
    isWellFormed(): boolean;

    /**
     * Returns a string where all lone UTF-16 surrogates of this string have been replaced by the Unicode replacement character (U+FFFD).
     */
    toWellFormed(): string;
}
