/// <reference path="types.ts"/>
/// <reference path="performance.ts" />
/// <reference path="diagnosticInformationMap.generated.ts" />


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

    const createObject = Object.create;

    export function createMap<T>(template?: MapLike<T>): Map<T> {
        const map: Map<T> = createObject(null); // tslint:disable-line:no-null-keyword

        // Using 'delete' on an object causes V8 to put the object in dictionary mode.
        // This disables creation of hidden classes, which are expensive when an object is
        // constantly changing shape.
        map["__"] = undefined;
        delete map["__"];

        // Copies keys/values from template. Note that for..in will not throw if
        // template is undefined, and instead will just exit the loop.
        for (const key in template) if (hasOwnProperty.call(template, key)) {
            map[key] = template[key];
        }

        return map;
    }

    export function createFileMap<T>(keyMapper?: (key: string) => string): FileMap<T> {
        let files = createMap<T>();
        return {
            get,
            set,
            contains,
            remove,
            forEachValue: forEachValueInMap,
            getKeys,
            clear,
        };

        function forEachValueInMap(f: (key: Path, value: T) => void) {
            for (const key in files) {
                f(<Path>key, files[key]);
            }
        }

        function getKeys() {
            const keys: Path[] = [];
            for (const key in files) {
                keys.push(<Path>key);
            }
            return keys;
        }

        // path should already be well-formed so it does not need to be normalized
        function get(path: Path): T {
            return files[toKey(path)];
        }

        function set(path: Path, value: T) {
            files[toKey(path)] = value;
        }

        function contains(path: Path) {
            return toKey(path) in files;
        }

        function remove(path: Path) {
            const key = toKey(path);
            delete files[key];
        }

        function clear() {
            files = createMap<T>();
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
    export function forEach<T, U>(array: T[] | undefined, callback: (element: T, index: number) => U | undefined): U | undefined {
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

    /** Works like Array.prototype.find, returning `undefined` if no element satisfying the predicate is found. */
    export function find<T>(array: T[], predicate: (element: T, index: number) => boolean): T | undefined {
        for (let i = 0, len = array.length; i < len; i++) {
            const value = array[i];
            if (predicate(value, i)) {
                return value;
            }
        }
        return undefined;
    }

    /**
     * Returns the first truthy result of `callback`, or else fails.
     * This is like `forEach`, but never returns undefined.
     */
    export function findMap<T, U>(array: T[], callback: (element: T, index: number) => U | undefined): U {
        for (let i = 0, len = array.length; i < len; i++) {
            const result = callback(array[i], i);
            if (result) {
                return result;
            }
        }
        Debug.fail();
    }

    export function contains<T>(array: T[], value: T): boolean {
        if (array) {
            for (const v of array) {
                if (v === value) {
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

    /**
     * Filters an array by a predicate function. Returns the same array instance if the predicate is
     * true for all elements, otherwise returns a new array instance containing the filtered subset.
     */
    export function filter<T>(array: T[], f: (x: T) => boolean): T[] {
        if (array) {
            const len = array.length;
            let i = 0;
            while (i < len && f(array[i])) i++;
            if (i < len) {
                const result = array.slice(0, i);
                i++;
                while (i < len) {
                    const item = array[i];
                    if (f(item)) {
                        result.push(item);
                    }
                    i++;
                }
                return result;
            }
        }
        return array;
    }

    export function removeWhere<T>(array: T[], f: (x: T) => boolean): boolean {
        let outIndex = 0;
        for (const item of array) {
            if (!f(item)) {
                array[outIndex] = item;
                outIndex++;
            }
        }
        if (outIndex !== array.length) {
            array.length = outIndex;
            return true;
        }
        return false;
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

    // TODO: fixme (N^2) - add optional comparer so collection can be sorted before deduplication.
    export function deduplicate<T>(array: T[], areEqual?: (a: T, b: T) => boolean): T[] {
        let result: T[];
        if (array) {
            result = [];
            loop: for (const item of array) {
                for (const res of result) {
                    if (areEqual ? areEqual(res, item) : res === item) {
                        continue loop;
                    }
                }
                result.push(item);
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
    export function binarySearch<T>(array: T[], value: T, comparer?: (v1: T, v2: T) => number): number {
        if (!array || array.length === 0) {
            return -1;
        }

        let low = 0;
        let high = array.length - 1;
        comparer = comparer !== undefined
            ? comparer
            : (v1, v2) => (v1 < v2 ? -1 : (v1 > v2 ? 1 : 0));

        while (low <= high) {
            const middle = low + ((high - low) >> 1);
            const midValue = array[middle];

            if (comparer(midValue, value) === 0) {
                return middle;
            }
            else if (comparer(midValue, value) > 0) {
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

    /**
     * Indicates whether a map-like contains an own property with the specified key.
     *
     * NOTE: This is intended for use only with MapLike<T> objects. For Map<T> objects, use
     *       the 'in' operator.
     *
     * @param map A map-like.
     * @param key A property key.
     */
    export function hasProperty<T>(map: MapLike<T>, key: string): boolean {
        return hasOwnProperty.call(map, key);
    }

    /**
     * Gets the value of an owned property in a map-like.
     *
     * NOTE: This is intended for use only with MapLike<T> objects. For Map<T> objects, use
     *       an indexer.
     *
     * @param map A map-like.
     * @param key A property key.
     */
    export function getProperty<T>(map: MapLike<T>, key: string): T | undefined {
        return hasOwnProperty.call(map, key) ? map[key] : undefined;
    }

    /**
     * Gets the owned, enumerable property keys of a map-like.
     *
     * NOTE: This is intended for use with MapLike<T> objects. For Map<T> objects, use
     *       Object.keys instead as it offers better performance.
     *
     * @param map A map-like.
     */
    export function getOwnKeys<T>(map: MapLike<T>): string[] {
        const keys: string[] = [];
        for (const key in map) if (hasOwnProperty.call(map, key)) {
            keys.push(key);
        }
        return keys;
    }

    /**
     * Enumerates the properties of a Map<T>, invoking a callback and returning the first truthy result.
     *
     * @param map A map for which properties should be enumerated.
     * @param callback A callback to invoke for each property.
     */
    export function forEachProperty<T, U>(map: Map<T>, callback: (value: T, key: string) => U): U {
        let result: U;
        for (const key in map) {
            if (result = callback(map[key], key)) break;
        }
        return result;
    }

    /**
     * Returns true if a Map<T> has some matching property.
     *
     * @param map A map whose properties should be tested.
     * @param predicate An optional callback used to test each property.
     */
    export function someProperties<T>(map: Map<T>, predicate?: (value: T, key: string) => boolean) {
        for (const key in map) {
            if (!predicate || predicate(map[key], key)) return true;
        }
        return false;
    }

    /**
     * Performs a shallow copy of the properties from a source Map<T> to a target MapLike<T>
     *
     * @param source A map from which properties should be copied.
     * @param target A map to which properties should be copied.
     */
    export function copyProperties<T>(source: Map<T>, target: MapLike<T>): void {
        for (const key in source) {
            target[key] = source[key];
        }
    }

    /**
     * Reduce the properties of a map.
     *
     * NOTE: This is intended for use with Map<T> objects. For MapLike<T> objects, use
     *       reduceOwnProperties instead as it offers better runtime safety.
     *
     * @param map The map to reduce
     * @param callback An aggregation function that is called for each entry in the map
     * @param initial The initial value for the reduction.
     */
    export function reduceProperties<T, U>(map: Map<T>, callback: (aggregate: U, value: T, key: string) => U, initial: U): U {
        let result = initial;
        for (const key in map) {
            result = callback(result, map[key], String(key));
        }
        return result;
    }

    /**
     * Reduce the properties defined on a map-like (but not from its prototype chain).
     *
     * NOTE: This is intended for use with MapLike<T> objects. For Map<T> objects, use
     *       reduceProperties instead as it offers better performance.
     *
     * @param map The map-like to reduce
     * @param callback An aggregation function that is called for each entry in the map
     * @param initial The initial value for the reduction.
     */
    export function reduceOwnProperties<T, U>(map: MapLike<T>, callback: (aggregate: U, value: T, key: string) => U, initial: U): U {
        let result = initial;
        for (const key in map) if (hasOwnProperty.call(map, key)) {
            result = callback(result, map[key], String(key));
        }
        return result;
    }

    /**
     * Performs a shallow equality comparison of the contents of two map-likes.
     *
     * @param left A map-like whose properties should be compared.
     * @param right A map-like whose properties should be compared.
     */
    export function equalOwnProperties<T>(left: MapLike<T>, right: MapLike<T>, equalityComparer?: (left: T, right: T) => boolean) {
        if (left === right) return true;
        if (!left || !right) return false;
        for (const key in left) if (hasOwnProperty.call(left, key)) {
            if (!hasOwnProperty.call(right, key) === undefined) return false;
            if (equalityComparer ? !equalityComparer(left[key], right[key]) : left[key] !== right[key]) return false;
        }
        for (const key in right) if (hasOwnProperty.call(right, key)) {
            if (!hasOwnProperty.call(left, key)) return false;
        }
        return true;
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
    export function arrayToMap<T>(array: T[], makeKey: (value: T) => string): Map<T>;
    export function arrayToMap<T, U>(array: T[], makeKey: (value: T) => string, makeValue: (value: T) => U): Map<U>;
    export function arrayToMap<T, U>(array: T[], makeKey: (value: T) => string, makeValue?: (value: T) => U): Map<T | U> {
        const result = createMap<T | U>();
        for (const value of array) {
            result[makeKey(value)] = makeValue ? makeValue(value) : value;
        }
        return result;
    }

    export function cloneMap<T>(map: Map<T>) {
        const clone = createMap<T>();
        copyProperties(map, clone);
        return clone;
    }

    export function clone<T>(object: T): T {
        const result: any = {};
        for (const id in object) {
            if (hasOwnProperty.call(object, id)) {
                result[id] = (<any>object)[id];
            }
        }
        return result;
    }

    export function extend<T1, T2>(first: T1 , second: T2): T1 & T2 {
        const result: T1 & T2 = <any>{};
        for (const id in second) if (hasOwnProperty.call(second, id)) {
            (result as any)[id] = (second as any)[id];
        }
        for (const id in first) if (hasOwnProperty.call(first, id)) {
            (result as any)[id] = (first as any)[id];
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
        return localizedDiagnosticMessages && localizedDiagnosticMessages[message.key] || message.message;
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

    /* @internal */
    export function startsWith(str: string, prefix: string): boolean {
        return str.lastIndexOf(prefix, 0) === 0;
    }

    /* @internal */
    export function endsWith(str: string, suffix: string): boolean {
        const expectedPos = str.length - suffix.length;
        return expectedPos >= 0 && str.indexOf(suffix, expectedPos) === expectedPos;
    }

    export function fileExtensionIs(path: string, extension: string): boolean {
        return path.length > extension.length && endsWith(path, extension);
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

    /**
     * Matches any single directory segment unless it is the last segment and a .min.js file
     * Breakdown:
     *  [^./]                   # matches everything up to the first . character (excluding directory seperators)
     *  (\\.(?!min\\.js$))?     # matches . characters but not if they are part of the .min.js file extension
     */
    const singleAsteriskRegexFragmentFiles = "([^./]|(\\.(?!min\\.js$))?)*";
    const singleAsteriskRegexFragmentOther = "[^/]*";

    export function getRegularExpressionForWildcard(specs: string[], basePath: string, usage: "files" | "directories" | "exclude") {
        if (specs === undefined || specs.length === 0) {
            return undefined;
        }

        const replaceWildcardCharacter =  usage === "files" ? replaceWildCardCharacterFiles : replaceWildCardCharacterOther;
        const singleAsteriskRegexFragment = usage === "files" ? singleAsteriskRegexFragmentFiles : singleAsteriskRegexFragmentOther;

        /**
         * Regex for the ** wildcard. Matches any number of subdirectories. When used for including
         * files or directories, does not match subdirectories that start with a . character
         */
        const doubleAsteriskRegexFragment = usage === "exclude" ? "(/.+?)?" : "(/[^/.][^/]*)*?";

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
            for (let component of components) {
                if (component === "**") {
                    if (hasRecursiveDirectoryWildcard) {
                        continue spec;
                    }

                    subpattern += doubleAsteriskRegexFragment;
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

                    if (usage !== "exclude") {
                        // The * and ? wildcards should not match directories or files that start with . if they
                        // appear first in a component. Dotted directories and files can be included explicitly
                        // like so: **/.*/.*
                        if (component.charCodeAt(0) === CharacterCodes.asterisk) {
                            subpattern += "([^./]" + singleAsteriskRegexFragment + ")?";
                            component = component.substr(1);
                        }
                        else if (component.charCodeAt(0) === CharacterCodes.question) {
                            subpattern += "[^./]";
                            component = component.substr(1);
                        }
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

    function replaceWildCardCharacterFiles(match: string) {
        return replaceWildcardCharacter(match, singleAsteriskRegexFragmentFiles);
    }

    function replaceWildCardCharacterOther(match: string) {
        return replaceWildcardCharacter(match, singleAsteriskRegexFragmentOther);
    }

    function replaceWildcardCharacter(match: string, singleAsteriskRegexFragment: string) {
        return match === "*" ? singleAsteriskRegexFragment : match === "?" ? "[^/]" : "\\" + match;
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
    /** Must have ".d.ts" first because if ".ts" goes first, that will be detected as the extension instead of ".d.ts". */
    export const supportedTypescriptExtensionsForExtractExtension = [".d.ts", ".ts", ".tsx"];
    export const supportedJavascriptExtensions = [".js", ".jsx"];
    const allSupportedExtensions  = supportedTypeScriptExtensions.concat(supportedJavascriptExtensions);

    export function getSupportedExtensions(options?: CompilerOptions): string[] {
        return options && options.allowJs ? allSupportedExtensions : supportedTypeScriptExtensions;
    }

    export function hasJavaScriptFileExtension(fileName: string) {
        return forEach(supportedJavascriptExtensions, extension => fileExtensionIs(fileName, extension));
    }

    export function hasTypeScriptFileExtension(fileName: string) {
        return forEach(supportedTypeScriptExtensions, extension => fileExtensionIs(fileName, extension));
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

    export function tryRemoveExtension(path: string, extension: string): string | undefined {
        return fileExtensionIs(path, extension) ? removeExtension(path, extension) : undefined;
    }

    export function removeExtension(path: string, extension: string): string {
        return path.substring(0, path.length - extension.length);
    }

    export function isJsxOrTsxExtension(ext: string): boolean {
        return ext === ".jsx" || ext === ".tsx";
    }

    export function changeExtension<T extends string | Path>(path: T, newExtension: string): T {
        return <T>(removeFileExtension(path) + newExtension);
    }

    export interface ObjectAllocator {
        getNodeConstructor(): new (kind: SyntaxKind, pos?: number, end?: number) => Node;
        getTokenConstructor(): new (kind: SyntaxKind, pos?: number, end?: number) => Token;
        getIdentifierConstructor(): new (kind: SyntaxKind, pos?: number, end?: number) => Token;
        getSourceFileConstructor(): new (kind: SyntaxKind, pos?: number, end?: number) => SourceFile;
        getSymbolConstructor(): new (flags: SymbolFlags, name: string) => Symbol;
        getTypeConstructor(): new (checker: TypeChecker, flags: TypeFlags) => Type;
        getSignatureConstructor(): new (checker: TypeChecker) => Signature;
    }

    function Symbol(this: Symbol, flags: SymbolFlags, name: string) {
        this.flags = flags;
        this.name = name;
        this.declarations = undefined;
    }

    function Type(this: Type, checker: TypeChecker, flags: TypeFlags) {
        this.flags = flags;
    }

    function Signature(checker: TypeChecker) {
    }

    function Node(this: Node, kind: SyntaxKind, pos: number, end: number) {
        this.kind = kind;
        this.pos = pos;
        this.end = end;
        this.flags = NodeFlags.None;
        this.parent = undefined;
    }

    export let objectAllocator: ObjectAllocator = {
        getNodeConstructor: () => <any>Node,
        getTokenConstructor: () => <any>Node,
        getIdentifierConstructor: () => <any>Node,
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


    /* @internal */
    export function trace(host: ModuleResolutionHost, message: DiagnosticMessage, ...args: any[]): void;
    export function trace(host: ModuleResolutionHost, message: DiagnosticMessage): void {
        host.trace(formatMessage.apply(undefined, arguments));
    }

    /* @internal */
    export function isTraceEnabled(compilerOptions: CompilerOptions, host: ModuleResolutionHost): boolean {
        return compilerOptions.traceResolution && host.trace !== undefined;
    }

    /* @internal */
    export function hasZeroOrOneAsteriskCharacter(str: string): boolean {
        let seenAsterisk = false;
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) === CharacterCodes.asterisk) {
                if (!seenAsterisk) {
                    seenAsterisk = true;
                }
                else {
                    // have already seen asterisk
                    return false;
                }
            }
        }
        return true;
    }

    function createResolvedModule(resolvedFileName: string, isExternalLibraryImport: boolean, failedLookupLocations: string[]): ResolvedModuleWithFailedLookupLocations {
        return { resolvedModule: resolvedFileName ? { resolvedFileName, isExternalLibraryImport } : undefined, failedLookupLocations };
    }

    /* @internal */
    export function isExternalModuleNameRelative(moduleName: string): boolean {
        // TypeScript 1.0 spec (April 2014): 11.2.1
        // An external module name is "relative" if the first term is "." or "..".
        return /^\.\.?($|[\\/])/.test(moduleName);
    }

    function moduleHasNonRelativeName(moduleName: string): boolean {
        return !(isRootedDiskPath(moduleName) || isExternalModuleNameRelative(moduleName));
    }

    /* @internal */
    export interface ModuleResolutionState {
        host: ModuleResolutionHost;
        compilerOptions: CompilerOptions;
        traceEnabled: boolean;
        // skip .tsx files if jsx is not enabled
        skipTsx: boolean;
    }

    function tryReadTypesSection(packageJsonPath: string, baseDirectory: string, state: ModuleResolutionState): string {
        const jsonContent = readJson(packageJsonPath, state.host);

        function tryReadFromField(fieldName: string) {
            if (hasProperty(jsonContent, fieldName)) {
                const typesFile = (<any>jsonContent)[fieldName];
                if (typeof typesFile === "string") {
                    const typesFilePath = normalizePath(combinePaths(baseDirectory, typesFile));
                    if (state.traceEnabled) {
                        trace(state.host, Diagnostics.package_json_has_0_field_1_that_references_2, fieldName, typesFile, typesFilePath);
                    }
                    return typesFilePath;
                }
                else {
                    if (state.traceEnabled) {
                        trace(state.host, Diagnostics.Expected_type_of_0_field_in_package_json_to_be_string_got_1, fieldName, typeof typesFile);
                    }
                }
            }
        }

        const typesFilePath = tryReadFromField("typings") || tryReadFromField("types");
        if (typesFilePath) {
            return typesFilePath;
        }

        // Use the main module for inferring types if no types package specified and the allowJs is set
        if (state.compilerOptions.allowJs && jsonContent.main && typeof jsonContent.main === "string") {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.No_types_specified_in_package_json_but_allowJs_is_set_so_returning_main_value_of_0, jsonContent.main);
            }
            const mainFilePath = normalizePath(combinePaths(baseDirectory, jsonContent.main));
            return mainFilePath;
        }
        return undefined;
    }

    /* @internal */
    export function readJson(path: string, host: ModuleResolutionHost): { typings?: string, types?: string, main?: string } {
        try {
            const jsonText = host.readFile(path);
            return jsonText ? JSON.parse(jsonText) : {};
        }
        catch (e) {
            // gracefully handle if readFile fails or returns not JSON
            return {};
        }
    }

    /* @internal */
    export function getEmitModuleKind(compilerOptions: CompilerOptions) {
        return typeof compilerOptions.module === "number" ?
            compilerOptions.module :
            getEmitScriptTarget(compilerOptions) === ScriptTarget.ES6 ? ModuleKind.ES6 : ModuleKind.CommonJS;
    }

    /* @internal */
    export function getEmitScriptTarget(compilerOptions: CompilerOptions) {
        return compilerOptions.target || ScriptTarget.ES3;
    }

    export function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
        const traceEnabled = isTraceEnabled(compilerOptions, host);
        if (traceEnabled) {
            trace(host, Diagnostics.Resolving_module_0_from_1, moduleName, containingFile);
        }

        let moduleResolution = compilerOptions.moduleResolution;
        if (moduleResolution === undefined) {
            moduleResolution = getEmitModuleKind(compilerOptions) === ModuleKind.CommonJS ? ModuleResolutionKind.NodeJs : ModuleResolutionKind.Classic;
            if (traceEnabled) {
                trace(host, Diagnostics.Module_resolution_kind_is_not_specified_using_0, ModuleResolutionKind[moduleResolution]);
            }
        }
        else {
            if (traceEnabled) {
                trace(host, Diagnostics.Explicitly_specified_module_resolution_kind_Colon_0, ModuleResolutionKind[moduleResolution]);
            }
        }

        let result: ResolvedModuleWithFailedLookupLocations;
        switch (moduleResolution) {
            case ModuleResolutionKind.NodeJs:
                result = nodeModuleNameResolver(moduleName, containingFile, compilerOptions, host);
                break;
            case ModuleResolutionKind.Classic:
                result = classicNameResolver(moduleName, containingFile, compilerOptions, host);
                break;
        }

        if (traceEnabled) {
            if (result.resolvedModule) {
                trace(host, Diagnostics.Module_name_0_was_successfully_resolved_to_1, moduleName, result.resolvedModule.resolvedFileName);
            }
            else {
                trace(host, Diagnostics.Module_name_0_was_not_resolved, moduleName);
            }
        }

        return result;
    }

    /*
     * Every module resolution kind can has its specific understanding how to load module from a specific path on disk
     * I.e. for path '/a/b/c':
     * - Node loader will first to try to check if '/a/b/c' points to a file with some supported extension and if this fails
     * it will try to load module from directory: directory '/a/b/c' should exist and it should have either 'package.json' with
     * 'typings' entry or file 'index' with some supported extension
     * - Classic loader will only try to interpret '/a/b/c' as file.
     */
    type ResolutionKindSpecificLoader = (candidate: string, extensions: string[], failedLookupLocations: string[], onlyRecordFailures: boolean, state: ModuleResolutionState) => string;

    /**
     * Any module resolution kind can be augmented with optional settings: 'baseUrl', 'paths' and 'rootDirs' - they are used to
     * mitigate differences between design time structure of the project and its runtime counterpart so the same import name
     * can be resolved successfully by TypeScript compiler and runtime module loader.
     * If these settings are set then loading procedure will try to use them to resolve module name and it can of failure it will
     * fallback to standard resolution routine.
     *
     * - baseUrl - this setting controls how non-relative module names are resolved. If this setting is specified then non-relative
     * names will be resolved relative to baseUrl: i.e. if baseUrl is '/a/b' then candidate location to resolve module name 'c/d' will
     * be '/a/b/c/d'
     * - paths - this setting can only be used when baseUrl is specified. allows to tune how non-relative module names
     * will be resolved based on the content of the module name.
     * Structure of 'paths' compiler options
     * 'paths': {
     *    pattern-1: [...substitutions],
     *    pattern-2: [...substitutions],
     *    ...
     *    pattern-n: [...substitutions]
     * }
     * Pattern here is a string that can contain zero or one '*' character. During module resolution module name will be matched against
     * all patterns in the list. Matching for patterns that don't contain '*' means that module name must be equal to pattern respecting the case.
     * If pattern contains '*' then to match pattern "<prefix>*<suffix>" module name must start with the <prefix> and end with <suffix>.
     * <MatchedStar> denotes part of the module name between <prefix> and <suffix>.
     * If module name can be matches with multiple patterns then pattern with the longest prefix will be picked.
     * After selecting pattern we'll use list of substitutions to get candidate locations of the module and the try to load module
     * from the candidate location.
     * Substitution is a string that can contain zero or one '*'. To get candidate location from substitution we'll pick every
     * substitution in the list and replace '*' with <MatchedStar> string. If candidate location is not rooted it
     * will be converted to absolute using baseUrl.
     * For example:
     * baseUrl: /a/b/c
     * "paths": {
     *     // match all module names
     *     "*": [
     *         "*",        // use matched name as is,
     *                     // <matched name> will be looked as /a/b/c/<matched name>
     *
     *         "folder1/*" // substitution will convert matched name to 'folder1/<matched name>',
     *                     // since it is not rooted then final candidate location will be /a/b/c/folder1/<matched name>
     *     ],
     *     // match module names that start with 'components/'
     *     "components/*": [ "/root/components/*" ] // substitution will convert /components/folder1/<matched name> to '/root/components/folder1/<matched name>',
     *                                              // it is rooted so it will be final candidate location
     * }
     *
     * 'rootDirs' allows the project to be spreaded across multiple locations and resolve modules with relative names as if
     * they were in the same location. For example lets say there are two files
     * '/local/src/content/file1.ts'
     * '/shared/components/contracts/src/content/protocols/file2.ts'
     * After bundling content of '/shared/components/contracts/src' will be merged with '/local/src' so
     * if file1 has the following import 'import {x} from "./protocols/file2"' it will be resolved successfully in runtime.
     * 'rootDirs' provides the way to tell compiler that in order to get the whole project it should behave as if content of all
     * root dirs were merged together.
     * I.e. for the example above 'rootDirs' will have two entries: [ '/local/src', '/shared/components/contracts/src' ].
     * Compiler will first convert './protocols/file2' into absolute path relative to the location of containing file:
     * '/local/src/content/protocols/file2' and try to load it - failure.
     * Then it will search 'rootDirs' looking for a longest matching prefix of this absolute path and if such prefix is found - absolute path will
     * be converted to a path relative to found rootDir entry './content/protocols/file2' (*). As a last step compiler will check all remaining
     * entries in 'rootDirs', use them to build absolute path out of (*) and try to resolve module from this location.
     */
    function tryLoadModuleUsingOptionalResolutionSettings(moduleName: string, containingDirectory: string, loader: ResolutionKindSpecificLoader,
        failedLookupLocations: string[], supportedExtensions: string[], state: ModuleResolutionState): string {

        if (moduleHasNonRelativeName(moduleName)) {
            return tryLoadModuleUsingBaseUrl(moduleName, loader, failedLookupLocations, supportedExtensions, state);
        }
        else {
            return tryLoadModuleUsingRootDirs(moduleName, containingDirectory, loader, failedLookupLocations, supportedExtensions, state);
        }
    }

    function tryLoadModuleUsingRootDirs(moduleName: string, containingDirectory: string, loader: ResolutionKindSpecificLoader,
        failedLookupLocations: string[], supportedExtensions: string[], state: ModuleResolutionState): string {

        if (!state.compilerOptions.rootDirs) {
            return undefined;
        }

        if (state.traceEnabled) {
            trace(state.host, Diagnostics.rootDirs_option_is_set_using_it_to_resolve_relative_module_name_0, moduleName);
        }

        const candidate = normalizePath(combinePaths(containingDirectory, moduleName));

        let matchedRootDir: string;
        let matchedNormalizedPrefix: string;
        for (const rootDir of state.compilerOptions.rootDirs) {
            // rootDirs are expected to be absolute
            // in case of tsconfig.json this will happen automatically - compiler will expand relative names
            // using location of tsconfig.json as base location
            let normalizedRoot = normalizePath(rootDir);
            if (!endsWith(normalizedRoot, directorySeparator)) {
                normalizedRoot += directorySeparator;
            }
            const isLongestMatchingPrefix =
                startsWith(candidate, normalizedRoot) &&
                (matchedNormalizedPrefix === undefined || matchedNormalizedPrefix.length < normalizedRoot.length);

            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Checking_if_0_is_the_longest_matching_prefix_for_1_2, normalizedRoot, candidate, isLongestMatchingPrefix);
            }

            if (isLongestMatchingPrefix) {
                matchedNormalizedPrefix = normalizedRoot;
                matchedRootDir = rootDir;
            }
        }
        if (matchedNormalizedPrefix) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Longest_matching_prefix_for_0_is_1, candidate, matchedNormalizedPrefix);
            }
            const suffix = candidate.substr(matchedNormalizedPrefix.length);

            // first - try to load from a initial location
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Loading_0_from_the_root_dir_1_candidate_location_2, suffix, matchedNormalizedPrefix, candidate);
            }
            const resolvedFileName = loader(candidate, supportedExtensions, failedLookupLocations, !directoryProbablyExists(containingDirectory, state.host), state);
            if (resolvedFileName) {
                return resolvedFileName;
            }

            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Trying_other_entries_in_rootDirs);
            }
            // then try to resolve using remaining entries in rootDirs
            for (const rootDir of state.compilerOptions.rootDirs) {
                if (rootDir === matchedRootDir) {
                    // skip the initially matched entry
                    continue;
                }
                const candidate = combinePaths(normalizePath(rootDir), suffix);
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Loading_0_from_the_root_dir_1_candidate_location_2, suffix, rootDir, candidate);
                }
                const baseDirectory = getDirectoryPath(candidate);
                const resolvedFileName = loader(candidate, supportedExtensions, failedLookupLocations, !directoryProbablyExists(baseDirectory, state.host), state);
                if (resolvedFileName) {
                    return resolvedFileName;
                }
            }
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Module_resolution_using_rootDirs_has_failed);
            }
        }
        return undefined;
    }

    function tryLoadModuleUsingBaseUrl(moduleName: string, loader: ResolutionKindSpecificLoader, failedLookupLocations: string[],
        supportedExtensions: string[], state: ModuleResolutionState): string {

        if (!state.compilerOptions.baseUrl) {
            return undefined;
        }
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.baseUrl_option_is_set_to_0_using_this_value_to_resolve_non_relative_module_name_1, state.compilerOptions.baseUrl, moduleName);
        }

        // string is for exact match
        let matchedPattern: Pattern | string | undefined = undefined;
        if (state.compilerOptions.paths) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.paths_option_is_specified_looking_for_a_pattern_to_match_module_name_0, moduleName);
            }
            matchedPattern = matchPatternOrExact(getOwnKeys(state.compilerOptions.paths), moduleName);
        }

        if (matchedPattern) {
            const matchedStar = typeof matchedPattern === "string" ? undefined : matchedText(matchedPattern, moduleName);
            const matchedPatternText = typeof matchedPattern === "string" ? matchedPattern : patternText(matchedPattern);
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Module_name_0_matched_pattern_1, moduleName, matchedPatternText);
            }
            for (const subst of state.compilerOptions.paths[matchedPatternText]) {
                const path = matchedStar ? subst.replace("*", matchedStar) : subst;
                const candidate = normalizePath(combinePaths(state.compilerOptions.baseUrl, path));
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.Trying_substitution_0_candidate_module_location_Colon_1, subst, path);
                }
                const resolvedFileName = loader(candidate, supportedExtensions, failedLookupLocations, !directoryProbablyExists(getDirectoryPath(candidate), state.host), state);
                if (resolvedFileName) {
                    return resolvedFileName;
                }
            }
            return undefined;
        }
        else {
            const candidate = normalizePath(combinePaths(state.compilerOptions.baseUrl, moduleName));

            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Resolving_module_name_0_relative_to_base_url_1_2, moduleName, state.compilerOptions.baseUrl, candidate);
            }

            return loader(candidate, supportedExtensions, failedLookupLocations, !directoryProbablyExists(getDirectoryPath(candidate), state.host), state);
        }
    }

    /**
     * patternStrings contains both pattern strings (containing "*") and regular strings.
     * Return an exact match if possible, or a pattern match, or undefined.
     * (These are verified by verifyCompilerOptions to have 0 or 1 "*" characters.)
     */
    function matchPatternOrExact(patternStrings: string[], candidate: string): string | Pattern | undefined {
        const patterns: Pattern[] = [];
        for (const patternString of patternStrings) {
            const pattern = tryParsePattern(patternString);
            if (pattern) {
                patterns.push(pattern);
            }
            else if (patternString === candidate) {
                // pattern was matched as is - no need to search further
                return patternString;
            }
        }

        return findBestPatternMatch(patterns, _ => _, candidate);
    }

    function patternText({prefix, suffix}: Pattern): string {
        return `${prefix}*${suffix}`;
    }

    /**
     * Given that candidate matches pattern, returns the text matching the '*'.
     * E.g.: matchedText(tryParsePattern("foo*baz"), "foobarbaz") === "bar"
     */
    function matchedText(pattern: Pattern, candidate: string): string {
        Debug.assert(isPatternMatch(pattern, candidate));
        return candidate.substr(pattern.prefix.length, candidate.length - pattern.suffix.length);
    }

    /** Return the object corresponding to the best pattern to match `candidate`. */
    /* @internal */
    export function findBestPatternMatch<T>(values: T[], getPattern: (value: T) => Pattern, candidate: string): T | undefined {
        let matchedValue: T | undefined = undefined;
        // use length of prefix as betterness criteria
        let longestMatchPrefixLength = -1;

        for (const v of values) {
            const pattern = getPattern(v);
            if (isPatternMatch(pattern, candidate) && pattern.prefix.length > longestMatchPrefixLength) {
                longestMatchPrefixLength = pattern.prefix.length;
                matchedValue = v;
            }
        }

        return matchedValue;
    }

    function isPatternMatch({prefix, suffix}: Pattern, candidate: string) {
        return candidate.length >= prefix.length + suffix.length &&
               startsWith(candidate, prefix) &&
               endsWith(candidate, suffix);
    }

    /* @internal */
    export function tryParsePattern(pattern: string): Pattern | undefined {
        // This should be verified outside of here and a proper error thrown.
        Debug.assert(hasZeroOrOneAsteriskCharacter(pattern));
        const indexOfStar = pattern.indexOf("*");
        return indexOfStar === -1 ? undefined : {
            prefix: pattern.substr(0, indexOfStar),
            suffix: pattern.substr(indexOfStar + 1)
        };
    }

    export function nodeModuleNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
        const containingDirectory = getDirectoryPath(containingFile);
        const supportedExtensions = getSupportedExtensions(compilerOptions);
        const traceEnabled = isTraceEnabled(compilerOptions, host);

        const failedLookupLocations: string[] = [];
        const state = { compilerOptions, host, traceEnabled, skipTsx: false };
        let resolvedFileName = tryLoadModuleUsingOptionalResolutionSettings(moduleName, containingDirectory, nodeLoadModuleByRelativeName,
            failedLookupLocations, supportedExtensions, state);

        let isExternalLibraryImport = false;
        if (!resolvedFileName) {
            if (moduleHasNonRelativeName(moduleName)) {
                if (traceEnabled) {
                    trace(host, Diagnostics.Loading_module_0_from_node_modules_folder, moduleName);
                }
                resolvedFileName = loadModuleFromNodeModules(moduleName, containingDirectory, failedLookupLocations, state);
                isExternalLibraryImport = resolvedFileName !== undefined;
            }
            else {
                const candidate = normalizePath(combinePaths(containingDirectory, moduleName));
                resolvedFileName = nodeLoadModuleByRelativeName(candidate, supportedExtensions, failedLookupLocations, /*onlyRecordFailures*/ false, state);
            }
        }

        if (resolvedFileName && host.realpath) {
            const originalFileName = resolvedFileName;
            resolvedFileName = normalizePath(host.realpath(resolvedFileName));
            if (traceEnabled) {
                trace(host, Diagnostics.Resolving_real_path_for_0_result_1, originalFileName, resolvedFileName);
            }
        }

        return createResolvedModule(resolvedFileName, isExternalLibraryImport, failedLookupLocations);
    }

    function nodeLoadModuleByRelativeName(candidate: string, supportedExtensions: string[], failedLookupLocations: string[],
        onlyRecordFailures: boolean, state: ModuleResolutionState): string {

        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Loading_module_as_file_Slash_folder_candidate_module_location_0, candidate);
        }

        const resolvedFileName = loadModuleFromFile(candidate, supportedExtensions, failedLookupLocations, onlyRecordFailures, state);

        return resolvedFileName || loadNodeModuleFromDirectory(supportedExtensions, candidate, failedLookupLocations, onlyRecordFailures, state);
    }

    /* @internal */
    export function directoryProbablyExists(directoryName: string, host: { directoryExists?: (directoryName: string) => boolean }): boolean {
        // if host does not support 'directoryExists' assume that directory will exist
        return !host.directoryExists || host.directoryExists(directoryName);
    }

    /**
     * @param {boolean} onlyRecordFailures - if true then function won't try to actually load files but instead record all attempts as failures. This flag is necessary
     * in cases when we know upfront that all load attempts will fail (because containing folder does not exists) however we still need to record all failed lookup locations.
     */
    function loadModuleFromFile(candidate: string, extensions: string[], failedLookupLocation: string[], onlyRecordFailures: boolean, state: ModuleResolutionState): string | undefined {
        // First, try adding an extension. An import of "foo" could be matched by a file "foo.ts", or "foo.js" by "foo.js.ts"
        const resolvedByAddingExtension = tryAddingExtensions(candidate, extensions, failedLookupLocation, onlyRecordFailures, state);
        if (resolvedByAddingExtension) {
            return resolvedByAddingExtension;
        }

        // If that didn't work, try stripping a ".js" or ".jsx" extension and replacing it with a TypeScript one;
        // e.g. "./foo.js" can be matched by "./foo.ts" or "./foo.d.ts"
        if (hasJavaScriptFileExtension(candidate)) {
            const extensionless = removeFileExtension(candidate);
            if (state.traceEnabled) {
                const extension = candidate.substring(extensionless.length);
                trace(state.host, Diagnostics.File_name_0_has_a_1_extension_stripping_it, candidate, extension);
            }
            return tryAddingExtensions(extensionless, extensions, failedLookupLocation, onlyRecordFailures, state);
        }
    }

    /** Try to return an existing file that adds one of the `extensions` to `candidate`. */
    function tryAddingExtensions(candidate: string, extensions: string[], failedLookupLocation: string[], onlyRecordFailures: boolean, state: ModuleResolutionState): string | undefined {
        if (!onlyRecordFailures) {
            // check if containing folder exists - if it doesn't then just record failures for all supported extensions without disk probing
            const directory = getDirectoryPath(candidate);
            if (directory) {
                onlyRecordFailures = !directoryProbablyExists(directory, state.host);
            }
        }
        return forEach(extensions, ext =>
            !(state.skipTsx && isJsxOrTsxExtension(ext)) && tryFile(candidate + ext, failedLookupLocation, onlyRecordFailures, state));
    }

    /** Return the file if it exists. */
    function tryFile(fileName: string, failedLookupLocation: string[], onlyRecordFailures: boolean, state: ModuleResolutionState): string | undefined {
        if (!onlyRecordFailures && state.host.fileExists(fileName)) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.File_0_exist_use_it_as_a_name_resolution_result, fileName);
            }
            return fileName;
        }
        else {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.File_0_does_not_exist, fileName);
            }
            failedLookupLocation.push(fileName);
            return undefined;
        }
    }

    /* @internal */
    export function loadNodeModuleFromDirectory(extensions: string[], candidate: string, failedLookupLocation: string[], onlyRecordFailures: boolean, state: ModuleResolutionState): string {
        const packageJsonPath = pathToPackageJson(candidate);
        const directoryExists = !onlyRecordFailures && directoryProbablyExists(candidate, state.host);
        if (directoryExists && state.host.fileExists(packageJsonPath)) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Found_package_json_at_0, packageJsonPath);
            }
            const typesFile = tryReadTypesSection(packageJsonPath, candidate, state);
            if (typesFile) {
                const onlyRecordFailures = !directoryProbablyExists(getDirectoryPath(typesFile), state.host);
                // The package.json "typings" property must specify the file with extension, so just try that exact filename.
                const result = tryFile(typesFile, failedLookupLocation, onlyRecordFailures, state);
                if (result) {
                    return result;
                }
            }
            else {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.package_json_does_not_have_types_field);
                }
            }
        }
        else {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.File_0_does_not_exist, packageJsonPath);
            }
            // record package json as one of failed lookup locations - in the future if this file will appear it will invalidate resolution results
            failedLookupLocation.push(packageJsonPath);
        }

        return loadModuleFromFile(combinePaths(candidate, "index"), extensions, failedLookupLocation, !directoryExists, state);
    }

    /* @internal */
    export function pathToPackageJson(directory: string): string {
        return combinePaths(directory, "package.json");
    }

    function loadModuleFromNodeModulesFolder(moduleName: string, directory: string, failedLookupLocations: string[], state: ModuleResolutionState): string {
        const nodeModulesFolder = combinePaths(directory, "node_modules");
        const nodeModulesFolderExists = directoryProbablyExists(nodeModulesFolder, state.host);
        const candidate = normalizePath(combinePaths(nodeModulesFolder, moduleName));
        const supportedExtensions = getSupportedExtensions(state.compilerOptions);

        let result = loadModuleFromFile(candidate, supportedExtensions, failedLookupLocations, !nodeModulesFolderExists, state);
        if (result) {
            return result;
        }
        result = loadNodeModuleFromDirectory(supportedExtensions, candidate, failedLookupLocations, !nodeModulesFolderExists, state);
        if (result) {
            return result;
        }
    }

    /* @internal */
    export function loadModuleFromNodeModules(moduleName: string, directory: string, failedLookupLocations: string[], state: ModuleResolutionState): string {
        directory = normalizeSlashes(directory);
        while (true) {
            const baseName = getBaseFileName(directory);
            if (baseName !== "node_modules") {
                // Try to load source from the package
                const packageResult = loadModuleFromNodeModulesFolder(moduleName, directory, failedLookupLocations, state);
                if (packageResult && hasTypeScriptFileExtension(packageResult)) {
                    // Always prefer a TypeScript (.ts, .tsx, .d.ts) file shipped with the package
                    return packageResult;
                }
                else {
                    // Else prefer a types package over non-TypeScript results (e.g. JavaScript files)
                    const typesResult = loadModuleFromNodeModulesFolder(combinePaths("@types", moduleName), directory, failedLookupLocations, state);
                    if (typesResult || packageResult) {
                        return typesResult || packageResult;
                    }
                }
            }

            const parentPath = getDirectoryPath(directory);
            if (parentPath === directory) {
                break;
            }

            directory = parentPath;
        }
        return undefined;
    }

    export function classicNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost): ResolvedModuleWithFailedLookupLocations {
        const traceEnabled = isTraceEnabled(compilerOptions, host);
        const state = { compilerOptions, host, traceEnabled, skipTsx: !compilerOptions.jsx };
        const failedLookupLocations: string[] = [];
        const supportedExtensions = getSupportedExtensions(compilerOptions);
        let containingDirectory = getDirectoryPath(containingFile);

        const resolvedFileName = tryLoadModuleUsingOptionalResolutionSettings(moduleName, containingDirectory, loadModuleFromFile, failedLookupLocations, supportedExtensions, state);
        if (resolvedFileName) {
            return createResolvedModule(resolvedFileName, /*isExternalLibraryImport*/false, failedLookupLocations);
        }

        let referencedSourceFile: string;
        if (moduleHasNonRelativeName(moduleName)) {
            while (true) {
                const searchName = normalizePath(combinePaths(containingDirectory, moduleName));
                referencedSourceFile = loadModuleFromFile(searchName, supportedExtensions, failedLookupLocations, /*onlyRecordFailures*/ false, state);
                if (referencedSourceFile) {
                    break;
                }
                const parentPath = getDirectoryPath(containingDirectory);
                if (parentPath === containingDirectory) {
                    break;
                }
                containingDirectory = parentPath;
            }
        }
        else {
            const candidate = normalizePath(combinePaths(containingDirectory, moduleName));
            referencedSourceFile = loadModuleFromFile(candidate, supportedExtensions, failedLookupLocations, /*onlyRecordFailures*/ false, state);
        }


        return referencedSourceFile
            ? { resolvedModule: { resolvedFileName: referencedSourceFile }, failedLookupLocations }
            : { resolvedModule: undefined, failedLookupLocations };
    }
}
