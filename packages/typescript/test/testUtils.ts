import {
    type FileSystemCallbacks,
    type FileSystemEntries,
    serverFS,
} from "../src/api/fs.ts";
import {
    canonicalize,
    CaseSensitivity,
    getPathComponents,
    toRootedFilePath,
} from "../src/api/path.ts";
import type {
    RootedDirectoryPath,
    RootedFilePath,
    RootedPath,
} from "../src/ast/index.ts";

export function areTestsFiltered(): boolean {
    return process.execArgv.some(arg => arg === "--test-name-pattern" || arg.startsWith("--test-name-pattern="));
}

interface VDirectory {
    type: "directory";
    name: string;
    children: Record<string, VNode>;
}

interface VFile {
    type: "file";
    name: string;
}

type VNode = VDirectory | VFile;

interface TestFileSystem extends FileSystemCallbacks {
    directoryExists(directoryName: RootedDirectoryPath): boolean;
    fileExists(fileName: RootedFilePath): boolean;
    getAccessibleEntries(directoryName: RootedDirectoryPath): FileSystemEntries | typeof serverFS.useOS;
    readFile(fileName: RootedFilePath): any;
    realpath: typeof serverFS.identity;
    stat: typeof serverFS.fakeStat;
    writeFile(path: RootedFilePath, data: string): void;
    removeFile(path: RootedPath): void;
}

export interface CreateVirtualFileSystemOptions {
    caseSensitivity?: CaseSensitivity | undefined;
}

function createVDirectory(name: string): VDirectory {
    return {
        type: "directory",
        name,
        children: Object.create(null) as Record<string, VNode>,
    };
}

export function createVirtualFileSystem(
    files: Record<string, string>,
    options: CreateVirtualFileSystemOptions = {},
): TestFileSystem {
    const caseSensitivity = options.caseSensitivity ?? CaseSensitivity.Sensitive;
    const root = createVDirectory("");
    const content = new Map<string, string>();

    for (const [rawFilePath, data] of Object.entries(files)) {
        const filePath = toRootedFilePath(rawFilePath, undefined);
        const key = getKey(filePath);
        if (content.has(key)) {
            throw new Error(`Duplicate virtual filesystem path: ${filePath}`);
        }
        content.set(key, data);
        addToTree(filePath);
    }

    return {
        directoryExists,
        fileExists,
        getAccessibleEntries,
        readFile,
        realpath: serverFS.identity,
        stat: serverFS.fakeStat,
        writeFile,
        removeFile,
    };

    function getKey(path: RootedPath): string {
        return canonicalize(path, caseSensitivity);
    }

    function getSegmentKey(segment: string): string {
        return canonicalize(segment, caseSensitivity);
    }

    function getNodeFromPath(path: RootedPath): VNode | undefined {
        if (!path || path === "/") {
            return root;
        }
        return getNodeFromSegments(getPathComponents(path).slice(1));
    }

    function getNodeFromSegments(segments: readonly string[]): VNode | undefined {
        let current: VNode = root;
        for (const segment of segments) {
            if (current.type !== "directory") {
                return undefined;
            }
            const child: VNode = current.children[getSegmentKey(segment)];
            if (!child) {
                return undefined;
            }
            current = child;
        }
        return current;
    }

    function ensureDirectory(segments: string[]): VDirectory {
        let current: VDirectory = root;
        for (const segment of segments) {
            const key = getSegmentKey(segment);
            if (!current.children[key]) {
                current.children[key] = createVDirectory(segment);
            }
            else if (current.children[key].type !== "directory") {
                throw new Error(`Cannot create directory: a file already exists at "/${segments.join("/")}"`);
            }
            current = current.children[key] as VDirectory;
        }
        return current;
    }

    function addToTree(path: RootedFilePath): void {
        const segments = getPathComponents(path).slice(1);
        if (segments.length === 0) {
            throw new Error(`Invalid file path: "${path}"`);
        }
        const filename = segments.pop()!;
        const dirNode = ensureDirectory(segments);
        const key = getSegmentKey(filename);
        const existing = dirNode.children[key];
        dirNode.children[key] = { type: "file", name: existing?.name ?? filename };
    }

    function writeFile(path: RootedFilePath, data: string): void {
        content.set(getKey(path), data);
        addToTree(path);
    }

    function removeFile(path: RootedPath): void {
        content.delete(getKey(path));
        const segments = getPathComponents(path).slice(1);
        if (segments.length === 0) return;
        const filename = segments.pop()!;
        const dirNode = getNodeFromSegments(segments);
        if (dirNode && dirNode.type === "directory") {
            delete dirNode.children[getSegmentKey(filename)];
        }
    }

    function directoryExists(directoryName: RootedDirectoryPath): boolean {
        const node = getNodeFromPath(directoryName);
        return !!node && node.type === "directory";
    }

    function fileExists(fileName: RootedFilePath): boolean {
        return content.has(getKey(fileName));
    }

    function getAccessibleEntries(directoryName: RootedDirectoryPath): FileSystemEntries | typeof serverFS.useOS {
        const node = getNodeFromPath(directoryName);
        if (!node || node.type !== "directory") {
            return serverFS.useOS;
        }
        const fileEntries: string[] = [];
        const directories: string[] = [];
        for (const child of Object.values(node.children)) {
            if (child.type === "file") {
                fileEntries.push(child.name);
            }
            else {
                directories.push(child.name);
            }
        }
        return { files: fileEntries, directories, symlinks: undefined };
    }

    function readFile(fileName: RootedFilePath): any {
        return content.get(getKey(fileName)) ?? serverFS.useOS;
    }
}
