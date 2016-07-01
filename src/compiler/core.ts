/// <reference path="types.ts"/>

/* @internal */
namespace ts {
    /**
     * Ternary values are defined such that
     * x & y is False if either x or y is False.
     * x & y is Maybe if either x or y is Maybe, but neither x or y is False.
     * x & y is True if both x and y are True.
     * x | y is False if both x and y are False.
     * x | y is Maybe if either x or y is Maybe, but neither x or y is True.
     * x | y is True if either x or y is True.
     */
    export const enum Ternary {
        False = 0,
        Maybe = 1,
        True = -1
    }

    export function createFileMap<T>(keyMapper?: (key: string) => string): FileMap<T> {
        let files: Map<T> = {};
        return {
            get,
            set,
            contains,
            remove,
            forEachValue: forEachValueInMap,
            clear,
        };

        function forEachValueInMap(f: (key: Path, value: T) => void) {
            for (const key in files) {
                f(<Path>key, files[key]);
            }
        }

        // path should already be well-formed so it does not need to be normalized
        function get(path: Path): T {
            return files[toKey(path)];
        }

        function set(path: Path, value: T) {
            files[toKey(path)] = value;
        }

        function contains(path: Path) {
            return hasProperty(files, toKey(path));
        }

        function remove(path: Path) {
            const key = toKey(path);
            delete files[key];
        }

        function clear() {
            files = {};
        }

        function toKey(path: Path): string {
            return keyMapper ? keyMapper(path) : path;
        }
    }

    export function toPath(fileName: string, basePath: string, getCanonicalFileName: (path: string) => string): Path {
        const nonCanonicalizedPath = isRootedDiskPath(fileName)
            ? normalizePath(fileName)
            : getNormalizedAbsolutePath(fileName, basePath);
        return <Path>getCanonicalFileName(nonCanonicalizedPath);
    }

    export const enum Comparison {
        LessThan    = -1,
        EqualTo     = 0,
        GreaterThan = 1
    }

    /**
     * Iterates through 'array' by index and performs the callback on each element of array until the callback
     * returns a truthy value, then returns that value.
     * If no such value is found, the callback is applied to each element of array and undefined is returned.
     */
    export function forEach<T, U>(array: T[], callback: (element: T, index: number) => U): U {
        if (array) {
            for (let i = 0, len = array.length; i < len; i++) {
                const result = callback(array[i], i);
                if (result) {
                    return result;
                }
            }
        }
        return undefined;
    }

    export function contains<T>(array: T[], value: T, areEqual?: (a: T, b: T) => boolean): boolean {
        if (array) {
            for (const v of array) {
                if (areEqual ? areEqual(v, value) : v === value) {
                    return true;
                }
            }
        }
        return false;
    }

