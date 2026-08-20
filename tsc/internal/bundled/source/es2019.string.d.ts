interface String {
    /** Removes the trailing white space and line terminator characters from a string. */
    trimEnd(): string;

    /** Removes the leading white space and line terminator characters from a string. */
    trimStart(): string;

    /**
     * Removes the leading white space and line terminator characters from a string.
     * @deprecated A legacy feature for browser compatibility. Use `trimStart` instead
     */
    trimLeft(): string;

    /**
     * Removes the trailing white space and line terminator characters from a string.
     * @deprecated A legacy feature for browser compatibility. Use `trimEnd` instead
     */
    trimRight(): string;
}
