import {
    CharacterCodes,
    compareStringsCaseInsensitive,
    compareStringsCaseSensitive,
    compareValues,
    Comparison,
    Debug,
    endsWith,
    equateStringsCaseInsensitive,
    equateStringsCaseSensitive,
    GetCanonicalFileName,
    getDeclarationFileExtension,
    getStringComparer,
    identity,
    lastOrUndefined,
    Path,
    some,
    startsWith,
} from "./_namespaces/ts.js";

/**
 * Internally, we represent paths as strings with '/' as the directory separator.
 * When we make system calls (eg: LanguageServiceHost.getDirectory()),
 * we expect the host to correctly handle paths in our specified format.
 *
 * @internal
 */
export const directorySeparator = "/";
/** @internal */
export const altDirectorySeparator = "\\";
const urlSchemeSeparator = "://";
const backslashRegExp = /\\/g;

//// Path Tests

/**
 * Determines whether a charCode corresponds to `/` or `\`.
 *
 * @internal
 */
export function isAnyDirectorySeparator(charCode: number): boolean {
    return charCode === CharacterCodes.slash || charCode === CharacterCodes.backslash;
}

/**
 * Determines whether a path starts with a URL scheme (e.g. starts with `http://`, `ftp://`, `file://`, etc.).
 *
 * @internal
 */
export function isUrl(path: string): boolean {
    return getEncodedRootLength(path) < 0;
}

/**
 * Determines whether a path is an absolute disk path (e.g. starts with `/`, or a dos path
 * like `c:`, `c:\` or `c:/`).
 *
 * @internal
 */
export function isRootedDiskPath(path: string): boolean {
    return getEncodedRootLength(path) > 0;
}

/**
 * Determines whether a path consists only of a path root.
 *
 * @internal
 */
export function isDiskPathRoot(path: string): boolean {
    const rootLength = getEncodedRootLength(path);
    return rootLength > 0 && rootLength === path.length;
}

/**
 * Determines whether a path starts with an absolute path component (i.e. `/`, `c:/`, `file://`, etc.).
 *
 * ```ts
 * // POSIX
 * pathIsAbsolute("/path/to/file.ext") === true
 * // DOS
 * pathIsAbsolute("c:/path/to/file.ext") === true
 * // URL
 * pathIsAbsolute("file:///path/to/file.ext") === true
 * // Non-absolute
 * pathIsAbsolute("path/to/file.ext") === false
 * pathIsAbsolute("./path/to/file.ext") === false
 * ```
 *
 * @internal
 */
export function pathIsAbsolute(path: string): boolean {
    return getEncodedRootLength(path) !== 0;
}

/**
 * Determines whether a path starts with a relative path component (i.e. `.` or `..`).
 *
 * @internal
 */
export function pathIsRelative(path: string): boolean {
    return /^\.\.?(?:$|[\\/])/.test(path);
}

/**
 * Determines whether a path is neither relative nor absolute, e.g. "path/to/file".
 * Also known misleadingly as "non-relative".
 *
 * @internal
 */
export function pathIsBareSpecifier(path: string): boolean {
    return !pathIsAbsolute(path) && !pathIsRelative(path);
}

/** @internal */
export function hasExtension(fileName: string): boolean {
    return getBaseFileName(fileName).includes(".");
}

/** @internal */
export function fileExtensionIs(path: string, extension: string): boolean {
    return path.length > extension.length && endsWith(path, extension);
}

/** @internal */
export function fileExtensionIsOneOf(path: string, extensions: readonly string[]): boolean {
    for (const extension of extensions) {
        if (fileExtensionIs(path, extension)) {
            return true;
        }
    }

    return false;
}

/**
 * Determines whether a path has a trailing separator (`/` or `\\`).
 *
 * @internal
 */
export function hasTrailingDirectorySeparator(path: string): boolean {
    return path.length > 0 && isAnyDirectorySeparator(path.charCodeAt(path.length - 1));
}

//// Path Parsing

function isVolumeCharacter(charCode: number) {
    return (charCode >= CharacterCodes.a && charCode <= CharacterCodes.z) ||
        (charCode >= CharacterCodes.A && charCode <= CharacterCodes.Z);
}

function getFileUrlVolumeSeparatorEnd(url: string, start: number) {
    const ch0 = url.charCodeAt(start);
    if (ch0 === CharacterCodes.colon) return start + 1;
    if (ch0 === CharacterCodes.percent && url.charCodeAt(start + 1) === CharacterCodes._3) {
        const ch2 = url.charCodeAt(start + 2);
        if (ch2 === CharacterCodes.a || ch2 === CharacterCodes.A) return start + 3;
    }
    return -1;
}

/**
 * Returns length of the root part of a path or URL (i.e. length of "/", "x:/", "//server/share/, file:///user/files").
 * If the root is part of a URL, the twos-complement of the root length is returned.
 */
