import { getPathComponents } from "./path.ts";

export interface FileSystemEntries {
    files: string[];
    directories: string[];
}

export interface FileSystem {
    directoryExists?: (directoryName: string) => boolean | undefined;
    fileExists?: (fileName: string) => boolean | undefined;
    getAccessibleEntries?: (directoryName: string) => FileSystemEntries | undefined;
    readFile?: (fileName: string) => string | null | undefined;
    realpath?: (path: string) => string | undefined;
}

export function createVirtualFileSystem(files: Record<string, string>): FileSystem {
    interface VDirectory {
        type: "directory";
        children: Record<string, VNode>;
    }

    interface VFile {
        type: "file";
        content: string;
    }

    type VNode = VDirectory | VFile;

    const root: VDirectory = {
        type: "directory",
        children: {},
    };

    for (const [filePath, fileContent] of Object.entries(files)) {
        createFile(filePath, fileContent);
    }

    return {
        directoryExists,
        fileExists,
        getAccessibleEntries,
        readFile,
        realpath: path => path,
    };

    /**
     * Traverse the tree from the root according to path segments.
     * Returns the node if found, or null if any segment doesn't exist.
     */
    function getNodeFromPath(path: string): VNode | undefined {
        if (!path || path === "/") {
            return root;
        }
        const segments = getPathComponents(path).slice(1);
        let current: VNode = root;

        for (const segment of segments) {
            if (current.type !== "directory") {
                return undefined;
            }
            const child: VNode = current.children[segment];
            if (!child) {
                return undefined; // segment not found
            }
            current = child;
        }

        return current;
    }

    /**
     * Ensure that the directory path (given by `segments`) exists,
     * creating subdirectories as needed. Returns the final directory node.
     */
    function ensureDirectory(segments: string[]): VDirectory {
        let current: VDirectory = root;
        for (const segment of segments) {
            if (!current.children[segment]) {
                // Create a new directory node
                current.children[segment] = { type: "directory", children: {} };
            }
            else if (current.children[segment].type !== "directory") {
                // A file with the same name already exists
                throw new Error(`Cannot create directory: a file already exists at "/${segments.join("/")}"`);
            }
            current = current.children[segment] as VDirectory;
        }
        return current;
    }

    /**
     * Create (or overwrite) a file at the given path with provided content.
     * Automatically creates parent directories if needed.
     */
    function createFile(path: string, content: string) {
        const segments = getPathComponents(path).slice(1);
        if (segments.length === 0) {
            throw new Error(`Invalid file path: "${path}"`);
        }
        const filename = segments.pop()!;
        const directorySegments = segments;
        const dirNode = ensureDirectory(directorySegments);
        dirNode.children[filename] = { type: "file", content };
    }

    function directoryExists(directoryName: string): boolean {
        const node = getNodeFromPath(directoryName);
        return !!node && node.type === "directory";
    }

    function fileExists(fileName: string): boolean {
        const node = getNodeFromPath(fileName);
        return !!node && node.type === "file";
    }

    function getAccessibleEntries(directoryName: string): FileSystemEntries | undefined {
        const node = getNodeFromPath(directoryName);
        if (!node || node.type !== "directory") {
            // Not found or not a directory
            return undefined;
        }
        const files: string[] = [];
        const directories: string[] = [];
        for (const [name, child] of Object.entries(node.children)) {
            if (child.type === "file") {
                files.push(name);
            }
            else {
                directories.push(name);
            }
        }
        return { files, directories };
    }

    function readFile(fileName: string): string | undefined {
        const node = getNodeFromPath(fileName);
        if (!node || node.type !== "file") {
            return undefined; // doesn't exist or is not a file
        }
        return node.content;
    }
}
