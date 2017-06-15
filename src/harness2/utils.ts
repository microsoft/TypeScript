import * as vpath from "./vpath";

declare var window: any;

export const enum ExecutionEnvironment {
    Node,
    Browser,
}

export function getExecutionEnvironment() {
    if (typeof window !== "undefined") {
        return ExecutionEnvironment.Browser;
    }
    else {
        return ExecutionEnvironment.Node;
    }
}

let executionDirectory: string | undefined;
export function getExecutionDirectory() {
    return executionDirectory || (executionDirectory = vpath.resolve(__dirname, "../../"));
}

export function getBuiltDirectory() {
    return vpath.combine(getExecutionDirectory(), "built/local");
}

export function getLibFilesDirectory() {
    return vpath.combine(getExecutionDirectory(), "tests/lib");
}

//
// String Utilities
//

export function toUtf8(text: string): string {
    return new Buffer(text).toString("utf8");
}

export function compareValues<T>(a: T, b: T) {
    if (a === b) return 0;
    if (a === undefined || a === null) return -1; // tslint:disable-line:no-null-keyword
    if (b === undefined || b === null) return +1; // tslint:disable-line:no-null-keyword
    return a < b ? -1 : a > b ? +1 : 0;
}

const caseInsensitiveComparisonCollator = typeof Intl === "object" ? new Intl.Collator(/*locales*/ undefined, { usage: "sort", sensitivity: "accent" }) : undefined;
const caseSensitiveComparisonCollator = typeof Intl === "object" ? new Intl.Collator(/*locales*/ undefined, { usage: "sort", sensitivity: "variant" }) : undefined;

export function compareStrings(a: string | undefined, b: string | undefined, ignoreCase?: boolean) {
    if (a === b) return 0;
    if (a === undefined) return -1;
    if (b === undefined) return +1;
    const collator = ignoreCase ? caseInsensitiveComparisonCollator : caseSensitiveComparisonCollator;
    if (collator) {
        return collator.compare(a, b);
    }
    else if (ignoreCase) {
        a = a.toUpperCase();
        b = b.toUpperCase();
    }
    return a < b ? -1 : a > b ? +1 : 0;
}

export namespace compareStrings {
    export function caseSensitive(a: string | undefined, b: string | undefined) {
        return compareStrings(a, b, /*ignoreCase*/ false);
    }
    export function caseInsensitive(a: string | undefined, b: string | undefined) {
        return compareStrings(a, b, /*ignoreCase*/ true);
    }
}

export function padLeft(text: string, size: number, ch = " ") {
    while (text.length < size) text = ch + text;
    return text;
}

export function padRight(text: string, size: number, ch = " ") {
    while (text.length < size) text += ch;
    return text;
}

export function repeatString(text: string, count: number) {
    let result = "";
    for (let i = 0; i < count; i++) {
        result += text;
    }
    return result;
}

function splitLinesWorker(text: string, lines: string[] | undefined, removeEmptyElementsOrLineStarts: boolean | number[] | undefined) {
    const lineStarts = typeof removeEmptyElementsOrLineStarts !== "boolean" ? removeEmptyElementsOrLineStarts : undefined;
    const removeEmptyElements = typeof removeEmptyElementsOrLineStarts === "boolean" ? removeEmptyElementsOrLineStarts : undefined;
    let pos = 0;
    let end = 0;
    let lineStart = 0;
    let nonWhiteSpace = false; 
    while (pos < text.length) {
        const ch = text.charCodeAt(pos);
        end = pos;
        pos++;
        switch (ch) {
            // LineTerminator
            case 0x000d: // <CR> carriage return
                if (pos < text.length && text.charCodeAt(pos) === 0x000a) pos++;
                // falls through
            case 0x000a: // <LF> line feed
            case 0x2028: // <LS> line separator
            case 0x2029: // <PS> paragraph separator
                if (lineStarts) {
                    lineStarts.push(lineStart);
                }
                if (lines && (!removeEmptyElements || nonWhiteSpace)) {
                    lines.push(text.slice(lineStart, end));
                }
                lineStart = pos;
                nonWhiteSpace = false;
                break;

            // WhiteSpace
            case 0x0009: // <TAB> tab
            case 0x000b: // <VT> vertical tab
            case 0x000c: // <FF> form feed
            case 0x0020: // <SP> space
            case 0x00a0: // <NBSP> no-break space
            case 0xfeff: // <ZWNBSP> zero width no-break space
            case 0x1680: // <USP> ogham space mark
            case 0x2000: // <USP> en quad
            case 0x2001: // <USP> em quad
            case 0x2002: // <USP> en space
            case 0x2003: // <USP> em space
            case 0x2004: // <USP> three-per-em space
            case 0x2005: // <USP> four-per-em space
            case 0x2006: // <USP> six-per-em space
            case 0x2007: // <USP> figure space
            case 0x2008: // <USP> punctuation space
            case 0x2009: // <USP> thin space
            case 0x200a: // <USP> hair space
            case 0x202f: // <USP> narrow no-break space
            case 0x205f: // <USP> medium mathematical space
            case 0x3000: // <USP> ideographic space
            case 0x0085: // next-line (not strictly per spec, but used by the compiler)
                break;

            default:
                nonWhiteSpace = true;
                break;
        }
    }
    if (lineStarts) {
        lineStarts.push(lineStart);
    }
    if (lines && (!removeEmptyElements || nonWhiteSpace)) {
        lines.push(text.slice(lineStart, text.length));
    }
}