function getEncodedRootLength(path: string): number {
    if (!path) return 0;
    const ch0 = path.charCodeAt(0);

    // POSIX or UNC
    if (ch0 === CharacterCodes.slash || ch0 === CharacterCodes.backslash) {
        if (path.charCodeAt(1) !== ch0) return 1; // POSIX: "/" (or non-normalized "\")

        const p1 = path.indexOf(ch0 === CharacterCodes.slash ? directorySeparator : altDirectorySeparator, 2);
        if (p1 < 0) return path.length; // UNC: "//server" or "\\server"

        return p1 + 1; // UNC: "//server/" or "\\server\"
    }

    // DOS
    if (isVolumeCharacter(ch0) && path.charCodeAt(1) === CharacterCodes.colon) {
        const ch2 = path.charCodeAt(2);
        if (ch2 === CharacterCodes.slash || ch2 === CharacterCodes.backslash) return 3; // DOS: "c:/" or "c:\"
        if (path.length === 2) return 2; // DOS: "c:" (but not "c:d")
    }

    // URL
    const schemeEnd = path.indexOf(urlSchemeSeparator);
    if (schemeEnd !== -1) {
        const authorityStart = schemeEnd + urlSchemeSeparator.length;
        const authorityEnd = path.indexOf(directorySeparator, authorityStart);
        if (authorityEnd !== -1) { // URL: "file:///", "file://server/", "file://server/path"
            // For local "file" URLs, include the leading DOS volume (if present).
            // Per https://www.ietf.org/rfc/rfc1738.txt, a host of "" or "localhost" is a
            // special case interpreted as "the machine from which the URL is being interpreted".
            const scheme = path.slice(0, schemeEnd);
            const authority = path.slice(authorityStart, authorityEnd);
            if (
                scheme === "file" && (authority === "" || authority === "localhost") &&
                isVolumeCharacter(path.charCodeAt(authorityEnd + 1))
            ) {
                const volumeSeparatorEnd = getFileUrlVolumeSeparatorEnd(path, authorityEnd + 2);
                if (volumeSeparatorEnd !== -1) {
                    if (path.charCodeAt(volumeSeparatorEnd) === CharacterCodes.slash) {
                        // URL: "file:///c:/", "file://localhost/c:/", "file:///c%3a/", "file://localhost/c%3a/"
                        return ~(volumeSeparatorEnd + 1);
                    }
                    if (volumeSeparatorEnd === path.length) {
                        // URL: "file:///c:", "file://localhost/c:", "file:///c$3a", "file://localhost/c%3a"
                        // but not "file:///c:d" or "file:///c%3ad"
                        return ~volumeSeparatorEnd;
                    }
                }
            }
            return ~(authorityEnd + 1); // URL: "file://server/", "http://server/"
        }
        return ~path.length; // URL: "file://server", "http://server"
    }

    // relative
    return 0;
}

/**
 * Returns length of the root part of a path or URL (i.e. length of "/", "x:/", "//server/share/, file:///user/files").
 *
 * For example:
 * ```ts
 * getRootLength("a") === 0                   // ""
 * getRootLength("/") === 1                   // "/"
 * getRootLength("c:") === 2                  // "c:"
 * getRootLength("c:d") === 0                 // ""
 * getRootLength("c:/") === 3                 // "c:/"
 * getRootLength("c:\\") === 3                // "c:\\"
 * getRootLength("//server") === 7            // "//server"
 * getRootLength("//server/share") === 8      // "//server/"
 * getRootLength("\\\\server") === 7          // "\\\\server"
 * getRootLength("\\\\server\\share") === 8   // "\\\\server\\"
 * getRootLength("file:///path") === 8        // "file:///"
 * getRootLength("file:///c:") === 10         // "file:///c:"
 * getRootLength("file:///c:d") === 8         // "file:///"
 * getRootLength("file:///c:/path") === 11    // "file:///c:/"
 * getRootLength("file://server") === 13      // "file://server"
 * getRootLength("file://server/path") === 14 // "file://server/"
 * getRootLength("http://server") === 13      // "http://server"
 * getRootLength("http://server/path") === 14 // "http://server/"
 * ```
 *
 * @internal
 */
export function getRootLength(path: string): number {
    const rootLength = getEncodedRootLength(path);
    return rootLength < 0 ? ~rootLength : rootLength;
}

/**
 * Returns the path except for its basename. Semantics align with NodeJS's `path.dirname`
 * except that we support URLs as well.
 *
 * ```ts
 * // POSIX
 * getDirectoryPath("/path/to/file.ext") === "/path/to"
 * getDirectoryPath("/path/to/") === "/path"
 * getDirectoryPath("/") === "/"
 * // DOS
 * getDirectoryPath("c:/path/to/file.ext") === "c:/path/to"
 * getDirectoryPath("c:/path/to/") === "c:/path"
 * getDirectoryPath("c:/") === "c:/"
 * getDirectoryPath("c:") === "c:"
 * // URL
 * getDirectoryPath("http://typescriptlang.org/path/to/file.ext") === "http://typescriptlang.org/path/to"
 * getDirectoryPath("http://typescriptlang.org/path/to") === "http://typescriptlang.org/path"
 * getDirectoryPath("http://typescriptlang.org/") === "http://typescriptlang.org/"
 * getDirectoryPath("http://typescriptlang.org") === "http://typescriptlang.org"
 * ```
 *
 * @internal
 */
