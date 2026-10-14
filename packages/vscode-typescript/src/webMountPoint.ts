export interface WebFileSystemUri {
    readonly scheme: string;
    readonly authority: string;
    readonly path: string;
}

export function uriToWasmMountPoint(uri: WebFileSystemUri): string {
    let fileName: string;
    if (uri.scheme === "file") {
        if (uri.authority) {
            fileName = `//${uri.authority}${uri.path}`;
        }
        else {
            fileName = /^\/[A-Za-z]:/.test(uri.path) ? uri.path.slice(1) : uri.path;
        }
    }
    else {
        fileName = `^/${uri.scheme}/${uri.authority || "ts-nul-authority"}${uri.path}`;
    }
    return fileName.startsWith("/") ? fileName : `/${fileName}`;
}
