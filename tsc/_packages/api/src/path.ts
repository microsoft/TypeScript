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

const bundledScheme = "bundled:///";

/**
 * Returns true if the path refers to a bundled library file.
 */
export function isBundled(path: string): boolean {
    return path.startsWith(bundledScheme);
}

/**
 * Returns true if the file name represents a dynamic/virtual file
 * that doesn't exist on disk (e.g., untitled files with paths like "^/untitled/...").
 */
export function isDynamicFileName(fileName: string): boolean {
    return fileName.startsWith("^/");
}

/**
 * Splits a Windows volume (e.g., "c:") from the rest of the path.
 * Returns [volume, rest, ok] where ok is true if a volume was found.
 */
export function splitVolumePath(path: string): [volume: string, rest: string, ok: boolean] {
    if (path.length >= 2 && isVolumeCharacter(path.charCodeAt(0)) && path.charCodeAt(1) === CharacterCodesColon) {
        return [path.substring(0, 2).toLowerCase(), path.substring(2), true];
    }
    return ["", path, false];
}

// Characters that need extra escaping in URI path segments
// https://github.com/microsoft/vscode-uri/blob/edfdccd976efaf4bb8fdeca87e97c47257721729/src/uri.ts#L455
const extraEscapeChars: Record<string, string> = {
    ":": "%3A",
    "/": "%2F",
    "?": "%3F",
    "#": "%23",
    "[": "%5B",
    "]": "%5D",
    "@": "%40",
    "!": "%21",
    "$": "%24",
    "&": "%26",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "*": "%2A",
    "+": "%2B",
    ",": "%2C",
    ";": "%3B",
    "=": "%3D",
    " ": "%20",
};

function extraEscape(s: string): string {
    let result = s;
    for (const [char, escape] of Object.entries(extraEscapeChars)) {
        result = result.replaceAll(char, escape);
    }
    return result;
}

/**
 * Converts a file name to a document URI.
 *
 * @example
 * fileNameToDocumentURI("/path/to/file.ts") === "file:///path/to/file.ts"
 * fileNameToDocumentURI("c:/path/to/file.ts") === "file:///c%3A/path/to/file.ts"
 * fileNameToDocumentURI("^/untitled/ts-nul-authority/Untitled-1") === "untitled:Untitled-1"
 * fileNameToDocumentURI("^/vscode-vfs/github/microsoft/typescript-go/file.ts") === "vscode-vfs://github/microsoft/typescript-go/file.ts"
 */
export function fileNameToDocumentURI(fileName: string): string {
    // Bundled files are returned as-is
    if (isBundled(fileName)) {
        return fileName;
    }

    // Dynamic/virtual files (untitled, vscode-vfs, etc.) need special handling
    if (isDynamicFileName(fileName)) {
        // Format: ^/scheme/authority/path
        const withoutPrefix = fileName.substring(2); // Remove "^/"
        const firstSlash = withoutPrefix.indexOf("/");
        if (firstSlash === -1) {
            throw new Error("invalid file name: " + fileName);
        }
        const scheme = withoutPrefix.substring(0, firstSlash);
        const rest = withoutPrefix.substring(firstSlash + 1);

        const secondSlash = rest.indexOf("/");
        if (secondSlash === -1) {
            throw new Error("invalid file name: " + fileName);
        }
        const authority = rest.substring(0, secondSlash);
        const path = rest.substring(secondSlash + 1);

        // ts-nul-authority is a placeholder for URIs without an authority
        if (authority === "ts-nul-authority") {
            return scheme + ":" + path;
        }
        return scheme + "://" + authority + "/" + path;
    }

    // Regular file path - convert to file:// URI
    let [volume, rest] = splitVolumePath(fileName);
    if (volume !== "") {
        volume = "/" + extraEscape(volume);
    }

    // Remove leading // for UNC paths (already handled by file://)
    if (rest.startsWith("//")) {
        rest = rest.substring(2);
    }

    const parts = rest.split("/");
    const encodedParts = parts.map(part => extraEscape(encodeURIComponent(part)));

    return "file://" + volume + encodedParts.join("/");
}

/**
 * Converts a document URI to a file name.
 *
 * @example
 * documentURIToFileName("file:///path/to/file.ts") === "/path/to/file.ts"
 * documentURIToFileName("file:///c%3A/path/to/file.ts") === "c:/path/to/file.ts"
 * documentURIToFileName("untitled:Untitled-1") === "^/untitled/ts-nul-authority/Untitled-1"
 * documentURIToFileName("vscode-vfs://github/microsoft/typescript-go/file.ts") === "^/vscode-vfs/github/microsoft/typescript-go/file.ts"
 */
export function documentURIToFileName(uri: string): string {
    // Bundled files are returned as-is
    if (isBundled(uri)) {
        return uri;
    }

    // Handle file:// URIs
    if (uri.startsWith("file://")) {
        let parsed: URL;
        try {
            parsed = new URL(uri);
        }
        catch {
            throw new Error("invalid file URI: " + uri);
        }

        // UNC path: file://server/share/...
        if (parsed.host !== "") {
            return "//" + parsed.host + parsed.pathname;
        }

        // Local file - fix Windows path by removing leading slash before volume
        const path = decodeURIComponent(parsed.pathname);
        if (path.length >= 3 && path.charCodeAt(0) === CharacterCodesSlash) {
            const [volume, rest, ok] = splitVolumePath(path.substring(1));
            if (ok) {
                return volume + rest;
            }
        }
        return path;
    }

    // Leave all other URIs escaped so we can round-trip them.
    // Convert to dynamic file name format: ^/scheme/authority/path

    const colonIndex = uri.indexOf(":");
    if (colonIndex === -1) {
        throw new Error("invalid URI: " + uri);
    }

    const scheme = uri.substring(0, colonIndex);
    let path = uri.substring(colonIndex + 1);

    let authority = "ts-nul-authority";
    if (path.startsWith("//")) {
        const rest = path.substring(2);
        const slashIndex = rest.indexOf("/");
        if (slashIndex === -1) {
            throw new Error("invalid URI: " + uri);
        }
        authority = rest.substring(0, slashIndex);
        path = rest.substring(slashIndex + 1);
    }

    return "^/" + scheme + "/" + authority + "/" + path;
}