export function getDirectoryPath(path: Path): Path;
/**
 * Returns the path except for its basename. Semantics align with NodeJS's `path.dirname`
 * except that we support URLs as well.
 *
 * ```ts
 * // POSIX
 * getDirectoryPath("/path/to/file.ext") === "/path/to"
 * getDirectoryPath("/path/to/") === "/path"
 * getDirectoryPath("/") === "/"
 * // DOS
 * getDirectoryPath("c:/path/to/file.ext") === "c:/path/to"
 * getDirectoryPath("c:/path/to/") === "c:/path"
 * getDirectoryPath("c:/") === "c:/"
 * getDirectoryPath("c:") === "c:"
 * // URL
 * getDirectoryPath("http://typescriptlang.org/path/to/file.ext") === "http://typescriptlang.org/path/to"
 * getDirectoryPath("http://typescriptlang.org/path/to") === "http://typescriptlang.org/path"
 * getDirectoryPath("http://typescriptlang.org/") === "http://typescriptlang.org/"
 * getDirectoryPath("http://typescriptlang.org") === "http://typescriptlang.org"
 * getDirectoryPath("file://server/path/to/file.ext") === "file://server/path/to"
 * getDirectoryPath("file://server/path/to") === "file://server/path"
 * getDirectoryPath("file://server/") === "file://server/"
 * getDirectoryPath("file://server") === "file://server"
 * getDirectoryPath("file:///path/to/file.ext") === "file:///path/to"
 * getDirectoryPath("file:///path/to") === "file:///path"
 * getDirectoryPath("file:///") === "file:///"
 * getDirectoryPath("file://") === "file://"
 * ```
 *
 * @internal
 */
export function getDirectoryPath(path: string): string;
/** @internal */
export function getDirectoryPath(path: string): string {
    path = normalizeSlashes(path);

    // If the path provided is itself the root, then return it.
    const rootLength = getRootLength(path);
    if (rootLength === path.length) return path;

    // return the leading portion of the path up to the last (non-terminal) directory separator
    // but not including any trailing directory separator.
    path = removeTrailingDirectorySeparator(path);
    return path.slice(0, Math.max(rootLength, path.lastIndexOf(directorySeparator)));
}

/**
 * Returns the path except for its containing directory name.
 * Semantics align with NodeJS's `path.basename` except that we support URL's as well.
 *
 * ```ts
 * // POSIX
 * getBaseFileName("/path/to/file.ext") === "file.ext"
 * getBaseFileName("/path/to/") === "to"
 * getBaseFileName("/") === ""
 * // DOS
 * getBaseFileName("c:/path/to/file.ext") === "file.ext"
 * getBaseFileName("c:/path/to/") === "to"
 * getBaseFileName("c:/") === ""
 * getBaseFileName("c:") === ""
 * // URL
 * getBaseFileName("http://typescriptlang.org/path/to/file.ext") === "file.ext"
 * getBaseFileName("http://typescriptlang.org/path/to/") === "to"
 * getBaseFileName("http://typescriptlang.org/") === ""
 * getBaseFileName("http://typescriptlang.org") === ""
 * getBaseFileName("file://server/path/to/file.ext") === "file.ext"
 * getBaseFileName("file://server/path/to/") === "to"
 * getBaseFileName("file://server/") === ""
 * getBaseFileName("file://server") === ""
 * getBaseFileName("file:///path/to/file.ext") === "file.ext"
 * getBaseFileName("file:///path/to/") === "to"
 * getBaseFileName("file:///") === ""
 * getBaseFileName("file://") === ""
 * ```
 *
 * @internal
 */
export function getBaseFileName(path: string): string;
/**
 * Gets the portion of a path following the last (non-terminal) separator (`/`).
 * Semantics align with NodeJS's `path.basename` except that we support URL's as well.
 * If the base name has any one of the provided extensions, it is removed.
 *
 * ```ts
 * getBaseFileName("/path/to/file.ext", ".ext", true) === "file"
 * getBaseFileName("/path/to/file.js", ".ext", true) === "file.js"
 * getBaseFileName("/path/to/file.js", [".ext", ".js"], true) === "file"
 * getBaseFileName("/path/to/file.ext", ".EXT", false) === "file.ext"
 * ```
 *
 * @internal
 */
export function getBaseFileName(path: string, extensions: string | readonly string[], ignoreCase: boolean): string;
/** @internal */
export function getBaseFileName(path: string, extensions?: string | readonly string[], ignoreCase?: boolean) {
    path = normalizeSlashes(path);

    // if the path provided is itself the root, then it has not file name.
    const rootLength = getRootLength(path);
    if (rootLength === path.length) return "";

    // return the trailing portion of the path starting after the last (non-terminal) directory
    // separator but not including any trailing directory separator.
    path = removeTrailingDirectorySeparator(path);
    const name = path.slice(Math.max(getRootLength(path), path.lastIndexOf(directorySeparator) + 1));
    const extension = extensions !== undefined && ignoreCase !== undefined ? getAnyExtensionFromPath(name, extensions, ignoreCase) : undefined;
    return extension ? name.slice(0, name.length - extension.length) : name;
}

function tryGetExtensionFromPath(path: string, extension: string, stringEqualityComparer: (a: string, b: string) => boolean) {
    if (!startsWith(extension, ".")) extension = "." + extension;
    if (path.length >= extension.length && path.charCodeAt(path.length - extension.length) === CharacterCodes.dot) {
        const pathExtension = path.slice(path.length - extension.length);
        if (stringEqualityComparer(pathExtension, extension)) {
            return pathExtension;
        }
    }
}

function getAnyExtensionFromPathWorker(path: string, extensions: string | readonly string[], stringEqualityComparer: (a: string, b: string) => boolean) {
    if (typeof extensions === "string") {
        return tryGetExtensionFromPath(path, extensions, stringEqualityComparer) || "";
    }
    for (const extension of extensions) {
        const result = tryGetExtensionFromPath(path, extension, stringEqualityComparer);
        if (result) return result;
    }
    return "";
}

/**
 * Gets the file extension for a path.
 *
 * ```ts
 * getAnyExtensionFromPath("/path/to/file.ext") === ".ext"
 * getAnyExtensionFromPath("/path/to/file.ext/") === ".ext"
 * getAnyExtensionFromPath("/path/to/file") === ""
 * getAnyExtensionFromPath("/path/to.ext/file") === ""
 * ```
 *
 * @internal
 */
