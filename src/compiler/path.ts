/* @internal */
namespace ts {
    /**
     * Internally, we represent paths as strings with '/' as the directory separator.
     * When we make system calls (eg: LanguageServiceHost.getDirectory()),
     * we expect the host to correctly handle paths in our specified format.
     */
    export const directorySeparator = "/";
    const altDirectorySeparator = "\\";
    const urlSchemeSeparator = "://";
    const backslashRegExp = /\\/g;

    export function isAnyDirectorySeparator(charCode: number): boolean {
        return charCode === CharacterCodes.slash ||
            charCode === CharacterCodes.backslash;
    }

    /**
     * Normalize path separators.
     */
    export function normalizeSlashes(path: string): string {
        return path.replace(backslashRegExp, directorySeparator);
    }

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
                if (scheme === "file" && (authority === "" || authority === "localhost") &&
                    isVolumeCharacter(path.charCodeAt(authorityEnd + 1))) {
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
     */
    export function getRootLength(path: string) {
        const rootLength = getEncodedRootLength(path);
        return rootLength < 0 ? ~rootLength : rootLength;
    }

    /**
     * Returns the path except for its basename. Semantics align with NodeJS's `path.dirname`
     * except that we support URL's as well.
     *
     * ```ts
     * getDirectoryPath("/path/to/file.ext") === "/path/to"
     * getDirectoryPath("/path/to/") === "/path"
     * getDirectoryPath("/") === "/"
     * ```
     */
    export function getDirectoryPath(path: Path): Path;
    /**
     * Returns the path except for its basename. Semantics align with NodeJS's `path.dirname`
     * except that we support URL's as well.
     *
     * ```ts
     * getDirectoryPath("/path/to/file.ext") === "/path/to"
     * getDirectoryPath("/path/to/") === "/path"
     * getDirectoryPath("/") === "/"
     * ```
     */
    export function getDirectoryPath(path: string): string;
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

    export function startsWithDirectory(fileName: string, directoryName: string, getCanonicalFileName: GetCanonicalFileName): boolean {
        const canonicalFileName = getCanonicalFileName(fileName);
        const canonicalDirectoryName = getCanonicalFileName(directoryName);
        return startsWith(canonicalFileName, canonicalDirectoryName + directorySeparator) ||
            startsWith(canonicalFileName, canonicalDirectoryName + altDirectorySeparator);
    }

    export function isUrl(path: string) {
        return getEncodedRootLength(path) < 0;
    }

    export function pathIsRelative(path: string): boolean {
        return /^\.\.?($|[\\/])/.test(path);
    }

    /**
     * Determines whether a path is an absolute path (e.g. starts with `/`, or a dos path
     * like `c:`, `c:\` or `c:/`).
     */
    export function isRootedDiskPath(path: string) {
        return getEncodedRootLength(path) > 0;
    }

    /**
     * Determines whether a path consists only of a path root.
     */
    export function isDiskPathRoot(path: string) {
        const rootLength = getEncodedRootLength(path);
        return rootLength > 0 && rootLength === path.length;
    }

    export function convertToRelativePath(absoluteOrRelativePath: string, basePath: string, getCanonicalFileName: (path: string) => string): string {
        return !isRootedDiskPath(absoluteOrRelativePath)
            ? absoluteOrRelativePath
            : getRelativePathToDirectoryOrUrl(basePath, absoluteOrRelativePath, basePath, getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
    }

    export function getPathComponentsRelativeTo(from: string, to: string, stringEqualityComparer: (a: string, b: string) => boolean, getCanonicalFileName: GetCanonicalFileName) {
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

    export function getRelativePathFromFile(from: string, to: string, getCanonicalFileName: GetCanonicalFileName) {
        return ensurePathIsNonModuleName(getRelativePathFromDirectory(getDirectoryPath(from), to, getCanonicalFileName));
    }

    /**
     * Ensures a path is either absolute (prefixed with `/` or `c:`) or dot-relative (prefixed
     * with `./` or `../`) so as not to be confused with an unprefixed module name.
     */
    export function ensurePathIsNonModuleName(path: string): string {
        return getRootLength(path) === 0 && !pathIsRelative(path) ? "./" + path : path;
    }

    /**
     * Gets a relative path that can be used to traverse between `from` and `to`.
     */
    export function getRelativePathFromDirectory(from: string, to: string, ignoreCase: boolean): string;
    /**
     * Gets a relative path that can be used to traverse between `from` and `to`.
     */
    // tslint:disable-next-line:unified-signatures
    export function getRelativePathFromDirectory(fromDirectory: string, to: string, getCanonicalFileName: GetCanonicalFileName): string;
    export function getRelativePathFromDirectory(fromDirectory: string, to: string, getCanonicalFileNameOrIgnoreCase: GetCanonicalFileName | boolean) {
        Debug.assert((getRootLength(fromDirectory) > 0) === (getRootLength(to) > 0), "Paths must either both be absolute or both be relative");
        const getCanonicalFileName = typeof getCanonicalFileNameOrIgnoreCase === "function" ? getCanonicalFileNameOrIgnoreCase : identity;
        const ignoreCase = typeof getCanonicalFileNameOrIgnoreCase === "boolean" ? getCanonicalFileNameOrIgnoreCase : false;
        const pathComponents = getPathComponentsRelativeTo(fromDirectory, to, ignoreCase ? equateStringsCaseInsensitive : equateStringsCaseSensitive, getCanonicalFileName);
        return getPathFromPathComponents(pathComponents);
    }

    export function getRelativePathToDirectoryOrUrl(directoryPathOrUrl: string, relativeOrAbsolutePath: string, currentDirectory: string, getCanonicalFileName: GetCanonicalFileName, isAbsolutePathAnUrl: boolean) {
        const pathComponents = getPathComponentsRelativeTo(
            resolvePath(currentDirectory, directoryPathOrUrl),
            resolvePath(currentDirectory, relativeOrAbsolutePath),
            equateStringsCaseSensitive,
            getCanonicalFileName
        );

        const firstComponent = pathComponents[0];
        if (isAbsolutePathAnUrl && isRootedDiskPath(firstComponent)) {
            const prefix = firstComponent.charAt(0) === directorySeparator ? "file://" : "file:///";
            pathComponents[0] = prefix + firstComponent;
        }

        return getPathFromPathComponents(pathComponents);
    }

    function pathComponents(path: string, rootLength: number) {
        const root = path.substring(0, rootLength);
        const rest = path.substring(rootLength).split(directorySeparator);
        if (rest.length && !lastOrUndefined(rest)) rest.pop();
        return [root, ...rest];
    }

    /**
     * Parse a path into an array containing a root component (at index 0) and zero or more path
     * components (at indices > 0). The result is not normalized.
     * If the path is relative, the root component is `""`.
     * If the path is absolute, the root component includes the first path separator (`/`).
     */
    export function getPathComponents(path: string, currentDirectory = "") {
        path = currentDirectory ? combinePaths(currentDirectory, path) : normalizeSlashes(path);
        const rootLength = getRootLength(path);
        return pathComponents(path, rootLength);
    }

    /**
     * Reduce an array of path components to a more simplified path by navigating any
     * `"."` or `".."` entries in the path.
     */
    export function reducePathComponents(components: ReadonlyArray<string>) {
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
     * Parse a path into an array containing a root component (at index 0) and zero or more path
     * components (at indices > 0). The result is normalized.
     * If the path is relative, the root component is `""`.
     * If the path is absolute, the root component includes the first path separator (`/`).
     */
    export function getNormalizedPathComponents(path: string, currentDirectory: string | undefined) {
        return reducePathComponents(getPathComponents(path, currentDirectory));
    }

    export function getNormalizedAbsolutePath(fileName: string, currentDirectory: string | undefined) {
        return getPathFromPathComponents(getNormalizedPathComponents(fileName, currentDirectory));
    }

    /**
     * Formats a parsed path consisting of a root component (at index 0) and zero or more path
     * segments (at indices > 0).
     */
    export function getPathFromPathComponents(pathComponents: ReadonlyArray<string>) {
        if (pathComponents.length === 0) return "";

        const root = pathComponents[0] && ensureTrailingDirectorySeparator(pathComponents[0]);
        return root + pathComponents.slice(1).join(directorySeparator);
    }

    export function getNormalizedAbsolutePathWithoutRoot(fileName: string, currentDirectory: string | undefined) {
        return getPathWithoutRoot(getNormalizedPathComponents(fileName, currentDirectory));
    }

    function getPathWithoutRoot(pathComponents: ReadonlyArray<string>) {
        if (pathComponents.length === 0) return "";
        return pathComponents.slice(1).join(directorySeparator);
    }

    /**
     * Combines paths. If a path is absolute, it replaces any previous path.
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

    export function normalizePath(path: string): string {
        const normalized = getPathFromPathComponents(reducePathComponents(getPathComponents(path)));
        return normalized && hasTrailingDirectorySeparator(path) ? ensureTrailingDirectorySeparator(normalized) : normalized;
    }

    /**
     * Combines and resolves paths. If a path is absolute, it replaces any previous path. Any
     * `.` and `..` path components are resolved.
     */
    export function resolvePath(path: string, ...paths: (string | undefined)[]): string {
        return normalizePath(some(paths) ? combinePaths(path, ...paths) : path);
    }

    /**
     * Determines whether a path has a trailing separator (`/` or `\\`).
     */
    export function hasTrailingDirectorySeparator(path: string) {
        if (path.length === 0) return false;
        return isAnyDirectorySeparator(path.charCodeAt(path.length - 1));
    }

    /**
     * Removes a trailing directory separator from a path.
     * @param path The path.
     */
    export function removeTrailingDirectorySeparator(path: Path): Path;
    export function removeTrailingDirectorySeparator(path: string): string;
    export function removeTrailingDirectorySeparator(path: string) {
        if (hasTrailingDirectorySeparator(path)) {
            return path.substr(0, path.length - 1);
        }

        return path;
    }

    /**
     * Adds a trailing directory separator to a path, if it does not already have one.
     * @param path The path.
     */
    export function ensureTrailingDirectorySeparator(path: Path): Path;
    export function ensureTrailingDirectorySeparator(path: string): string;
    export function ensureTrailingDirectorySeparator(path: string) {
        if (!hasTrailingDirectorySeparator(path)) {
            return path + directorySeparator;
        }

        return path;
    }

    // check path for these segments: '', '.'. '..'
    const relativePathSegmentRegExp = /(^|\/)\.{0,2}($|\/)/;

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
     * Performs a case-sensitive comparison of two paths.
     */
    export function comparePathsCaseSensitive(a: string, b: string) {
        return comparePathsWorker(a, b, compareStringsCaseSensitive);
    }

    /**
     * Performs a case-insensitive comparison of two paths.
     */
    export function comparePathsCaseInsensitive(a: string, b: string) {
        return comparePathsWorker(a, b, compareStringsCaseInsensitive);
    }

    export function comparePaths(a: string, b: string, ignoreCase?: boolean): Comparison;
    export function comparePaths(a: string, b: string, currentDirectory: string, ignoreCase?: boolean): Comparison;
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

    export function containsPath(parent: string, child: string, ignoreCase?: boolean): boolean;
    export function containsPath(parent: string, child: string, currentDirectory: string, ignoreCase?: boolean): boolean;
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
     * Returns the path except for its containing directory name.
     * Semantics align with NodeJS's `path.basename` except that we support URL's as well.
     *
     * ```ts
     * getBaseFileName("/path/to/file.ext") === "file.ext"
     * getBaseFileName("/path/to/") === "to"
     * getBaseFileName("/") === ""
     * ```
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
     * ```
     */
    export function getBaseFileName(path: string, extensions: string | ReadonlyArray<string>, ignoreCase: boolean): string;
    export function getBaseFileName(path: string, extensions?: string | ReadonlyArray<string>, ignoreCase?: boolean) {
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

    export function changeAnyExtension(path: string, ext: string): string;
    export function changeAnyExtension(path: string, ext: string, extensions: string | ReadonlyArray<string>, ignoreCase: boolean): string;
    export function changeAnyExtension(path: string, ext: string, extensions?: string | ReadonlyArray<string>, ignoreCase?: boolean) {
        const pathext = extensions !== undefined && ignoreCase !== undefined ? getAnyExtensionFromPath(path, extensions, ignoreCase) : getAnyExtensionFromPath(path);
        return pathext ? path.slice(0, path.length - pathext.length) + (startsWith(ext, ".") ? ext : "." + ext) : path;
    }

    function getAnyExtensionFromPathWorker(path: string, extensions: string | ReadonlyArray<string>, stringEqualityComparer: (a: string, b: string) => boolean) {
        if (typeof extensions === "string") extensions = [extensions];
        for (let extension of extensions) {
            if (!startsWith(extension, ".")) extension = "." + extension;
            if (path.length >= extension.length && path.charAt(path.length - extension.length) === ".") {
                const pathExtension = path.slice(path.length - extension.length);
                if (stringEqualityComparer(pathExtension, extension)) {
                    return pathExtension;
                }
            }
        }
        return "";
    }

    /**
     * Gets the file extension for a path.
     */
    export function getAnyExtensionFromPath(path: string): string;
    /**
     * Gets the file extension for a path, provided it is one of the provided extensions.
     */
    export function getAnyExtensionFromPath(path: string, extensions: string | ReadonlyArray<string>, ignoreCase: boolean): string;
    export function getAnyExtensionFromPath(path: string, extensions?: string | ReadonlyArray<string>, ignoreCase?: boolean): string {
        // Retrieves any string from the final "." onwards from a base file name.
        // Unlike extensionFromPath, which throws an exception on unrecognized extensions.
        if (extensions) {
            return getAnyExtensionFromPathWorker(path, extensions, ignoreCase ? equateStringsCaseInsensitive : equateStringsCaseSensitive);
        }
        const baseFileName = getBaseFileName(path);
        const extensionIndex = baseFileName.lastIndexOf(".");
        if (extensionIndex >= 0) {
            return baseFileName.substring(extensionIndex);
        }
        return "";
    }
}