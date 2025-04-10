const CharacterCodesSlash = "/".charCodeAt(0);
const CharacterCodesBackslash = "\\".charCodeAt(0);
const CharacterCodesColon = ":".charCodeAt(0);
const CharacterCodesPercent = "%".charCodeAt(0);
const CharacterCodes3 = "3".charCodeAt(0);
const CharacterCodesa = "a".charCodeAt(0);
const CharacterCodesz = "z".charCodeAt(0);
const CharacterCodesA = "A".charCodeAt(0);
const CharacterCodesZ = "Z".charCodeAt(0);
const directorySeparator = "/";
const altDirectorySeparator = "\\";
const urlSchemeSeparator = "://";

function isVolumeCharacter(charCode: number) {
    return (charCode >= CharacterCodesa && charCode <= CharacterCodesz) ||
        (charCode >= CharacterCodesA && charCode <= CharacterCodesZ);
}

function getFileUrlVolumeSeparatorEnd(url: string, start: number) {
    const ch0 = url.charCodeAt(start);
    if (ch0 === CharacterCodesColon) return start + 1;
    if (ch0 === CharacterCodesPercent && url.charCodeAt(start + 1) === CharacterCodes3) {
        const ch2 = url.charCodeAt(start + 2);
        if (ch2 === CharacterCodesa || ch2 === CharacterCodesA) return start + 3;
    }
    return -1;
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
 * Returns length of the root part of a path or URL (i.e. length of "/", "x:/", "//server/share/, file:///user/files").
 * If the root is part of a URL, the twos-complement of the root length is returned.
 */
function getEncodedRootLength(path: string): number {
    if (!path) return 0;
    const ch0 = path.charCodeAt(0);

    // POSIX or UNC
    if (ch0 === CharacterCodesSlash || ch0 === CharacterCodesBackslash) {
        if (path.charCodeAt(1) !== ch0) return 1; // POSIX: "/" (or non-normalized "\")

        const p1 = path.indexOf(ch0 === CharacterCodesSlash ? directorySeparator : altDirectorySeparator, 2);
        if (p1 < 0) return path.length; // UNC: "//server" or "\\server"

        return p1 + 1; // UNC: "//server/" or "\\server\"
    }

    // DOS
    if (isVolumeCharacter(ch0) && path.charCodeAt(1) === CharacterCodesColon) {
        const ch2 = path.charCodeAt(2);
        if (ch2 === CharacterCodesSlash || ch2 === CharacterCodesBackslash) return 3; // DOS: "c:/" or "c:\"
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
                    if (path.charCodeAt(volumeSeparatorEnd) === CharacterCodesSlash) {
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

export function getPathComponents(path: string): string[] {
    return pathComponents(path, getRootLength(path));
}

function pathComponents(path: string, rootLength: number) {
    const root = path.substring(0, rootLength);
    const rest = path.substring(rootLength).split("/");
    if (rest.length && !lastOrUndefined(rest)) rest.pop();
    return [root, ...rest];
}

function lastOrUndefined<T>(array: T[]): T | undefined {
    return array.length ? array[array.length - 1] : undefined;
}