export function getAnyExtensionFromPath(path: string): string;
/**
 * Gets the file extension for a path, provided it is one of the provided extensions.
 *
 * ```ts
 * getAnyExtensionFromPath("/path/to/file.ext", ".ext", true) === ".ext"
 * getAnyExtensionFromPath("/path/to/file.js", ".ext", true) === ""
 * getAnyExtensionFromPath("/path/to/file.js", [".ext", ".js"], true) === ".js"
 * getAnyExtensionFromPath("/path/to/file.ext", ".EXT", false) === ""
 *
 * @internal
 */
export function getAnyExtensionFromPath(path: string, extensions: string | readonly string[], ignoreCase: boolean): string;
/** @internal */
export function getAnyExtensionFromPath(path: string, extensions?: string | readonly string[], ignoreCase?: boolean): string {
    // Retrieves any string from the final "." onwards from a base file name.
    // Unlike extensionFromPath, which throws an exception on unrecognized extensions.
    if (extensions) {
        return getAnyExtensionFromPathWorker(removeTrailingDirectorySeparator(path), extensions, ignoreCase ? equateStringsCaseInsensitive : equateStringsCaseSensitive);
    }
    const baseFileName = getBaseFileName(path);
    const extensionIndex = baseFileName.lastIndexOf(".");
    if (extensionIndex >= 0) {
        return baseFileName.substring(extensionIndex);
    }
    return "";
}

function pathComponents(path: string, rootLength: number) {
    const root = path.substring(0, rootLength);
    const rest = path.substring(rootLength).split(directorySeparator);
    if (rest.length && !lastOrUndefined(rest)) rest.pop();
    return [root, ...rest];
}

/** @internal */
export type PathPathComponents = Path[] & { __pathComponensBrand: any; };

/**
 * Parse a path into an array containing a root component (at index 0) and zero or more path
 * components (at indices > 0). The result is not normalized.
 * If the path is relative, the root component is `""`.
 * If the path is absolute, the root component includes the first path separator (`/`).
 *
 * ```ts
 * // POSIX
 * getPathComponents("/path/to/file.ext") === ["/", "path", "to", "file.ext"]
 * getPathComponents("/path/to/") === ["/", "path", "to"]
 * getPathComponents("/") === ["/"]
 * // DOS
 * getPathComponents("c:/path/to/file.ext") === ["c:/", "path", "to", "file.ext"]
 * getPathComponents("c:/path/to/") === ["c:/", "path", "to"]
 * getPathComponents("c:/") === ["c:/"]
 * getPathComponents("c:") === ["c:"]
 * // URL
 * getPathComponents("http://typescriptlang.org/path/to/file.ext") === ["http://typescriptlang.org/", "path", "to", "file.ext"]
 * getPathComponents("http://typescriptlang.org/path/to/") === ["http://typescriptlang.org/", "path", "to"]
 * getPathComponents("http://typescriptlang.org/") === ["http://typescriptlang.org/"]
 * getPathComponents("http://typescriptlang.org") === ["http://typescriptlang.org"]
 * getPathComponents("file://server/path/to/file.ext") === ["file://server/", "path", "to", "file.ext"]
 * getPathComponents("file://server/path/to/") === ["file://server/", "path", "to"]
 * getPathComponents("file://server/") === ["file://server/"]
 * getPathComponents("file://server") === ["file://server"]
 * getPathComponents("file:///path/to/file.ext") === ["file:///", "path", "to", "file.ext"]
 * getPathComponents("file:///path/to/") === ["file:///", "path", "to"]
 * getPathComponents("file:///") === ["file:///"]
 * getPathComponents("file://") === ["file://"]
 * ```
 *
 * @internal
 */
export function getPathComponents(path: Path): PathPathComponents;
/** @internal */
export function getPathComponents(path: string, currentDirectory?: string): string[];
export function getPathComponents(path: string, currentDirectory = "") {
    path = combinePaths(currentDirectory, path);
    return pathComponents(path, getRootLength(path));
}

//// Path Formatting

/**
 * Formats a parsed path consisting of a root component (at index 0) and zero or more path
 * segments (at indices > 0).
 *
 * ```ts
 * getPathFromPathComponents(["/", "path", "to", "file.ext"]) === "/path/to/file.ext"
 * ```
 *
 * @internal
 */
export function getPathFromPathComponents<T extends string>(pathComponents: readonly T[], length?: number): T {
    if (pathComponents.length === 0) return "" as T;

    const root = pathComponents[0] && ensureTrailingDirectorySeparator(pathComponents[0]);
    return root + pathComponents.slice(1, length).join(directorySeparator) as T;
}

//// Path Normalization

/**
 * Normalize path separators, converting `\` into `/`.
 *
 * @internal
 */
export function normalizeSlashes(path: string): string {
    return path.includes("\\")
        ? path.replace(backslashRegExp, directorySeparator)
        : path;
}

/**
 * Reduce an array of path components to a more simplified path by navigating any
 * `"."` or `".."` entries in the path.
 *
 * @internal
 */
export function reducePathComponents(components: readonly string[]): string[] {
    if (!some(components)) return [];
    const reduced = [components[0]];
    for (let i = 1; i < components.length; i++) {
        const component = components[i];
        if (!component) continue;
        if (component === ".") continue;
        if (component === "..") {
            if (reduced.length > 1) {
                if (reduced[reduced.length - 1] !== "..") {
                    reduced.pop();
                    continue;
                }
            }
            else if (reduced[0]) continue;
        }
        reduced.push(component);
    }
    return reduced;
}

