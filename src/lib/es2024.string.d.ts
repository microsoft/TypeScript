interface String {
    /**
     * Returns true if all leading surrogates and trailing surrogates appear paired and in order.
     */
    isWellFormed(): boolean;

    /**
     * Returns a string where all lone or out-of-order surrogates have been replaced by the Unicode replacement character (U+FFFD).
     */
    toWellFormed(): string;
}
