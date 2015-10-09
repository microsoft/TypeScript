import { Map } from "./typescript-internal";

let hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasProperty<T>(map: Map<T>, key: string): boolean {
    return hasOwnProperty.call(map, key);
}

export function getProperty<T>(map: Map<T>, key: string): T {
    return hasOwnProperty.call(map, key) ? map[key] : undefined;
}

export let directorySeparator = "/";

export function getRootLength(path: string): number {
    if (path.charAt(0) === directorySeparator) {
        if (path.charAt(1) !== directorySeparator) return 1;
        let p1 = path.indexOf("/", 2);
        if (p1 < 0) return 2;
        let p2 = path.indexOf("/", p1 + 1);
        if (p2 < 0) return p1 + 1;
        return p2 + 1;
    }
    if (path.charAt(1) === ":") {
        if (path.charAt(2) === directorySeparator) return 3;
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
    let idx = path.indexOf("://");
    if (idx !== -1) {
        return idx + "://".length;
    }
    return 0;
}

export function combinePaths(path1: string, path2: string) {
    if (!(path1 && path1.length)) return path2;
    if (!(path2 && path2.length)) return path1;
    if (getRootLength(path2) !== 0) return path2;
    if (path1.charAt(path1.length - 1) === directorySeparator) return path1 + path2;
    return path1 + directorySeparator + path2;
}