/**
 * Combines paths. If a path is absolute, it replaces any previous path. Relative paths are not simplified.
 *
 * ```ts
 * // Non-rooted
 * combinePaths("path", "to", "file.ext") === "path/to/file.ext"
 * combinePaths("path", "dir", "..", "to", "file.ext") === "path/dir/../to/file.ext"
 * // POSIX
 * combinePaths("/path", "to", "file.ext") === "/path/to/file.ext"
 * combinePaths("/path", "/to", "file.ext") === "/to/file.ext"
 * // DOS
 * combinePaths("c:/path", "to", "file.ext") === "c:/path/to/file.ext"
 * combinePaths("c:/path", "c:/to", "file.ext") === "c:/to/file.ext"
 * // URL
 * combinePaths("file:///path", "to", "file.ext") === "file:///path/to/file.ext"
 * combinePaths("file:///path", "file:///to", "file.ext") === "file:///to/file.ext"
 * ```
 *
 * @internal
 */
export function combinePaths(path: string, ...paths: (string | undefined)[]): string {
    if (path) path = normalizeSlashes(path);
    for (let relativePath of paths) {
        if (!relativePath) continue;
        relativePath = normalizeSlashes(relativePath);
        if (!path || getRootLength(relativePath) !== 0) {
            path = relativePath;
        }
        else {
            path = ensureTrailingDirectorySeparator(path) + relativePath;
        }
    }
    return path;
}

/**
 * Combines and resolves paths. If a path is absolute, it replaces any previous path. Any
 * `.` and `..` path components are resolved. Trailing directory separators are preserved.
 *
 * ```ts
 * resolvePath("/path", "to", "file.ext") === "path/to/file.ext"
 * resolvePath("/path", "to", "file.ext/") === "path/to/file.ext/"
 * resolvePath("/path", "dir", "..", "to", "file.ext") === "path/to/file.ext"
 * ```
 *
 * @internal
 */
export function resolvePath(path: string, ...paths: (string | undefined)[]): string {
    return normalizePath(some(paths) ? combinePaths(path, ...paths) : normalizeSlashes(path));
}

/**
 * Parse a path into an array containing a root component (at index 0) and zero or more path
 * components (at indices > 0). The result is normalized.
 * If the path is relative, the root component is `""`.
 * If the path is absolute, the root component includes the first path separator (`/`).
 *
 * ```ts
 * getNormalizedPathComponents("to/dir/../file.ext", "/path/") === ["/", "path", "to", "file.ext"]
 * ```
 *
 * @internal
 */
export function getNormalizedPathComponents(path: string, currentDirectory: string | undefined): string[] {
    return reducePathComponents(getPathComponents(path, currentDirectory));
}

/** @internal */
export function getNormalizedAbsolutePath(path: string, currentDirectory: string | undefined): string {
    let rootLength = getRootLength(path);
    if (rootLength === 0 && currentDirectory) {
        path = combinePaths(currentDirectory, path);
        rootLength = getRootLength(path);
    }
    else {
        // combinePaths normalizes slashes, so not necessary in the other branch
        path = normalizeSlashes(path);
    }

    const simpleNormalized = simpleNormalizePath(path);
    if (simpleNormalized !== undefined) {
        return simpleNormalized.length > rootLength ? removeTrailingDirectorySeparator(simpleNormalized) : simpleNormalized;
    }

    const length = path.length;
    const root = path.substring(0, rootLength);
    // `normalized` is only initialized once `path` is determined to be non-normalized
    let normalized;
    let index = rootLength;
    let segmentStart = index;
    let normalizedUpTo = index;
    let seenNonDotDotSegment = rootLength !== 0;
    while (index < length) {
        // At beginning of segment
        segmentStart = index;
        let ch = path.charCodeAt(index);
        while (ch === CharacterCodes.slash && index + 1 < length) {
            index++;
            ch = path.charCodeAt(index);
        }
        if (index > segmentStart) {
            // Seen superfluous separator
            normalized ??= path.substring(0, segmentStart - 1);
            segmentStart = index;
        }
        // Past any superfluous separators
        let segmentEnd = path.indexOf(directorySeparator, index + 1);
        if (segmentEnd === -1) {
            segmentEnd = length;
        }
        const segmentLength = segmentEnd - segmentStart;
        if (segmentLength === 1 && path.charCodeAt(index) === CharacterCodes.dot) {
            // "." segment (skip)
            normalized ??= path.substring(0, normalizedUpTo);
        }
        else if (segmentLength === 2 && path.charCodeAt(index) === CharacterCodes.dot && path.charCodeAt(index + 1) === CharacterCodes.dot) {
            // ".." segment
            if (!seenNonDotDotSegment) {
                if (normalized !== undefined) {
                    normalized += normalized.length === rootLength ? ".." : "/..";
                }
                else {
                    normalizedUpTo = index + 2;
                }
            }
            else if (normalized === undefined) {
                if (normalizedUpTo - 2 >= 0) {
                    normalized = path.substring(0, Math.max(rootLength, path.lastIndexOf(directorySeparator, normalizedUpTo - 2)));
                }
                else {
                    normalized = path.substring(0, normalizedUpTo);
                }
            }
            else {
                const lastSlash = normalized.lastIndexOf(directorySeparator);
                if (lastSlash !== -1) {
                    normalized = normalized.substring(0, Math.max(rootLength, lastSlash));
                }
                else {
                    normalized = root;
                }
                if (normalized.length === rootLength) {
                    seenNonDotDotSegment = rootLength !== 0;
                }
            }
        }
        else if (normalized !== undefined) {
            if (normalized.length !== rootLength) {
                normalized += directorySeparator;
            }
            seenNonDotDotSegment = true;
            normalized += path.substring(segmentStart, segmentEnd);
        }
        else {
            seenNonDotDotSegment = true;
            normalizedUpTo = segmentEnd;
        }
        index = segmentEnd + 1;
    }
    return normalized ?? (length > rootLength ? removeTrailingDirectorySeparator(path) : path);
}