export function getLinesAndLineStarts(text: string) {
    const lines: string[] = [];
    const lineStarts: number[] = [];
    splitLinesWorker(text, lines, lineStarts);
    return { lines, lineStarts };
}

export function splitLines(text: string, removeEmptyElements?: boolean): string[] {
    const lines: string[] = [];
    splitLinesWorker(text, lines, removeEmptyElements);
    return lines;
}

export function computeLineStarts(text: string): number[] {
    const lineStarts: number[] = [];
    splitLinesWorker(text, /*lines*/ undefined, lineStarts);
    return lineStarts;
}

const commentRegExp = /(['"])(?:(?!\1).|\\\1)*\1|(\/\*.*?\*\/|\/\/.*?$)/gm;
export function removeComments(text: string) {
    return text.replace(commentRegExp, (match, quote) => {
        return quote ? match : "";
    });
}

const testPathPrefixRegExp = /\/\.(test|ts|lib)\//g;
export function removeTestPathPrefixes(text: string) {
    return text.replace(testPathPrefixRegExp, "");
}

export function stripBOM(text: string) {
    if (text.length >= 2) {
        const ch0 = text.charCodeAt(0);
        const ch1 = text.charCodeAt(1);
        if ((ch0 === 0xff && ch1 === 0xfe) ||
            (ch0 === 0xfe && ch1 === 0xff)) {
            return text.slice(2);
        }
        if (text.length >= 3 && ch0 === 0xef && ch1 === 0xbb && text.charCodeAt(2) === 0xbf) {
            return text.slice(3);
        }
    }
    return text;
}

//
// Function Utilities
//

export function identity<T>(value: T) {
    return value;
}

//
// Array Utilities
//

export function insertAt<T>(array: T[], index: number, value: T) {
    if (index === 0) {
        array.unshift(value);
    }
    else if (index === array.length) {
        array.push(value);
    }
    else {
        for (let i = array.length; i > index; i--) {
            array[i] = array[i - 1];
        }
        array[index] = value;
    }
}

export function removeAt<T>(array: T[], index: number): T | undefined {
    const value = index < array.length ? array[index] : undefined;
    for (let i = index; i < array.length - 1; i++) {
        array[i] = array[i + 1];
    }
    array.length--;
    return value;
}

export function stableSort<T>(array: T[], comparer: (x: T, y: T) => number = compareValues) {
    return array
        .map((_, i) => i) // create array of indices
        .sort((x, y) => comparer(array[x], array[y]) || compareValues(x, y)) // sort indices by value then position
        .map(i => array[i]); // get sorted array
}

export function binarySearch<T>(array: ReadonlyArray<T>, value: T, comparer?: (a: T, b: T) => number, offset?: number): number {
    return keyedBinarySearch(array, value, identity, comparer, offset);
}

export function keyedBinarySearch<T, K>(array: ReadonlyArray<T>, key: K, keySelector: (value: T) => K, keyComparer: (v1: K, v2: K) => number = compareValues, offset?: number): number {
    if (array.length === 0) {
        return -1;
    }

    let low = offset || 0;
    let high = array.length - 1;

    while (low <= high) {
        const middle = low + ((high - low) >> 1);
        const midKey = keySelector(array[middle]);
        if (keyComparer(midKey, key) === 0) {
            return middle;
        }
        else if (keyComparer(midKey, key) > 0) {
            high = middle - 1;
        }
        else {
            low = middle + 1;
        }
    }

    return ~low;
}

//
// RegExp Utilities
//

const reservedCharacterRegExp = /[^\w\s\/]/g;
export function escapeRegExp(pattern: string) {
    return pattern.replace(reservedCharacterRegExp, match => "\\" + match);
}

//
// Path Utilities
//

export function isTypeScriptFile(path: string) {
    return path.endsWith(".ts")
        || path.endsWith(".tsx");
}

export function isJavaScriptFile(path: string) {
    return path.endsWith(".js")
        || path.endsWith(".jsx");
}

export function isDeclarationFile(path: string) {
    return path.endsWith(".d.ts");
}

export function isSourceMapFile(path: string) {
    return path.endsWith(".map");
}

export function isJsonFile(path: string) {
    return path.endsWith(".json");
}

export function isDefaultLibraryFile(path: string) {
    return isDeclarationFile(path)
        && vpath.basename(path).startsWith("lib.");
}

export function isBuiltFile(path: string) {
    return path.includes("built/local/")
        || path.includes("built/harness/");
}