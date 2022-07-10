/// <reference lib="es2009.array" />

interface RegExp {
    /**
     * Executes a search on a string using a regular expression pattern, and returns an array containing the results of that search.
     * @param string The String object or string literal on which to perform the search.
     */
    exec(string: string): RegExpExecArray | null;

    /**
     * Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
     * @param string String on which to perform the search.
     */
    test(string: string): boolean;

    /** Returns a copy of the text of the regular expression pattern. Read-only. The regExp argument is a Regular expression object. It can be a variable name or a literal. */
    readonly source: string;

    /** Returns a Boolean value indicating the state of the global flag (g) used with a regular expression. Default is false. Read-only. */
    readonly global: boolean;

    /** Returns a Boolean value indicating the state of the ignoreCase flag (i) used with a regular expression. Default is false. Read-only. */
    readonly ignoreCase: boolean;

    /** Returns a Boolean value indicating the state of the multiline flag (m) used with a regular expression. Default is false. Read-only. */
    readonly multiline: boolean;

    lastIndex: number;

    // Non-standard extensions
    /** @deprecated A legacy feature for browser compatibility */
    compile(pattern: string, flags?: string): this;
}

interface RegExpConstructor {
    new(pattern: RegExp | string): RegExp;
    new(pattern: string, flags?: string): RegExp;
    (pattern: RegExp | string): RegExp;
    (pattern: string, flags?: string): RegExp;
    readonly prototype: RegExp;

    // Non-standard extensions
    /** @deprecated A legacy feature for browser compatibility */
    $1: string;
    /** @deprecated A legacy feature for browser compatibility */
    $2: string;
    /** @deprecated A legacy feature for browser compatibility */
    $3: string;
    /** @deprecated A legacy feature for browser compatibility */
    $4: string;
    /** @deprecated A legacy feature for browser compatibility */
    $5: string;
    /** @deprecated A legacy feature for browser compatibility */
    $6: string;
    /** @deprecated A legacy feature for browser compatibility */
    $7: string;
    /** @deprecated A legacy feature for browser compatibility */
    $8: string;
    /** @deprecated A legacy feature for browser compatibility */
    $9: string;
    /** @deprecated A legacy feature for browser compatibility */
    input: string;
    /** @deprecated A legacy feature for browser compatibility */
    $_: string;
    /** @deprecated A legacy feature for browser compatibility */
    lastMatch: string;
    /** @deprecated A legacy feature for browser compatibility */
    "$&": string;
    /** @deprecated A legacy feature for browser compatibility */
    lastParen: string;
    /** @deprecated A legacy feature for browser compatibility */
    "$+": string;
    /** @deprecated A legacy feature for browser compatibility */
    leftContext: string;
    /** @deprecated A legacy feature for browser compatibility */
    "$`": string;
    /** @deprecated A legacy feature for browser compatibility */
    rightContext: string;
    /** @deprecated A legacy feature for browser compatibility */
    "$'": string;
}

declare var RegExp: RegExpConstructor;


interface RegExpMatchArray extends Array<string> {
    /**
     * The index of the search at which the result was found.
     */
    index?: number;
    /**
     * A copy of the search string.
     */
    input?: string;
}

interface RegExpExecArray extends Array<string> {
    /**
     * The index of the search at which the result was found.
     */
    index: number;
    /**
     * A copy of the search string.
     */
    input: string;
}