    export function indexOf<T>(array: T[], value: T): number {
        if (array) {
            for (let i = 0, len = array.length; i < len; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
        }
        return -1;
    }

    export function indexOfAnyCharCode(text: string, charCodes: number[], start?: number): number {
        for (let i = start || 0, len = text.length; i < len; i++) {
            if (contains(charCodes, text.charCodeAt(i))) {
                return i;
            }
        }
        return -1;
    }

    export function countWhere<T>(array: T[], predicate: (x: T) => boolean): number {
        let count = 0;
        if (array) {
            for (const v of array) {
                if (predicate(v)) {
                    count++;
                }
            }
        }
        return count;
    }

    export function filter<T>(array: T[], f: (x: T) => boolean): T[] {
        let result: T[];
        if (array) {
            result = [];
            for (const item of array) {
                if (f(item)) {
                    result.push(item);
                }
            }
        }
        return result;
    }

    export function filterMutate<T>(array: T[], f: (x: T) => boolean): void {
        let outIndex = 0;
        for (const item of array) {
            if (f(item)) {
                array[outIndex] = item;
                outIndex++;
            }
        }
        array.length = outIndex;
    }

    export function map<T, U>(array: T[], f: (x: T) => U): U[] {
        let result: U[];
        if (array) {
            result = [];
            for (const v of array) {
                result.push(f(v));
            }
        }
        return result;
    }

    export function concatenate<T>(array1: T[], array2: T[]): T[] {
        if (!array2 || !array2.length) return array1;
        if (!array1 || !array1.length) return array2;

        return array1.concat(array2);
    }

    export function deduplicate<T>(array: T[], areEqual?: (a: T, b: T) => boolean): T[] {
        let result: T[];
        if (array) {
            result = [];
            for (const item of array) {
                if (!contains(result, item, areEqual)) {
                    result.push(item);
                }
            }
        }
        return result;
    }

    export function sum(array: any[], prop: string): number {
        let result = 0;
        for (const v of array) {
            result += v[prop];
        }
        return result;
    }

    export function addRange<T>(to: T[], from: T[]): void {
        if (to && from) {
            for (const v of from) {
                to.push(v);
            }
        }
    }

    export function rangeEquals<T>(array1: T[], array2: T[], pos: number, end: number) {
        while (pos < end) {
            if (array1[pos] !== array2[pos]) {
                return false;
            }
            pos++;
        }
        return true;
    }

    /**
     * Returns the last element of an array if non-empty, undefined otherwise.
     */
    export function lastOrUndefined<T>(array: T[]): T {
        if (array.length === 0) {
            return undefined;
        }

        return array[array.length - 1];
    }

    /**
     * Performs a binary search, finding the index at which 'value' occurs in 'array'.
     * If no such index is found, returns the 2's-complement of first index at which
     * number[index] exceeds number.
     * @param array A sorted array whose first element must be no larger than number
     * @param number The value to be searched for in the array.
     */
    export function binarySearch(array: number[], value: number): number {
        let low = 0;
        let high = array.length - 1;

        while (low <= high) {
            const middle = low + ((high - low) >> 1);
            const midValue = array[middle];

            if (midValue === value) {
                return middle;
            }
            else if (midValue > value) {
                high = middle - 1;
            }
            else {
                low = middle + 1;
            }
        }

        return ~low;
    }

    export function reduceLeft<T>(array: T[], f: (a: T, x: T) => T): T;
    export function reduceLeft<T, U>(array: T[], f: (a: U, x: T) => U, initial: U): U;
    export function reduceLeft<T, U>(array: T[], f: (a: U, x: T) => U, initial?: U): U {
        if (array) {
            const count = array.length;
            if (count > 0) {
                let pos = 0;
                let result: T | U;
                if (arguments.length <= 2) {
                    result = array[pos];
                    pos++;
                }
                else {
                    result = initial;
                }
                while (pos < count) {
                    result = f(<U>result, array[pos]);
                    pos++;
                }
                return <U>result;
            }
        }
        return initial;
    }

    export function reduceRight<T>(array: T[], f: (a: T, x: T) => T): T;
    export function reduceRight<T, U>(array: T[], f: (a: U, x: T) => U, initial: U): U;
    export function reduceRight<T, U>(array: T[], f: (a: U, x: T) => U, initial?: U): U {
        if (array) {
            let pos = array.length - 1;
            if (pos >= 0) {
                let result: T | U;
                if (arguments.length <= 2) {
                    result = array[pos];
                    pos--;
                }
                else {
                    result = initial;
                }
                while (pos >= 0) {
                    result = f(<U>result, array[pos]);
                    pos--;
                }
                return <U>result;
            }
        }
        return initial;
    }

    const hasOwnProperty = Object.prototype.hasOwnProperty;

    export function hasProperty<T>(map: Map<T>, key: string): boolean {
        return hasOwnProperty.call(map, key);
    }

    export function getKeys<T>(map: Map<T>): string[] {
        const keys: string[] = [];
        for (const key in map) {
            keys.push(key);
        }
        return keys;
    }

    export function getProperty<T>(map: Map<T>, key: string): T {
        return hasOwnProperty.call(map, key) ? map[key] : undefined;
    }

    export function isEmpty<T>(map: Map<T>) {
        for (const id in map) {
            if (hasProperty(map, id)) {
                return false;
            }
        }
        return true;
    }

    export function clone<T>(object: T): T {
        const result: any = {};
        for (const id in object) {
            result[id] = (<any>object)[id];
        }
        return <T>result;
    }

    export function extend<T1 extends Map<{}>, T2 extends Map<{}>>(first: T1 , second: T2): T1 & T2 {
        const result: T1 & T2 = <any>{};
        for (const id in first) {
            (result as any)[id] = first[id];
        }
        for (const id in second) {
            if (!hasProperty(result, id)) {
                (result as any)[id] = second[id];
            }
        }
        return result;
    }

    export function forEachValue<T, U>(map: Map<T>, callback: (value: T) => U): U {
        let result: U;
        for (const id in map) {
            if (result = callback(map[id])) break;
        }
        return result;
    }

    export function forEachKey<T, U>(map: Map<T>, callback: (key: string) => U): U {
        let result: U;
        for (const id in map) {
            if (result = callback(id)) break;
        }
        return result;
    }

    export function lookUp<T>(map: Map<T>, key: string): T {
        return hasProperty(map, key) ? map[key] : undefined;
    }

    export function copyMap<T>(source: Map<T>, target: Map<T>): void {
        for (const p in source) {
            target[p] = source[p];
        }
    }

    /**
     * Creates a map from the elements of an array.
     *
     * @param array the array of input elements.
     * @param makeKey a function that produces a key for a given element.
     *
     * This function makes no effort to avoid collisions; if any two elements produce
     * the same key with the given 'makeKey' function, then the element with the higher
     * index in the array will be the one associated with the produced key.
     */
    export function arrayToMap<T>(array: T[], makeKey: (value: T) => string): Map<T> {
        const result: Map<T> = {};

        forEach(array, value => {
            result[makeKey(value)] = value;
        });

        return result;
    }

    /**
     * Reduce the properties of a map.
     *
     * @param map The map to reduce
     * @param callback An aggregation function that is called for each entry in the map
     * @param initial The initial value for the reduction.
     */
    export function reduceProperties<T, U>(map: Map<T>, callback: (aggregate: U, value: T, key: string) => U, initial: U): U {
        let result = initial;
        if (map) {
            for (const key in map) {
                if (hasProperty(map, key)) {
                    result = callback(result, map[key], String(key));
                }
            }
        }

        return result;
    }

    /**
     * Tests whether a value is an array.
     */
    export function isArray(value: any): value is any[] {
        return Array.isArray ? Array.isArray(value) : value instanceof Array;
    }

    export function memoize<T>(callback: () => T): () => T {
        let value: T;
        return () => {
            if (callback) {
                value = callback();
                callback = undefined;
            }
            return value;
        };
    }

    function formatStringFromArgs(text: string, args: { [index: number]: any; }, baseIndex?: number): string {
        baseIndex = baseIndex || 0;

        return text.replace(/{(\d+)}/g, (match, index?) => args[+index + baseIndex]);
    }

    export let localizedDiagnosticMessages: Map<string> = undefined;

    export function getLocaleSpecificMessage(message: DiagnosticMessage) {
        return localizedDiagnosticMessages && localizedDiagnosticMessages[message.key]
            ? localizedDiagnosticMessages[message.key]
            : message.message;
    }

    export function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage, ...args: any[]): Diagnostic;
    export function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage): Diagnostic {
        const end = start + length;

        Debug.assert(start >= 0, "start must be non-negative, is " + start);
        Debug.assert(length >= 0, "length must be non-negative, is " + length);

        if (file) {
            Debug.assert(start <= file.text.length, `start must be within the bounds of the file. ${ start } > ${ file.text.length }`);
            Debug.assert(end <= file.text.length, `end must be the bounds of the file. ${ end } > ${ file.text.length }`);
        }

        let text = getLocaleSpecificMessage(message);

        if (arguments.length > 4) {
            text = formatStringFromArgs(text, arguments, 4);
        }

        return {
            file,
            start,
            length,

            messageText: text,
            category: message.category,
            code: message.code,
        };
    }

    /* internal */
    export function formatMessage(dummy: any, message: DiagnosticMessage): string {
        let text = getLocaleSpecificMessage(message);

        if (arguments.length > 2) {
            text = formatStringFromArgs(text, arguments, 2);
        }

        return text;
    }

    export function createCompilerDiagnostic(message: DiagnosticMessage, ...args: any[]): Diagnostic;
    export function createCompilerDiagnostic(message: DiagnosticMessage): Diagnostic {
        let text = getLocaleSpecificMessage(message);

        if (arguments.length > 1) {
            text = formatStringFromArgs(text, arguments, 1);
        }

        return {
            file: undefined,
            start: undefined,
            length: undefined,

            messageText: text,
            category: message.category,
            code: message.code
        };
    }

    export function chainDiagnosticMessages(details: DiagnosticMessageChain, message: DiagnosticMessage, ...args: any[]): DiagnosticMessageChain;
    export function chainDiagnosticMessages(details: DiagnosticMessageChain, message: DiagnosticMessage): DiagnosticMessageChain {
        let text = getLocaleSpecificMessage(message);

        if (arguments.length > 2) {
            text = formatStringFromArgs(text, arguments, 2);
        }

        return {
            messageText: text,
            category: message.category,
            code: message.code,

            next: details
        };
    }

    export function concatenateDiagnosticMessageChains(headChain: DiagnosticMessageChain, tailChain: DiagnosticMessageChain): DiagnosticMessageChain {
        let lastChain = headChain;
        while (lastChain.next) {
            lastChain = lastChain.next;
        }

        lastChain.next = tailChain;
        return headChain;
    }

    export function compareValues<T>(a: T, b: T): Comparison {
        if (a === b) return Comparison.EqualTo;
        if (a === undefined) return Comparison.LessThan;
        if (b === undefined) return Comparison.GreaterThan;
        return a < b ? Comparison.LessThan : Comparison.GreaterThan;
    }

    export function compareStrings(a: string, b: string, ignoreCase?: boolean): Comparison {
        if (a === b) return Comparison.EqualTo;
        if (a === undefined) return Comparison.LessThan;
        if (b === undefined) return Comparison.GreaterThan;
        if (ignoreCase) {
            if (String.prototype.localeCompare) {
                const result = a.localeCompare(b, /*locales*/ undefined, { usage: "sort", sensitivity: "accent" });
                return result < 0 ? Comparison.LessThan : result > 0 ? Comparison.GreaterThan : Comparison.EqualTo;
            }

            a = a.toUpperCase();
            b = b.toUpperCase();
            if (a === b) return Comparison.EqualTo;
        }

        return a < b ? Comparison.LessThan : Comparison.GreaterThan;
    }

    export function compareStringsCaseInsensitive(a: string, b: string) {
        return compareStrings(a, b, /*ignoreCase*/ true);
    }

    function getDiagnosticFileName(diagnostic: Diagnostic): string {
        return diagnostic.file ? diagnostic.file.fileName : undefined;
    }

    export function compareDiagnostics(d1: Diagnostic, d2: Diagnostic): Comparison {
        return compareValues(getDiagnosticFileName(d1), getDiagnosticFileName(d2)) ||
            compareValues(d1.start, d2.start) ||
            compareValues(d1.length, d2.length) ||
            compareValues(d1.code, d2.code) ||
            compareMessageText(d1.messageText, d2.messageText) ||
            Comparison.EqualTo;
    }

    function compareMessageText(text1: string | DiagnosticMessageChain, text2: string | DiagnosticMessageChain): Comparison {
        while (text1 && text2) {
            // We still have both chains.
            const string1 = typeof text1 === "string" ? text1 : text1.messageText;
            const string2 = typeof text2 === "string" ? text2 : text2.messageText;

            const res = compareValues(string1, string2);
            if (res) {
                return res;
            }

            text1 = typeof text1 === "string" ? undefined : text1.next;
            text2 = typeof text2 === "string" ? undefined : text2.next;
        }

        if (!text1 && !text2) {
            // if the chains are done, then these messages are the same.
            return Comparison.EqualTo;
        }

        // We still have one chain remaining.  The shorter chain should come first.
        return text1 ? Comparison.GreaterThan : Comparison.LessThan;
    }

    export function sortAndDeduplicateDiagnostics(diagnostics: Diagnostic[]): Diagnostic[] {
        return deduplicateSortedDiagnostics(diagnostics.sort(compareDiagnostics));
    }

    export function deduplicateSortedDiagnostics(diagnostics: Diagnostic[]): Diagnostic[] {
        if (diagnostics.length < 2) {
            return diagnostics;
        }

        const newDiagnostics = [diagnostics[0]];
        let previousDiagnostic = diagnostics[0];
        for (let i = 1; i < diagnostics.length; i++) {
            const currentDiagnostic = diagnostics[i];
            const isDupe = compareDiagnostics(currentDiagnostic, previousDiagnostic) === Comparison.EqualTo;
            if (!isDupe) {
                newDiagnostics.push(currentDiagnostic);
                previousDiagnostic = currentDiagnostic;
            }
        }

        return newDiagnostics;
    }

    export function normalizeSlashes(path: string): string {
        return path.replace(/\\/g, "/");
    }

    // Returns length of path root (i.e. length of "/", "x:/", "//server/share/, file:///user/files")
    export function getRootLength(path: string): number {
        if (path.charCodeAt(0) === CharacterCodes.slash) {
            if (path.charCodeAt(1) !== CharacterCodes.slash) return 1;
            const p1 = path.indexOf("/", 2);
            if (p1 < 0) return 2;
            const p2 = path.indexOf("/", p1 + 1);
            if (p2 < 0) return p1 + 1;
            return p2 + 1;
        }
        if (path.charCodeAt(1) === CharacterCodes.colon) {
            if (path.charCodeAt(2) === CharacterCodes.slash) return 3;
            return 2;
        }
        // Per RFC 1738 'file' URI schema has the shape file://<host>/<path>
        // if <host> is omitted then it is assumed that host value is 'localhost',
        // however slash after the omitted <host> is not removed.
        // file:///folder1/file1 - this is a correct URI
        // file://folder2/file2 - this is an incorrect URI
        if (path.lastIndexOf("file:///", 0) === 0) {
            return "file:///".length;
        }
        const idx = path.indexOf("://");
        if (idx !== -1) {
            return idx + "://".length;
        }
        return 0;
    }

    export let directorySeparator = "/";
    function getNormalizedParts(normalizedSlashedPath: string, rootLength: number) {
        const parts = normalizedSlashedPath.substr(rootLength).split(directorySeparator);
        const normalized: string[] = [];
        for (const part of parts) {
            if (part !== ".") {
                if (part === ".." && normalized.length > 0 && lastOrUndefined(normalized) !== "..") {
                    normalized.pop();
                }
                else {
                    // A part may be an empty string (which is 'falsy') if the path had consecutive slashes,
                    // e.g. "path//file.ts".  Drop these before re-joining the parts.
                    if (part) {
                        normalized.push(part);
                    }
                }
            }
        }

        return normalized;
    }

    export function normalizePath(path: string): string {
        path = normalizeSlashes(path);
        const rootLength = getRootLength(path);
        const normalized = getNormalizedParts(path, rootLength);
        return path.substr(0, rootLength) + normalized.join(directorySeparator);
    }

    export function getDirectoryPath(path: Path): Path;
    export function getDirectoryPath(path: string): string;
    export function getDirectoryPath(path: string): any {
        return path.substr(0, Math.max(getRootLength(path), path.lastIndexOf(directorySeparator)));
    }

    export function isUrl(path: string) {
        return path && !isRootedDiskPath(path) && path.indexOf("://") !== -1;
    }

    export function isRootedDiskPath(path: string) {
        return getRootLength(path) !== 0;
    }

    function normalizedPathComponents(path: string, rootLength: number) {
        const normalizedParts = getNormalizedParts(path, rootLength);
        return [path.substr(0, rootLength)].concat(normalizedParts);
    }

    export function getNormalizedPathComponents(path: string, currentDirectory: string) {
        path = normalizeSlashes(path);
        let rootLength = getRootLength(path);
        if (rootLength === 0) {
            // If the path is not rooted it is relative to current directory
            path = combinePaths(normalizeSlashes(currentDirectory), path);
            rootLength = getRootLength(path);
        }

        return normalizedPathComponents(path, rootLength);
    }

    export function getNormalizedAbsolutePath(fileName: string, currentDirectory: string) {
        return getNormalizedPathFromPathComponents(getNormalizedPathComponents(fileName, currentDirectory));
    }

    export function getNormalizedPathFromPathComponents(pathComponents: string[]) {
        if (pathComponents && pathComponents.length) {
            return pathComponents[0] + pathComponents.slice(1).join(directorySeparator);
        }
    }

    function getNormalizedPathComponentsOfUrl(url: string) {
        // Get root length of http://www.website.com/folder1/folder2/
        // In this example the root is:  http://www.website.com/
        // normalized path components should be ["http://www.website.com/", "folder1", "folder2"]

        const urlLength = url.length;
        // Initial root length is http:// part
        let rootLength = url.indexOf("://") + "://".length;
        while (rootLength < urlLength) {
            // Consume all immediate slashes in the protocol
            // eg.initial rootlength is just file:// but it needs to consume another "/" in file:///
            if (url.charCodeAt(rootLength) === CharacterCodes.slash) {
                rootLength++;
            }
            else {
                // non slash character means we continue proceeding to next component of root search
                break;
            }
        }

        // there are no parts after http:// just return current string as the pathComponent
        if (rootLength === urlLength) {
            return [url];
        }

        // Find the index of "/" after website.com so the root can be http://www.website.com/ (from existing http://)
        const indexOfNextSlash = url.indexOf(directorySeparator, rootLength);
        if (indexOfNextSlash !== -1) {
            // Found the "/" after the website.com so the root is length of http://www.website.com/
            // and get components after the root normally like any other folder components
            rootLength = indexOfNextSlash + 1;
            return normalizedPathComponents(url, rootLength);
        }
        else {
            // Can't find the host assume the rest of the string as component
            // but make sure we append "/"  to it as root is not joined using "/"
            // eg. if url passed in was http://website.com we want to use root as [http://website.com/]
            // so that other path manipulations will be correct and it can be merged with relative paths correctly
            return [url + directorySeparator];
        }
    }

    function getNormalizedPathOrUrlComponents(pathOrUrl: string, currentDirectory: string) {
        if (isUrl(pathOrUrl)) {
            return getNormalizedPathComponentsOfUrl(pathOrUrl);
        }
        else {
            return getNormalizedPathComponents(pathOrUrl, currentDirectory);
        }
    }

    export function getRelativePathToDirectoryOrUrl(directoryPathOrUrl: string, relativeOrAbsolutePath: string, currentDirectory: string, getCanonicalFileName: (fileName: string) => string, isAbsolutePathAnUrl: boolean) {
        const pathComponents = getNormalizedPathOrUrlComponents(relativeOrAbsolutePath, currentDirectory);
        const directoryComponents = getNormalizedPathOrUrlComponents(directoryPathOrUrl, currentDirectory);
        if (directoryComponents.length > 1 && lastOrUndefined(directoryComponents) === "") {
            // If the directory path given was of type test/cases/ then we really need components of directory to be only till its name
            // that is  ["test", "cases", ""] needs to be actually ["test", "cases"]
            directoryComponents.length--;
        }

        // Find the component that differs
        let joinStartIndex: number;
        for (joinStartIndex = 0; joinStartIndex < pathComponents.length && joinStartIndex < directoryComponents.length; joinStartIndex++) {
            if (getCanonicalFileName(directoryComponents[joinStartIndex]) !== getCanonicalFileName(pathComponents[joinStartIndex])) {
                break;
            }
        }

        // Get the relative path
        if (joinStartIndex) {
            let relativePath = "";
            const relativePathComponents = pathComponents.slice(joinStartIndex, pathComponents.length);
            for (; joinStartIndex < directoryComponents.length; joinStartIndex++) {
                if (directoryComponents[joinStartIndex] !== "") {
                    relativePath = relativePath + ".." + directorySeparator;
                }
            }

            return relativePath + relativePathComponents.join(directorySeparator);
        }

        // Cant find the relative path, get the absolute path
        let absolutePath = getNormalizedPathFromPathComponents(pathComponents);
        if (isAbsolutePathAnUrl && isRootedDiskPath(absolutePath)) {
            absolutePath = "file:///" + absolutePath;
        }

        return absolutePath;
    }

    export function getBaseFileName(path: string) {
        if (path === undefined) {
            return undefined;
        }
        const i = path.lastIndexOf(directorySeparator);
        return i < 0 ? path : path.substring(i + 1);
    }

    export function combinePaths(path1: string, path2: string) {
        if (!(path1 && path1.length)) return path2;
        if (!(path2 && path2.length)) return path1;
        if (getRootLength(path2) !== 0) return path2;
        if (path1.charAt(path1.length - 1) === directorySeparator) return path1 + path2;
        return path1 + directorySeparator + path2;
    }

    /**
     * Removes a trailing directory separator from a path.
     * @param path The path.
     */
    export function removeTrailingDirectorySeparator(path: string) {
        if (path.charAt(path.length - 1) === directorySeparator) {
            return path.substr(0, path.length - 1);
        }

        return path;
    }

    /**
     * Adds a trailing directory separator to a path, if it does not already have one.
     * @param path The path.
     */
    export function ensureTrailingDirectorySeparator(path: string) {
        if (path.charAt(path.length - 1) !== directorySeparator) {
            return path + directorySeparator;
        }

        return path;
    }

    export function comparePaths(a: string, b: string, currentDirectory: string, ignoreCase?: boolean) {
        if (a === b) return Comparison.EqualTo;
        if (a === undefined) return Comparison.LessThan;
        if (b === undefined) return Comparison.GreaterThan;
        a = removeTrailingDirectorySeparator(a);
        b = removeTrailingDirectorySeparator(b);
        const aComponents = getNormalizedPathComponents(a, currentDirectory);
        const bComponents = getNormalizedPathComponents(b, currentDirectory);
        const sharedLength = Math.min(aComponents.length, bComponents.length);
        for (let i = 0; i < sharedLength; i++) {
            const result = compareStrings(aComponents[i], bComponents[i], ignoreCase);
            if (result !== Comparison.EqualTo) {
                return result;
            }
        }

        return compareValues(aComponents.length, bComponents.length);
    }

    export function containsPath(parent: string, child: string, currentDirectory: string, ignoreCase?: boolean) {
        if (parent === undefined || child === undefined) return false;
        if (parent === child) return true;
        parent = removeTrailingDirectorySeparator(parent);
        child = removeTrailingDirectorySeparator(child);
        if (parent === child) return true;
        const parentComponents = getNormalizedPathComponents(parent, currentDirectory);
        const childComponents = getNormalizedPathComponents(child, currentDirectory);
        if (childComponents.length < parentComponents.length) {
            return false;
        }

        for (let i = 0; i < parentComponents.length; i++) {
            const result = compareStrings(parentComponents[i], childComponents[i], ignoreCase);
            if (result !== Comparison.EqualTo) {
                return false;
            }
        }

        return true;
    }

    export function fileExtensionIs(path: string, extension: string): boolean {
        const pathLen = path.length;
        const extLen = extension.length;
        return pathLen > extLen && path.substr(pathLen - extLen, extLen) === extension;
    }

    export function fileExtensionIsAny(path: string, extensions: string[]): boolean {
        for (const extension of extensions) {
            if (fileExtensionIs(path, extension)) {
                return true;
            }
        }

        return false;
    }


    // Reserved characters, forces escaping of any non-word (or digit), non-whitespace character.
    // It may be inefficient (we could just match (/[-[\]{}()*+?.,\\^$|#\s]/g), but this is future
    // proof.
    const reservedCharacterPattern = /[^\w\s\/]/g;
    const wildcardCharCodes = [CharacterCodes.asterisk, CharacterCodes.question];

    export function getRegularExpressionForWildcard(specs: string[], basePath: string, usage: "files" | "directories" | "exclude") {
        if (specs === undefined || specs.length === 0) {
            return undefined;
        }

        let pattern = "";
        let hasWrittenSubpattern = false;
        spec: for (const spec of specs) {
            if (!spec) {
                continue;
            }

            let subpattern = "";
            let hasRecursiveDirectoryWildcard = false;
            let hasWrittenComponent = false;
            const components = getNormalizedPathComponents(spec, basePath);
            if (usage !== "exclude" && components[components.length - 1] === "**") {
                continue spec;
            }

            // getNormalizedPathComponents includes the separator for the root component.
            // We need to remove to create our regex correctly.
            components[0] = removeTrailingDirectorySeparator(components[0]);

            let optionalCount = 0;
            for (const component of components) {
                if (component === "**") {
                    if (hasRecursiveDirectoryWildcard) {
                        continue spec;
                    }

                    subpattern += "(/.+?)?";
                    hasRecursiveDirectoryWildcard = true;
                    hasWrittenComponent = true;
                }
                else {
                    if (usage === "directories") {
                        subpattern += "(";
                        optionalCount++;
                    }

                    if (hasWrittenComponent) {
                        subpattern += directorySeparator;
                    }

                    subpattern += component.replace(reservedCharacterPattern, replaceWildcardCharacter);
                    hasWrittenComponent = true;
                }
            }

            while (optionalCount > 0) {
                subpattern += ")?";
                optionalCount--;
            }

            if (hasWrittenSubpattern) {
                pattern += "|";
            }

            pattern += "(" + subpattern + ")";
            hasWrittenSubpattern = true;
        }

        if (!pattern) {
            return undefined;
        }

        return "^(" + pattern + (usage === "exclude" ? ")($|/)" : ")$");
    }

    function replaceWildcardCharacter(match: string) {
        return match === "*" ? "[^/]*" : match === "?" ? "[^/]" : "\\" + match;
    }

    export interface FileSystemEntries {
        files: string[];
        directories: string[];
    }

    export interface FileMatcherPatterns {
        includeFilePattern: string;
        includeDirectoryPattern: string;
        excludePattern: string;
        basePaths: string[];
    }

    export function getFileMatcherPatterns(path: string, extensions: string[], excludes: string[], includes: string[], useCaseSensitiveFileNames: boolean, currentDirectory: string): FileMatcherPatterns {
        path = normalizePath(path);
        currentDirectory = normalizePath(currentDirectory);
        const absolutePath = combinePaths(currentDirectory, path);

        return {
            includeFilePattern: getRegularExpressionForWildcard(includes, absolutePath, "files"),
            includeDirectoryPattern: getRegularExpressionForWildcard(includes, absolutePath, "directories"),
            excludePattern: getRegularExpressionForWildcard(excludes, absolutePath, "exclude"),
            basePaths: getBasePaths(path, includes, useCaseSensitiveFileNames)
        };
    }

    export function matchFiles(path: string, extensions: string[], excludes: string[], includes: string[], useCaseSensitiveFileNames: boolean, currentDirectory: string, getFileSystemEntries: (path: string) => FileSystemEntries): string[] {
        path = normalizePath(path);
        currentDirectory = normalizePath(currentDirectory);

        const patterns = getFileMatcherPatterns(path, extensions, excludes, includes, useCaseSensitiveFileNames, currentDirectory);

        const regexFlag = useCaseSensitiveFileNames ? "" : "i";
        const includeFileRegex = patterns.includeFilePattern && new RegExp(patterns.includeFilePattern, regexFlag);
        const includeDirectoryRegex = patterns.includeDirectoryPattern && new RegExp(patterns.includeDirectoryPattern, regexFlag);
        const excludeRegex = patterns.excludePattern && new RegExp(patterns.excludePattern, regexFlag);

        const result: string[] = [];
        for (const basePath of patterns.basePaths) {
            visitDirectory(basePath, combinePaths(currentDirectory, basePath));
        }
        return result;

        function visitDirectory(path: string, absolutePath: string) {
            const { files, directories } = getFileSystemEntries(path);

            for (const current of files) {
                const name = combinePaths(path, current);
                const absoluteName = combinePaths(absolutePath, current);
                if ((!extensions || fileExtensionIsAny(name, extensions)) &&
                    (!includeFileRegex || includeFileRegex.test(absoluteName)) &&
                    (!excludeRegex || !excludeRegex.test(absoluteName))) {
                    result.push(name);
                }
            }

            for (const current of directories) {
                const name = combinePaths(path, current);
                const absoluteName = combinePaths(absolutePath, current);
                if ((!includeDirectoryRegex || includeDirectoryRegex.test(absoluteName)) &&
                    (!excludeRegex || !excludeRegex.test(absoluteName))) {
                    visitDirectory(name, absoluteName);
                }
            }
        }
    }

    /**
     * Computes the unique non-wildcard base paths amongst the provided include patterns.
     */
    function getBasePaths(path: string, includes: string[], useCaseSensitiveFileNames: boolean) {
        // Storage for our results in the form of literal paths (e.g. the paths as written by the user).
        const basePaths: string[] = [path];
        if (includes) {
            // Storage for literal base paths amongst the include patterns.
            const includeBasePaths: string[] = [];
            for (const include of includes) {
                // We also need to check the relative paths by converting them to absolute and normalizing
                // in case they escape the base path (e.g "..\somedirectory")
                const absolute: string = isRootedDiskPath(include) ? include : normalizePath(combinePaths(path, include));

                const wildcardOffset = indexOfAnyCharCode(absolute, wildcardCharCodes);
                const includeBasePath = wildcardOffset < 0
                    ? removeTrailingDirectorySeparator(getDirectoryPath(absolute))
                    : absolute.substring(0, absolute.lastIndexOf(directorySeparator, wildcardOffset));

                // Append the literal and canonical candidate base paths.
                includeBasePaths.push(includeBasePath);
            }

            // Sort the offsets array using either the literal or canonical path representations.
            includeBasePaths.sort(useCaseSensitiveFileNames ? compareStrings : compareStringsCaseInsensitive);

            // Iterate over each include base path and include unique base paths that are not a
            // subpath of an existing base path
            include: for (let i = 0; i < includeBasePaths.length; i++) {
                const includeBasePath = includeBasePaths[i];
                for (let j = 0; j < basePaths.length; j++) {
                    if (containsPath(basePaths[j], includeBasePath, path, !useCaseSensitiveFileNames)) {
                        continue include;
                    }
                }

                basePaths.push(includeBasePath);
            }
        }

        return basePaths;
    }

    export function ensureScriptKind(fileName: string, scriptKind?: ScriptKind): ScriptKind {
        // Using scriptKind as a condition handles both:
        // - 'scriptKind' is unspecified and thus it is `undefined`
        // - 'scriptKind' is set and it is `Unknown` (0)
        // If the 'scriptKind' is 'undefined' or 'Unknown' then we attempt
        // to get the ScriptKind from the file name. If it cannot be resolved
        // from the file name then the default 'TS' script kind is returned.
        return (scriptKind || getScriptKindFromFileName(fileName)) || ScriptKind.TS;
    }

    export function getScriptKindFromFileName(fileName: string): ScriptKind {
        const ext = fileName.substr(fileName.lastIndexOf("."));
        switch (ext.toLowerCase()) {
            case ".js":
                return ScriptKind.JS;
            case ".jsx":
                return ScriptKind.JSX;
            case ".ts":
                return ScriptKind.TS;
            case ".tsx":
                return ScriptKind.TSX;
            default:
                return ScriptKind.Unknown;
        }
    }

    /**
     *  List of supported extensions in order of file resolution precedence.
     */
    export const supportedTypeScriptExtensions = [".ts", ".tsx", ".d.ts"];
    export const supportedJavascriptExtensions = [".js", ".jsx"];
    const allSupportedExtensions  = supportedTypeScriptExtensions.concat(supportedJavascriptExtensions);

    export function getSupportedExtensions(options?: CompilerOptions): string[] {
        return options && options.allowJs ? allSupportedExtensions : supportedTypeScriptExtensions;
    }

    export function isSupportedSourceFileName(fileName: string, compilerOptions?: CompilerOptions) {
        if (!fileName) { return false; }

        for (const extension of getSupportedExtensions(compilerOptions)) {
            if (fileExtensionIs(fileName, extension)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Extension boundaries by priority. Lower numbers indicate higher priorities, and are
     * aligned to the offset of the highest priority extension in the
     * allSupportedExtensions array.
     */
    export const enum ExtensionPriority {
        TypeScriptFiles = 0,
        DeclarationAndJavaScriptFiles = 2,
        Limit = 5,

        Highest = TypeScriptFiles,
        Lowest = DeclarationAndJavaScriptFiles,
    }

    export function getExtensionPriority(path: string, supportedExtensions: string[]): ExtensionPriority {
        for (let i = supportedExtensions.length - 1; i >= 0; i--) {
            if (fileExtensionIs(path, supportedExtensions[i])) {
                return adjustExtensionPriority(<ExtensionPriority>i);
            }
        }

        // If its not in the list of supported extensions, this is likely a
        // TypeScript file with a non-ts extension
        return ExtensionPriority.Highest;
    }

    /**
     * Adjusts an extension priority to be the highest priority within the same range.
     */
    export function adjustExtensionPriority(extensionPriority: ExtensionPriority): ExtensionPriority {
        if (extensionPriority < ExtensionPriority.DeclarationAndJavaScriptFiles) {
            return ExtensionPriority.TypeScriptFiles;
        }
        else if (extensionPriority < ExtensionPriority.Limit) {
            return ExtensionPriority.DeclarationAndJavaScriptFiles;
        }
        else {
            return ExtensionPriority.Limit;
        }
    }

    /**
     * Gets the next lowest extension priority for a given priority.
     */
    export function getNextLowestExtensionPriority(extensionPriority: ExtensionPriority): ExtensionPriority {
        if (extensionPriority < ExtensionPriority.DeclarationAndJavaScriptFiles) {
            return ExtensionPriority.DeclarationAndJavaScriptFiles;
        }
        else {
            return ExtensionPriority.Limit;
        }
    }

    const extensionsToRemove = [".d.ts", ".ts", ".js", ".tsx", ".jsx"];
    export function removeFileExtension(path: string): string {
        for (const ext of extensionsToRemove) {
            const extensionless = tryRemoveExtension(path, ext);
            if (extensionless !== undefined) {
                return extensionless;
            }
        }
        return path;
    }

    export function tryRemoveExtension(path: string, extension: string): string {
        return fileExtensionIs(path, extension) ? path.substring(0, path.length - extension.length) : undefined;
    }

    export function isJsxOrTsxExtension(ext: string): boolean {
        return ext === ".jsx" || ext === ".tsx";
    }

    export function changeExtension<T extends string | Path>(path: T, newExtension: string): T {
        return <T>(removeFileExtension(path) + newExtension);
    }

    export interface ObjectAllocator {
        getNodeConstructor(): new (kind: SyntaxKind, pos?: number, end?: number) => Node;
        getSourceFileConstructor(): new (kind: SyntaxKind, pos?: number, end?: number) => SourceFile;
        getSymbolConstructor(): new (flags: SymbolFlags, name: string) => Symbol;
        getTypeConstructor(): new (checker: TypeChecker, flags: TypeFlags) => Type;
        getSignatureConstructor(): new (checker: TypeChecker) => Signature;
    }

    function Symbol(flags: SymbolFlags, name: string) {
        this.flags = flags;
        this.name = name;
        this.declarations = undefined;
    }

    function Type(checker: TypeChecker, flags: TypeFlags) {
        this.flags = flags;
    }

    function Signature(checker: TypeChecker) {
    }

    function Node(kind: SyntaxKind, pos: number, end: number) {
        this.kind = kind;
        this.pos = pos;
        this.end = end;
        this.flags = NodeFlags.None;
        this.parent = undefined;
    }

    export let objectAllocator: ObjectAllocator = {
        getNodeConstructor: () => <any>Node,
        getSourceFileConstructor: () => <any>Node,
        getSymbolConstructor: () => <any>Symbol,
        getTypeConstructor: () => <any>Type,
        getSignatureConstructor: () => <any>Signature
    };

    export const enum AssertionLevel {
        None = 0,
        Normal = 1,
        Aggressive = 2,
        VeryAggressive = 3,
    }

    export namespace Debug {
        const currentAssertionLevel = AssertionLevel.None;

        export function shouldAssert(level: AssertionLevel): boolean {
            return currentAssertionLevel >= level;
        }

        export function assert(expression: boolean, message?: string, verboseDebugInfo?: () => string): void {
            if (!expression) {
                let verboseDebugString = "";
                if (verboseDebugInfo) {
                    verboseDebugString = "\r\nVerbose Debug Information: " + verboseDebugInfo();
                }
                debugger;
                throw new Error("Debug Failure. False expression: " + (message || "") + verboseDebugString);
            }
        }

        export function fail(message?: string): void {
            Debug.assert(/*expression*/ false, message);
        }
    }

    export function copyListRemovingItem<T>(item: T, list: T[]) {
        const copiedList: T[] = [];
        for (const e of list) {
            if (e !== item) {
                copiedList.push(e);
            }
        }
        return copiedList;
    }

    export function createGetCanonicalFileName(useCaseSensitivefileNames: boolean): (fileName: string) => string {
        return useCaseSensitivefileNames
            ? ((fileName) => fileName)
            : ((fileName) => fileName.toLowerCase());
    }

}