/** @internal */
export function normalizePath(path: string): string {
    path = normalizeSlashes(path);
    let normalized = simpleNormalizePath(path);
    if (normalized !== undefined) {
        return normalized;
    }
    normalized = getNormalizedAbsolutePath(path, "");
    return normalized && hasTrailingDirectorySeparator(path) ? ensureTrailingDirectorySeparator(normalized) : normalized;
}

function simpleNormalizePath(path: string): string | undefined {
    // Most paths don't require normalization
    if (!relativePathSegmentRegExp.test(path)) {
        return path;
    }
    // Some paths only require cleanup of `/./` or leading `./`
    let simplified = path.replace(/\/\.\//g, "/");
    if (simplified.startsWith("./")) {
        simplified = simplified.slice(2);
    }
    if (simplified !== path) {
        path = simplified;
        if (!relativePathSegmentRegExp.test(path)) {
            return path;
        }
    }
    return undefined;
}

function getPathWithoutRoot(pathComponents: readonly string[]) {
    if (pathComponents.length === 0) return "";
    return pathComponents.slice(1).join(directorySeparator);
}

/** @internal */
export function getNormalizedAbsolutePathWithoutRoot(fileName: string, currentDirectory: string | undefined): string {
    return getPathWithoutRoot(getNormalizedPathComponents(fileName, currentDirectory));
}

/** @internal */
export function toPath(fileName: string, basePath: string | undefined, getCanonicalFileName: (path: string) => string): Path {
    const nonCanonicalizedPath = isRootedDiskPath(fileName)
        ? normalizePath(fileName)
        : getNormalizedAbsolutePath(fileName, basePath);
    return getCanonicalFileName(nonCanonicalizedPath) as Path;
}

//// Path Mutation

/**
 * Removes a trailing directory separator from a path, if it does not already have one.
 *
 * ```ts
 * removeTrailingDirectorySeparator("/path/to/file.ext") === "/path/to/file.ext"
 * removeTrailingDirectorySeparator("/path/to/file.ext/") === "/path/to/file.ext"
 * ```
 *
 * @internal
 */
export function removeTrailingDirectorySeparator(path: Path): Path;
/** @internal */
export function removeTrailingDirectorySeparator(path: string): string;
/** @internal */
export function removeTrailingDirectorySeparator(path: string) {
    if (hasTrailingDirectorySeparator(path)) {
        return path.substr(0, path.length - 1);
    }

    return path;
}

/**
 * Adds a trailing directory separator to a path, if it does not already have one.
 *
 * ```ts
 * ensureTrailingDirectorySeparator("/path/to/file.ext") === "/path/to/file.ext/"
 * ensureTrailingDirectorySeparator("/path/to/file.ext/") === "/path/to/file.ext/"
 * ```
 *
 * @internal
 */
export function ensureTrailingDirectorySeparator(path: Path): Path;
/** @internal */
export function ensureTrailingDirectorySeparator(path: string): string;
/** @internal */
export function ensureTrailingDirectorySeparator(path: string) {
    if (!hasTrailingDirectorySeparator(path)) {
        return path + directorySeparator;
    }

    return path;
}

/**
 * Ensures a path is either absolute (prefixed with `/` or `c:`) or dot-relative (prefixed
 * with `./` or `../`) so as not to be confused with an unprefixed module name.
 *
 * ```ts
 * ensurePathIsNonModuleName("/path/to/file.ext") === "/path/to/file.ext"
 * ensurePathIsNonModuleName("./path/to/file.ext") === "./path/to/file.ext"
 * ensurePathIsNonModuleName("../path/to/file.ext") === "../path/to/file.ext"
 * ensurePathIsNonModuleName("path/to/file.ext") === "./path/to/file.ext"
 * ```
 *
 * @internal
 */
export function ensurePathIsNonModuleName(path: string): string {
    return !pathIsAbsolute(path) && !pathIsRelative(path) ? "./" + path : path;
}

/**
 * Changes the extension of a path to the provided extension.
 *
 * ```ts
 * changeAnyExtension("/path/to/file.ext", ".js") === "/path/to/file.js"
 * ```
 *
 * @internal
 */
export function changeAnyExtension(path: string, ext: string): string;
/**
 * Changes the extension of a path to the provided extension if it has one of the provided extensions.
 *
 * ```ts
 * changeAnyExtension("/path/to/file.ext", ".js", ".ext") === "/path/to/file.js"
 * changeAnyExtension("/path/to/file.ext", ".js", ".ts") === "/path/to/file.ext"
 * changeAnyExtension("/path/to/file.ext", ".js", [".ext", ".ts"]) === "/path/to/file.js"
 * ```
 *
 * @internal
 */
export function changeAnyExtension(path: string, ext: string, extensions: string | readonly string[], ignoreCase: boolean): string;
/** @internal */
export function changeAnyExtension(path: string, ext: string, extensions?: string | readonly string[], ignoreCase?: boolean) {
    const pathext = extensions !== undefined && ignoreCase !== undefined ? getAnyExtensionFromPath(path, extensions, ignoreCase) : getAnyExtensionFromPath(path);
    return pathext ? path.slice(0, path.length - pathext.length) + (startsWith(ext, ".") ? ext : "." + ext) : path;
}

/**
 * @internal
 * Like `changeAnyExtension`, but declaration file extensions are recognized
 * and replaced starting from the `.d`.
 *
 * ```ts
 * changeAnyExtension("file.d.ts", ".js") === "file.d.js"
 * changeFullExtension("file.d.ts", ".js") === "file.js"
 * ```
 */
export function changeFullExtension(path: string, newExtension: string): string {
    const declarationExtension = getDeclarationFileExtension(path);
    if (declarationExtension) {
        return path.slice(0, path.length - declarationExtension.length) +
            (startsWith(newExtension, ".") ? newExtension : ("." + newExtension));
    }
    return changeAnyExtension(path, newExtension);
}

//// Path Comparisons

// check path for these segments: '', '.'. '..'
const relativePathSegmentRegExp = /\/\/|(?:^|\/)\.\.?(?:$|\/)/;

function comparePathsWorker(a: string, b: string, componentComparer: (a: string, b: string) => Comparison) {
    if (a === b) return Comparison.EqualTo;
    if (a === undefined) return Comparison.LessThan;
    if (b === undefined) return Comparison.GreaterThan;

    // NOTE: Performance optimization - shortcut if the root segments differ as there would be no
    //       need to perform path reduction.
    const aRoot = a.substring(0, getRootLength(a));
    const bRoot = b.substring(0, getRootLength(b));
    const result = compareStringsCaseInsensitive(aRoot, bRoot);
    if (result !== Comparison.EqualTo) {
        return result;
    }

    // NOTE: Performance optimization - shortcut if there are no relative path segments in
    //       the non-root portion of the path
    const aRest = a.substring(aRoot.length);
    const bRest = b.substring(bRoot.length);
    if (!relativePathSegmentRegExp.test(aRest) && !relativePathSegmentRegExp.test(bRest)) {
        return componentComparer(aRest, bRest);
    }

    // The path contains a relative path segment. Normalize the paths and perform a slower component
    // by component comparison.
    const aComponents = reducePathComponents(getPathComponents(a));
    const bComponents = reducePathComponents(getPathComponents(b));
    const sharedLength = Math.min(aComponents.length, bComponents.length);
    for (let i = 1; i < sharedLength; i++) {
        const result = componentComparer(aComponents[i], bComponents[i]);
        if (result !== Comparison.EqualTo) {
            return result;
        }
    }
    return compareValues(aComponents.length, bComponents.length);
}

/**
 * Performs a case-sensitive comparison of two paths. Path roots are always compared case-insensitively.
 *
 * @internal
 */
export function comparePathsCaseSensitive(a: string, b: string): Comparison {
    return comparePathsWorker(a, b, compareStringsCaseSensitive);
}

/**
 * Performs a case-insensitive comparison of two paths.
 *
 * @internal
 */
export function comparePathsCaseInsensitive(a: string, b: string): Comparison {
    return comparePathsWorker(a, b, compareStringsCaseInsensitive);
}

/**
 * Compare two paths using the provided case sensitivity.
 *
 * @internal
 */
export function comparePaths(a: string, b: string, ignoreCase?: boolean): Comparison;
/** @internal */
export function comparePaths(a: string, b: string, currentDirectory: string, ignoreCase?: boolean): Comparison;
/** @internal */
export function comparePaths(a: string, b: string, currentDirectory?: string | boolean, ignoreCase?: boolean) {
    if (typeof currentDirectory === "string") {
        a = combinePaths(currentDirectory, a);
        b = combinePaths(currentDirectory, b);
    }
    else if (typeof currentDirectory === "boolean") {
        ignoreCase = currentDirectory;
    }
    return comparePathsWorker(a, b, getStringComparer(ignoreCase));
}

/**
 * Determines whether a `parent` path contains a `child` path using the provide case sensitivity.
 *
 * @internal
 */
export function containsPath(parent: string, child: string, ignoreCase?: boolean): boolean;
/** @internal */
export function containsPath(parent: string, child: string, currentDirectory: string, ignoreCase?: boolean): boolean;
/** @internal */
export function containsPath(parent: string, child: string, currentDirectory?: string | boolean, ignoreCase?: boolean) {
    if (typeof currentDirectory === "string") {
        parent = combinePaths(currentDirectory, parent);
        child = combinePaths(currentDirectory, child);
    }
    else if (typeof currentDirectory === "boolean") {
        ignoreCase = currentDirectory;
    }
    if (parent === undefined || child === undefined) return false;
    if (parent === child) return true;
    const parentComponents = reducePathComponents(getPathComponents(parent));
    const childComponents = reducePathComponents(getPathComponents(child));
    if (childComponents.length < parentComponents.length) {
        return false;
    }

    const componentEqualityComparer = ignoreCase ? equateStringsCaseInsensitive : equateStringsCaseSensitive;
    for (let i = 0; i < parentComponents.length; i++) {
        const equalityComparer = i === 0 ? equateStringsCaseInsensitive : componentEqualityComparer;
        if (!equalityComparer(parentComponents[i], childComponents[i])) {
            return false;
        }
    }

    return true;
}

/**
 * Determines whether `fileName` starts with the specified `directoryName` using the provided path canonicalization callback.
 * Comparison is case-sensitive between the canonical paths.
 *
 * Use `containsPath` if file names are not already reduced and absolute.
 *
 * @internal
 */
export function startsWithDirectory(fileName: string, directoryName: string, getCanonicalFileName: GetCanonicalFileName): boolean {
    const canonicalFileName = getCanonicalFileName(fileName);
    const canonicalDirectoryName = getCanonicalFileName(directoryName);
    return startsWith(canonicalFileName, canonicalDirectoryName + "/") || startsWith(canonicalFileName, canonicalDirectoryName + "\\");
}

//// Relative Paths

function getPathComponentsRelativeTo(from: string, to: string, stringEqualityComparer: (a: string, b: string) => boolean, getCanonicalFileName: GetCanonicalFileName) {
    const fromComponents = reducePathComponents(getPathComponents(from));
    const toComponents = reducePathComponents(getPathComponents(to));

    let start: number;
    for (start = 0; start < fromComponents.length && start < toComponents.length; start++) {
        const fromComponent = getCanonicalFileName(fromComponents[start]);
        const toComponent = getCanonicalFileName(toComponents[start]);
        const comparer = start === 0 ? equateStringsCaseInsensitive : stringEqualityComparer;
        if (!comparer(fromComponent, toComponent)) break;
    }

    if (start === 0) {
        return toComponents;
    }

    const components = toComponents.slice(start);
    const relative: string[] = [];
    for (; start < fromComponents.length; start++) {
        relative.push("..");
    }
    return ["", ...relative, ...components];
}

/**
 * Gets a relative path that can be used to traverse between `from` and `to`.
 *
 * @internal
 */
export function getRelativePathFromDirectory(from: string, to: string, ignoreCase: boolean): string;
/**
 * Gets a relative path that can be used to traverse between `from` and `to`.
 *
 * @internal
 */
export function getRelativePathFromDirectory(fromDirectory: string, to: string, getCanonicalFileName: GetCanonicalFileName): string; // eslint-disable-line @typescript-eslint/unified-signatures
/** @internal */
export function getRelativePathFromDirectory(fromDirectory: string, to: string, getCanonicalFileNameOrIgnoreCase: GetCanonicalFileName | boolean) {
    Debug.assert((getRootLength(fromDirectory) > 0) === (getRootLength(to) > 0), "Paths must either both be absolute or both be relative");
    const getCanonicalFileName = typeof getCanonicalFileNameOrIgnoreCase === "function" ? getCanonicalFileNameOrIgnoreCase : identity;
    const ignoreCase = typeof getCanonicalFileNameOrIgnoreCase === "boolean" ? getCanonicalFileNameOrIgnoreCase : false;
    const pathComponents = getPathComponentsRelativeTo(fromDirectory, to, ignoreCase ? equateStringsCaseInsensitive : equateStringsCaseSensitive, getCanonicalFileName);
    return getPathFromPathComponents(pathComponents);
}

/** @internal */
export function convertToRelativePath(absoluteOrRelativePath: string, basePath: string, getCanonicalFileName: (path: string) => string): string {
    return !isRootedDiskPath(absoluteOrRelativePath)
        ? absoluteOrRelativePath
        : getRelativePathToDirectoryOrUrl(basePath, absoluteOrRelativePath, basePath, getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
}

/** @internal */
export function getRelativePathFromFile(from: string, to: string, getCanonicalFileName: GetCanonicalFileName): string {
    return ensurePathIsNonModuleName(getRelativePathFromDirectory(getDirectoryPath(from), to, getCanonicalFileName));
}

/** @internal */
export function getRelativePathToDirectoryOrUrl(directoryPathOrUrl: string, relativeOrAbsolutePath: string, currentDirectory: string, getCanonicalFileName: GetCanonicalFileName, isAbsolutePathAnUrl: boolean): string {
    const pathComponents = getPathComponentsRelativeTo(
        resolvePath(currentDirectory, directoryPathOrUrl),
        resolvePath(currentDirectory, relativeOrAbsolutePath),
        equateStringsCaseSensitive,
        getCanonicalFileName,
    );

    const firstComponent = pathComponents[0];
    if (isAbsolutePathAnUrl && isRootedDiskPath(firstComponent)) {
        const prefix = firstComponent.charAt(0) === directorySeparator ? "file://" : "file:///";
        pathComponents[0] = prefix + firstComponent;
    }

    return getPathFromPathComponents(pathComponents);
}

//// Path Traversal

/**
 * Calls `callback` on `directory` and every ancestor directory it has, returning the first defined result.
 *
 * @internal
 */
export function forEachAncestorDirectory<T>(directory: Path, callback: (directory: Path) => T | undefined): T | undefined;
/** @internal */
export function forEachAncestorDirectory<T>(directory: string, callback: (directory: string) => T | undefined): T | undefined;
/** @internal */
export function forEachAncestorDirectory<T, P extends string>(directory: P, callback: (directory: P) => T | undefined): T | undefined {
    while (true) {
        const result = callback(directory);
        if (result !== undefined) {
            return result;
        }

        const parentPath = getDirectoryPath(directory) as P;
        if (parentPath === directory) {
            return undefined;
        }

        directory = parentPath;
    }
}

/** @internal */
export function isNodeModulesDirectory(dirPath: Path): boolean {
    return endsWith(dirPath, "/node_modules");
}
