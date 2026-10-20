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

function isDriveRoot(segment: string): boolean {
    return /^[A-Za-z]:/.test(segment);
}

function encodeSegment(segment: string): string {
    const needsEncoding = segment === ""
        || segment === "."
        || segment === ".."
        || segment.includes("\\")
        || escapePrefixes.some(prefix => segment.startsWith(prefix));
    return needsEncoding ? forceEncodeSegment(segment) : segment;
}

function forceEncodeSegment(segment: string): string {
    const hex = Array.from(new TextEncoder().encode(segment), byte => byte.toString(16).padStart(2, "0")).join("");
    return `${escapePrefixes[0]}${hex}~`;
}
