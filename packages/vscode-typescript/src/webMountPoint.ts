export interface WebFileSystemUri {
    readonly scheme: string;
    readonly authority: string;
    readonly path: string;
    toString(): string;
}

const dynamicURIFileNamePrefix = "^/~ts-uri~/";
const escapePrefixes = ["~ts-uri-escape~", "~ts-uri-spec~", "~ts-uri-no-path~"];
const nulAuthority = "ts-nul-authority";

export function uriToWasmMountPoint(uri: WebFileSystemUri): string {
    if (uri.scheme === "file") {
        let fileName: string;
        if (uri.authority) {
            fileName = `//${uri.authority}${uri.path}`;
        }
        else {
            fileName = /^\/[A-Za-z]:/.test(uri.path) ? uri.path.slice(1) : uri.path;
        }
        return fileName.startsWith("/") ? fileName : `/${fileName}`;
    }

    // Files below the folder must land inside this mount, so this follows the
    // server's mapping of non-file document URIs onto the file names it reads.
    const text = uri.toString();
    const colon = text.indexOf(":");
    const scheme = text.slice(0, colon);
    let path = text.slice(colon + 1);
    let authority = nulAuthority;
    if (path.startsWith("//")) {
        const slash = path.indexOf("/", 2);
        const rawAuthority = slash === -1 ? path.slice(2) : path.slice(2, slash);
        authority = rawAuthority === nulAuthority || isDriveRoot(rawAuthority) ? forceEncodeSegment(rawAuthority) : encodeSegment(rawAuthority);
        path = slash === -1 ? "" : path.slice(slash + 1);
    }
    const segments = path === "" ? [] : (path.endsWith("/") ? path : `${path}/`).split("/").slice(0, -1).map(encodeSegment);
    if (segments.length && isDriveRoot(segments[0])) {
        segments[0] = forceEncodeSegment(segments[0]);
    }
    return `/${dynamicURIFileNamePrefix}${[scheme, authority, ...segments].join("/")}`;
}

/**
 * Maps a file name below a virtual workspace mount back to the URI the server
 * derived it from, or returns undefined for names no document URI produces.
 */
export function wasmPathToUriText(path: string): string | undefined {
    const prefix = `/${dynamicURIFileNamePrefix}`;
    if (!path.startsWith(prefix)) return undefined;
    const [scheme, authority, ...segments] = path.slice(prefix.length).split("/");
    if (!scheme || authority === undefined) return undefined;
    let uriPath = "";
    for (let i = 0; i < segments.length; i++) {
        const segment = decodeSegment(segments[i]);
        if (segment === undefined) return undefined;
        uriPath += i === 0 ? segment : `/${segment}`;
    }
    if (authority === nulAuthority) return `${scheme}:${uriPath}`;
    const decodedAuthority = decodeSegment(authority);
    return decodedAuthority === undefined ? undefined : `${scheme}://${decodedAuthority}/${uriPath}`;
}

/**
 * Names a directory entry as the server would name it within a document URI,
 * given the entry's segment in the escaped URI text.
 */
export function uriSegmentToWasmName(segment: string, isFile: boolean): string {
    return needsEncoding(segment) ? forceEncodeSegment(segment, isFile) : segment;
}

function isDriveRoot(segment: string): boolean {
    return /^[A-Za-z]:/.test(segment);
}

function needsEncoding(segment: string): boolean {
    return segment === ""
        || segment === "."
        || segment === ".."
        || segment.includes("\\")
        || escapePrefixes.some(prefix => segment.startsWith(prefix));
}

function encodeSegment(segment: string): string {
    return needsEncoding(segment) ? forceEncodeSegment(segment) : segment;
}

function forceEncodeSegment(segment: string, preserveExtension = false): string {
    let extension = "";
    if (preserveExtension && segment !== "." && segment !== "..") {
        extension = getExtension(segment.slice(segment.lastIndexOf("\\") + 1));
        segment = segment.slice(0, segment.length - extension.length);
    }
    const hex = Array.from(new TextEncoder().encode(segment), byte => byte.toString(16).padStart(2, "0")).join("");
    return `${escapePrefixes[0]}${hex}~${extension}`;
}

function getExtension(baseName: string): string {
    const declaration = [".d.ts", ".d.cts", ".d.mts"].find(ext => baseName.endsWith(ext));
    if (declaration) return declaration;
    if (baseName.endsWith(".ts") && baseName.includes(".d.")) return baseName.slice(baseName.indexOf(".d."));
    const dot = baseName.lastIndexOf(".");
    return dot === -1 ? "" : baseName.slice(dot);
}

const strictUtf8Decoder = new TextDecoder("utf-8", { fatal: true });

function decodeSegment(segment: string): string | undefined {
    if (!segment.startsWith(escapePrefixes[0])) {
        return needsEncoding(segment) ? undefined : segment;
    }
    const encoded = segment.slice(escapePrefixes[0].length);
    const end = encoded.indexOf("~");
    const hex = encoded.slice(0, end);
    if (end === -1 || hex.length % 2 !== 0 || !/^[0-9a-fA-F]*$/.test(hex)) return undefined;
    let decoded: string;
    try {
        decoded = strictUtf8Decoder.decode(new Uint8Array(hex.match(/../g)?.map(byte => parseInt(byte, 16)) ?? []));
    }
    catch {
        return undefined;
    }
    // A NUL marks a query or fragment, which only open documents carry.
    return decoded.includes("\0") ? undefined : decoded + encoded.slice(end + 1);
}
