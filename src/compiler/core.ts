/// <reference path="types.ts"/>

module ts {

    // Ternary values are defined such that
    // x & y is False if either x or y is False.
    // x & y is Maybe if either x or y is Maybe, but neither x or y is False.
    // x & y is True if both x and y are True.
    // x | y is False if both x and y are False.
    // x | y is Maybe if either x or y is Maybe, but neither x or y is True.
    // x | y is True if either x or y is True.
    export const enum Ternary {
        False = 0,
        Maybe = 1,
        True  = -1
    }

    export const enum Comparison {
        LessThan    = -1,
        EqualTo     = 0,
        GreaterThan = 1
    }

    export interface StringSet extends Map<any> { }

    export function forEach<T, U>(array: T[], callback: (element: T) => U): U {
        if (array) {
            for (var i = 0, len = array.length; i < len; i++) {
                var result = callback(array[i]);
                if (result) {
                    return result;
                }
            }
        }
        return undefined;
    }

    export function contains<T>(array: T[], value: T): boolean {
        if (array) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === value) {
                    return true;
                }
            }
        }
        return false;
    }

    export function indexOf<T>(array: T[], value: T): number {
        if (array) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
        }
        return -1;
    }

    export function countWhere<T>(array: T[], predicate: (x: T) => boolean): number {
        var count = 0;
        if (array) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (predicate(array[i])) {
                    count++;
                }
            }
        }
        return count;
    }

    export function filter<T>(array: T[], f: (x: T) => boolean): T[] {
        if (array) {
            var result: T[] = [];
            for (var i = 0, len = array.length; i < len; i++) {
                var item = array[i];
                if (f(item)) {
                    result.push(item);
                }
            }
        }
        return result;
    }

    export function map<T, U>(array: T[], f: (x: T) => U): U[] {
        if (array) {
            var result: U[] = [];
            for (var i = 0, len = array.length; i < len; i++) {
                result.push(f(array[i]));
            }
        }
        return result;
    }

    export function concatenate<T>(array1: T[], array2: T[]): T[] {
        if (!array2 || !array2.length) return array1;
        if (!array1 || !array1.length) return array2;

        return array1.concat(array2);
    }

    export function deduplicate<T>(array: T[]): T[] {
        if (array) {
            var result: T[] = [];
            for (var i = 0, len = array.length; i < len; i++) {
                var item = array[i];
                if (!contains(result, item)) result.push(item);
            }
        }
        return result;
    }

    export function sum(array: any[], prop: string): number {
        var result = 0;
        for (var i = 0; i < array.length; i++) {
            result += array[i][prop];
        }
        return result;
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

    export function binarySearch(array: number[], value: number): number {
        var low = 0;
        var high = array.length - 1;

        while (low <= high) {
            var middle = low + ((high - low) >> 1);
            var midValue = array[middle];

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

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    export function hasProperty<T>(map: Map<T>, key: string): boolean {
        return hasOwnProperty.call(map, key);
    }

    export function getProperty<T>(map: Map<T>, key: string): T {
        return hasOwnProperty.call(map, key) ? map[key] : undefined;
    }

    export function isEmpty<T>(map: Map<T>) {
        for (var id in map) {
            if (hasProperty(map, id)) {
                return false;
            }
        }
        return true;
    }

    export function clone<T>(object: T): T {
        var result: any = {};
        for (var id in object) {
            result[id] = (<any>object)[id];
        }
        return <T>result;
    }

    export function forEachValue<T, U>(map: Map<T>, callback: (value: T) => U): U {
        var result: U;
        for (var id in map) {
            if (result = callback(map[id])) break;
        }
        return result;
    }

    export function forEachKey<T, U>(map: Map<T>, callback: (key: string) => U): U {
        var result: U;
        for (var id in map) {
            if (result = callback(id)) break;
        }
        return result;
    }

    export function lookUp<T>(map: Map<T>, key: string): T {
        return hasProperty(map, key) ? map[key] : undefined;
    }

    export function mapToArray<T>(map: Map<T>): T[] {
        var result: T[] = [];

        for (var id in map) {
            result.push(map[id]);
        }

        return result;
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
        var result: Map<T> = {};

        forEach(array, value => {
            result[makeKey(value)] = value;
        });

        return result;
    }

    function formatStringFromArgs(text: string, args: { [index: number]: any; }, baseIndex?: number): string {
        baseIndex = baseIndex || 0;

        return text.replace(/{(\d+)}/g, (match, index?) => args[+index + baseIndex]);
    }

    export var localizedDiagnosticMessages: Map<string> = undefined;

    export function getLocaleSpecificMessage(message: string) {
        return localizedDiagnosticMessages && localizedDiagnosticMessages[message]
            ? localizedDiagnosticMessages[message]
            : message;
    }

    export function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage, ...args: any[]): Diagnostic;
    export function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage): Diagnostic {
        Debug.assert(start >= 0, "start must be non-negative, is " + start);
        Debug.assert(length >= 0, "length must be non-negative, is " + length);

        var text = getLocaleSpecificMessage(message.key);
        
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
            isEarly: message.isEarly
        };
    }

    export function createCompilerDiagnostic(message: DiagnosticMessage, ...args: any[]): Diagnostic;
    export function createCompilerDiagnostic(message: DiagnosticMessage): Diagnostic {
        var text = getLocaleSpecificMessage(message.key);

        if (arguments.length > 1) {
            text = formatStringFromArgs(text, arguments, 1);
        }

        return {
            file: undefined,
            start: undefined,
            length: undefined,

            messageText: text,
            category: message.category,
            code: message.code,
            isEarly: message.isEarly
        };
    }

    export function chainDiagnosticMessages(details: DiagnosticMessageChain, message: DiagnosticMessage, ...args: any[]): DiagnosticMessageChain;
    export function chainDiagnosticMessages(details: DiagnosticMessageChain, message: DiagnosticMessage): DiagnosticMessageChain {
        var text = getLocaleSpecificMessage(message.key);

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
        Debug.assert(!headChain.next);
        headChain.next = tailChain;
        return headChain;
    }

    export function flattenDiagnosticChain(file: SourceFile, start: number, length: number, diagnosticChain: DiagnosticMessageChain, newLine: string): Diagnostic {
        Debug.assert(start >= 0, "start must be non-negative, is " + start);
        Debug.assert(length >= 0, "length must be non-negative, is " + length);

        var code = diagnosticChain.code;
        var category = diagnosticChain.category;
        var messageText = "";

        var indent = 0;
        while (diagnosticChain) {
            if (indent) {
                messageText += newLine;
                
                for (var i = 0; i < indent; i++) {
                    messageText += "  ";
                }
            }
            messageText += diagnosticChain.messageText;
            indent++;
            diagnosticChain = diagnosticChain.next;
        }

        return {
            file,
            start,
            length,
            code,
            category,
            messageText
        };
    }

    export function compareValues<T>(a: T, b: T): Comparison {
        if (a === b) return Comparison.EqualTo;
        if (a === undefined) return Comparison.LessThan;
        if (b === undefined) return Comparison.GreaterThan;
        return a < b ? Comparison.LessThan : Comparison.GreaterThan;
    }

    function getDiagnosticFilename(diagnostic: Diagnostic): string {
        return diagnostic.file ? diagnostic.file.filename : undefined;
    }

    export function compareDiagnostics(d1: Diagnostic, d2: Diagnostic): number {
        return compareValues(getDiagnosticFilename(d1), getDiagnosticFilename(d2)) ||
            compareValues(d1.start, d2.start) ||
            compareValues(d1.length, d2.length) ||
            compareValues(d1.code, d2.code) ||
            compareValues(d1.messageText, d2.messageText) ||
            0;
    }

    export function deduplicateSortedDiagnostics(diagnostics: Diagnostic[]): Diagnostic[] {
        if (diagnostics.length < 2) {
            return diagnostics;
        }

        var newDiagnostics = [diagnostics[0]];
        var previousDiagnostic = diagnostics[0];
        for (var i = 1; i < diagnostics.length; i++) {
            var currentDiagnostic = diagnostics[i];
            var isDupe = compareDiagnostics(currentDiagnostic, previousDiagnostic) === Comparison.EqualTo;
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

    // Returns length of path root (i.e. length of "/", "x:/", "//server/share/")
    export function getRootLength(path: string): number {
        if (path.charCodeAt(0) === CharacterCodes.slash) {
            if (path.charCodeAt(1) !== CharacterCodes.slash) return 1;
            var p1 = path.indexOf("/", 2);
            if (p1 < 0) return 2;
            var p2 = path.indexOf("/", p1 + 1);
            if (p2 < 0) return p1 + 1;
            return p2 + 1;
        }
        if (path.charCodeAt(1) === CharacterCodes.colon) {
            if (path.charCodeAt(2) === CharacterCodes.slash) return 3;
            return 2;
        }
        return 0;
    }

    export var directorySeparator = "/";
    function getNormalizedParts(normalizedSlashedPath: string, rootLength: number) {
        var parts = normalizedSlashedPath.substr(rootLength).split(directorySeparator);
        var normalized: string[] = [];
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part !== ".") {
                if (part === ".." && normalized.length > 0 && normalized[normalized.length - 1] !== "..") {
                    normalized.pop();
                }
                else {
                    normalized.push(part);
                }
            }
        }

        return normalized;
    }

    export function normalizePath(path: string): string {
        var path = normalizeSlashes(path);
        var rootLength = getRootLength(path);
        var normalized = getNormalizedParts(path, rootLength);
        return path.substr(0, rootLength) + normalized.join(directorySeparator);
    }

    export function getDirectoryPath(path: string) {
        return path.substr(0, Math.max(getRootLength(path), path.lastIndexOf(directorySeparator)));
    }

    export function isUrl(path: string) {
        return path && !isRootedDiskPath(path) && path.indexOf("://") !== -1;
    }

    export function isRootedDiskPath(path: string) {
        return getRootLength(path) !== 0;
    }

    function normalizedPathComponents(path: string, rootLength: number) {
        var normalizedParts = getNormalizedParts(path, rootLength);
        return [path.substr(0, rootLength)].concat(normalizedParts);
    }

    export function getNormalizedPathComponents(path: string, currentDirectory: string) {
        var path = normalizeSlashes(path);
        var rootLength = getRootLength(path);
        if (rootLength == 0) {
            // If the path is not rooted it is relative to current directory
            path = combinePaths(normalizeSlashes(currentDirectory), path);
            rootLength = getRootLength(path);
        }

        return normalizedPathComponents(path, rootLength);
    }

    export function getNormalizedAbsolutePath(filename: string, currentDirectory: string) {
        return getNormalizedPathFromPathComponents(getNormalizedPathComponents(filename, currentDirectory));
    }

    export function getNormalizedPathFromPathComponents(pathComponents: string[]) {
        if (pathComponents && pathComponents.length) {
            return pathComponents[0] + pathComponents.slice(1).join(directorySeparator);
        }
    }

    function getNormalizedPathComponentsOfUrl(url: string) {
        // Get root length of http://www.website.com/folder1/foler2/
        // In this example the root is:  http://www.website.com/ 
        // normalized path components should be ["http://www.website.com/", "folder1", "folder2"]

        var urlLength = url.length;
        // Initial root length is http:// part
        var rootLength = url.indexOf("://") + "://".length;
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
        var indexOfNextSlash = url.indexOf(directorySeparator, rootLength);
        if (indexOfNextSlash !== -1) {
            // Found the "/" after the website.com so the root is length of http://www.website.com/ 
            // and get components afetr the root normally like any other folder components
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
        var pathComponents = getNormalizedPathOrUrlComponents(relativeOrAbsolutePath, currentDirectory);
        var directoryComponents = getNormalizedPathOrUrlComponents(directoryPathOrUrl, currentDirectory);
        if (directoryComponents.length > 1 && directoryComponents[directoryComponents.length - 1] === "") {
            // If the directory path given was of type test/cases/ then we really need components of directory to be only till its name
            // that is  ["test", "cases", ""] needs to be actually ["test", "cases"]
            directoryComponents.length--;
        }

        // Find the component that differs
        for (var joinStartIndex = 0; joinStartIndex < pathComponents.length && joinStartIndex < directoryComponents.length; joinStartIndex++) {
            if (getCanonicalFileName(directoryComponents[joinStartIndex]) !== getCanonicalFileName(pathComponents[joinStartIndex])) {
                break;
            }
        }

        // Get the relative path
        if (joinStartIndex) {
            var relativePath = "";
            var relativePathComponents = pathComponents.slice(joinStartIndex, pathComponents.length);
            for (; joinStartIndex < directoryComponents.length; joinStartIndex++) {
                if (directoryComponents[joinStartIndex] !== "") {
                    relativePath = relativePath + ".." + directorySeparator;
                }
            }

            return relativePath + relativePathComponents.join(directorySeparator);
        }

        // Cant find the relative path, get the absolute path
        var absolutePath = getNormalizedPathFromPathComponents(pathComponents);
        if (isAbsolutePathAnUrl && isRootedDiskPath(absolutePath)) {
            absolutePath = "file:///" + absolutePath;
        }

        return absolutePath;
    }

    export function getBaseFilename(path: string) {
        var i = path.lastIndexOf(directorySeparator);
        return i < 0 ? path : path.substring(i + 1);
    }

    export function combinePaths(path1: string, path2: string) {
        if (!(path1 && path1.length)) return path2;
        if (!(path2 && path2.length)) return path1;
        if (path2.charAt(0) === directorySeparator) return path2;
        if (path1.charAt(path1.length - 1) === directorySeparator) return path1 + path2;
        return path1 + directorySeparator + path2;
    }

    export function fileExtensionIs(path: string, extension: string): boolean {
        var pathLen = path.length;
        var extLen = extension.length;
        return pathLen > extLen && path.substr(pathLen - extLen, extLen) === extension;
    }

    var supportedExtensions = [".d.ts", ".ts", ".js"];

    export function removeFileExtension(path: string): string {
        for (var i = 0; i < supportedExtensions.length; i++) {
            var ext = supportedExtensions[i];

            if (fileExtensionIs(path, ext)) {
                return path.substr(0, path.length - ext.length);
            }
        }

        return path;
    }

    var escapedCharsRegExp = /[\t\v\f\b\0\r\n\"\\\u2028\u2029\u0085]/g;
    var escapedCharsMap: Map<string> = {
        "\t": "\\t",
        "\v": "\\v",
        "\f": "\\f",
        "\b": "\\b",
        "\0": "\\0",
        "\r": "\\r",
        "\n": "\\n",
        "\"": "\\\"",
        "\u2028": "\\u2028", // lineSeparator
        "\u2029": "\\u2029", // paragraphSeparator
        "\u0085": "\\u0085"  // nextLine
    };

    /** NOTE: This *does not* support the full escape characters, it only supports the subset that can be used in file names
      * or string literals. If the information encoded in the map changes, this needs to be revisited. */
    export function escapeString(s: string): string {
        return escapedCharsRegExp.test(s) ? s.replace(escapedCharsRegExp, c => {
            return escapedCharsMap[c] || c;
        }) : s;
    }

    export interface ObjectAllocator {
        getNodeConstructor(kind: SyntaxKind): new () => Node;
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

    export var objectAllocator: ObjectAllocator = {
        getNodeConstructor: kind => {
            function Node() {
            }
            Node.prototype = {
                kind: kind,
                pos: 0,
                end: 0,
                flags: 0,
                parent: undefined,
            };
            return <any>Node;
        },
        getSymbolConstructor: () => <any>Symbol,
        getTypeConstructor: () => <any>Type,
        getSignatureConstructor: () => <any>Signature
    }

    export const enum AssertionLevel {
        None = 0,
        Normal = 1,
        Aggressive = 2,
        VeryAggressive = 3,
    }

    export module Debug {
        var currentAssertionLevel = AssertionLevel.None;

        export function shouldAssert(level: AssertionLevel): boolean {
            return currentAssertionLevel >= level;
        }

        export function assert(expression: boolean, message?: string, verboseDebugInfo?: () => string): void {
            if (!expression) {
                var verboseDebugString = "";
                if (verboseDebugInfo) {
                    verboseDebugString = "\r\nVerbose Debug Information: " + verboseDebugInfo();
                }

                throw new Error("Debug Failure. False expression: " + (message || "") + verboseDebugString);
            }
        }

        export function fail(message?: string): void {
            Debug.assert(false, message);
        }
    }
}
