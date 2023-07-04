import { Path } from "typescript";

import { changeAnyExtension, comparePaths, comparePathsCaseInsensitive, comparePathsCaseSensitive, getAnyExtensionFromPath, getBaseFileName, getDirectoryPath, getPathComponents, getPathFromPathComponents, getRelativePathFromDirectory, isDiskPathRoot, isRootedDiskPath, reducePathComponents, resolvePath } from "../../compiler/path-utils";
import { CharacterCodes } from "../../compiler/types";
import { hasJSFileExtension, hasTSFileExtension, isDeclarationFileName } from "../../compiler/utils";
import * as vfs from "./vfs";

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
export const sep = directorySeparator;



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
export function combine(path: string, ...paths: (string | undefined)[]): string {
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
 * Normalize path separators, converting `\` into `/`.
 *
 * @internal
 */
export function normalizeSlashes(path: string): string {
    return path.indexOf("\\") !== -1
        ? path.replace(backslashRegExp, directorySeparator)
        : path;
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
 * Determines whether a path has a trailing separator (`/` or `\\`).
 *
 * @internal
 */
export function hasTrailingDirectorySeparator(path: string) {
    return path.length > 0 && isAnyDirectorySeparator(path.charCodeAt(path.length - 1));
}
/**
 * Determines whether a charCode corresponds to `/` or `\`.
 *
 * @internal
 */
export function isAnyDirectorySeparator(charCode: number): boolean {
    return charCode === CharacterCodes.slash || charCode === CharacterCodes.backslash;
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
export function getRootLength(path: string) {
    const rootLength = getEncodedRootLength(path);
    return rootLength < 0 ? ~rootLength : rootLength;
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

export const dirname = getDirectoryPath;
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
export const format = getPathFromPathComponents;
export const resolve = resolvePath;
export const compareCaseSensitive = comparePathsCaseSensitive;
export const compareCaseInsensitive = comparePathsCaseInsensitive;
export const isAbsolute = isRootedDiskPath;
export const isRoot = isDiskPathRoot;
export const parse = getPathComponents;
export const hasTrailingSeparator = hasTrailingDirectorySeparator;
export const reduce = reducePathComponents;
export const addTrailingSeparator = ensureTrailingDirectorySeparator;
export const compare = comparePaths;
export const relative = getRelativePathFromDirectory;
export const changeExtension = changeAnyExtension;
export const enum ValidationFlags {
    None = 0,

    RequireRoot = 1 << 0,
    RequireDirname = 1 << 1,
    RequireBasename = 1 << 2,
    RequireExtname = 1 << 3,
    RequireTrailingSeparator = 1 << 4,

    AllowRoot = 1 << 5,
    AllowDirname = 1 << 6,
    AllowBasename = 1 << 7,
    AllowExtname = 1 << 8,
    AllowTrailingSeparator = 1 << 9,
    AllowNavigation = 1 << 10,
    AllowWildcard = 1 << 11,

    /** Path must be a valid directory root */
    Root = RequireRoot | AllowRoot | AllowTrailingSeparator,

    /** Path must be a absolute */
    Absolute = RequireRoot | AllowRoot | AllowDirname | AllowBasename | AllowExtname | AllowTrailingSeparator | AllowNavigation,

    /** Path may be relative or absolute */
    RelativeOrAbsolute = AllowRoot | AllowDirname | AllowBasename | AllowExtname | AllowTrailingSeparator | AllowNavigation,

    /** Path may only be a filename */
    Basename = RequireBasename | AllowExtname,
}

export function validate(path: string, flags: ValidationFlags = ValidationFlags.RelativeOrAbsolute) {
    const components = parse(path);
    const trailing = hasTrailingSeparator(path);
    if (!validateComponents(components, flags, trailing)) throw vfs.createIOError("ENOENT");
    return components.length > 1 && trailing ? format(reduce(components)) + sep : format(reduce(components));
}


const invalidRootComponentRegExp = /^(?!(\/|\/\/\w+\/|[a-zA-Z]:\/?|)$)/;
const invalidNavigableComponentRegExp = /[:*?"<>|]/;
const invalidNavigableComponentWithWildcardsRegExp = /[:"<>|]/;
const invalidNonNavigableComponentRegExp = /^\.{1,2}$|[:*?"<>|]/;
const invalidNonNavigableComponentWithWildcardsRegExp = /^\.{1,2}$|[:"<>|]/;
const extRegExp = /\.\w+$/;
function validateComponents(components: string[], flags: ValidationFlags, hasTrailingSeparator: boolean) {
    const hasRoot = !!components[0];
    const hasDirname = components.length > 2;
    const hasBasename = components.length > 1;
    const hasExtname = hasBasename && extRegExp.test(components[components.length - 1]);
    const invalidComponentRegExp = flags & ValidationFlags.AllowNavigation
        ? flags & ValidationFlags.AllowWildcard ? invalidNavigableComponentWithWildcardsRegExp : invalidNavigableComponentRegExp
        : flags & ValidationFlags.AllowWildcard ? invalidNonNavigableComponentWithWildcardsRegExp : invalidNonNavigableComponentRegExp;

    // Validate required components
    if (flags & ValidationFlags.RequireRoot && !hasRoot) return false;
    if (flags & ValidationFlags.RequireDirname && !hasDirname) return false;
    if (flags & ValidationFlags.RequireBasename && !hasBasename) return false;
    if (flags & ValidationFlags.RequireExtname && !hasExtname) return false;
    if (flags & ValidationFlags.RequireTrailingSeparator && !hasTrailingSeparator) return false;

    // Required components indicate allowed components
    if (flags & ValidationFlags.RequireRoot) flags |= ValidationFlags.AllowRoot;
    if (flags & ValidationFlags.RequireDirname) flags |= ValidationFlags.AllowDirname;
    if (flags & ValidationFlags.RequireBasename) flags |= ValidationFlags.AllowBasename;
    if (flags & ValidationFlags.RequireExtname) flags |= ValidationFlags.AllowExtname;
    if (flags & ValidationFlags.RequireTrailingSeparator) flags |= ValidationFlags.AllowTrailingSeparator;

    // Validate disallowed components
    if (~flags & ValidationFlags.AllowRoot && hasRoot) return false;
    if (~flags & ValidationFlags.AllowDirname && hasDirname) return false;
    if (~flags & ValidationFlags.AllowBasename && hasBasename) return false;
    if (~flags & ValidationFlags.AllowExtname && hasExtname) return false;
    if (~flags & ValidationFlags.AllowTrailingSeparator && hasTrailingSeparator) return false;

    // Validate component strings
    if (invalidRootComponentRegExp.test(components[0])) return false;
    for (let i = 1; i < components.length; i++) {
        if (invalidComponentRegExp.test(components[i])) return false;
    }

    return true;
}

export function isDeclaration(path: string) {
    return isDeclarationFileName(path);
}

export const isTypeScript = hasTSFileExtension;
export const isJavaScript = hasJSFileExtension;
export const extname = getAnyExtensionFromPath;
export const basename = getBaseFileName;

export function isSourceMap(path: string) {
    return extname(path, ".map", /*ignoreCase*/ false).length > 0;
}
export function isTsConfigFile(path: string): boolean {
    return path.indexOf("tsconfig") !== -1 && path.indexOf("json") !== -1;
}
