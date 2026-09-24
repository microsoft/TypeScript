import type {
    FileSystemCallbacks,
    FileSystemEntries,
} from "../src/api/fs.ts";
import { getPathComponents } from "../src/api/path.ts";

export function areTestsFiltered(): boolean {
    return process.execArgv.some(arg => arg === "--test-name-pattern" || arg.startsWith("--test-name-pattern="));
}

interface VDirectory {
    type: "directory";
    children: Record<string, VNode>;
}

interface VFile {
    type: "file";
}

type VNode = VDirectory | VFile;

interface TestFileSystem extends FileSystemCallbacks {
    directoryExists(directoryName: string): boolean;
    fileExists(fileName: string): boolean;
    getAccessibleEntries(directoryName: string): FileSystemEntries | undefined;
    readFile(fileName: string): string | undefined;
    realpath: "identity";
    stat: "infer";
    writeFile(path: string, data: string): void;
    removeFile(path: string): void;
}

export function createVirtualFileSystem(files: Record<string, string>): TestFileSystem {
    const root: VDirectory = {
        type: "directory",
        children: {},
    };
    const content: Record<string, string> = {};

    for (const filePath of Object.keys(files)) {
        content[filePath] = files[filePath];
        addToTree(filePath);
    }

    return {
        directoryExists,
        fileExists,
        getAccessibleEntries,
        readFile,
        realpath: "identity",
        stat: "infer",
        writeFile,
        removeFile,
    };

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
                return undefined;
            }
            current = child;
        }
        return current;
    }

    function ensureDirectory(segments: string[]): VDirectory {
        let current: VDirectory = root;
        for (const segment of segments) {
            if (!current.children[segment]) {
                current.children[segment] = { type: "directory", children: {} };
            }
            else if (current.children[segment].type !== "directory") {
                throw new Error(`Cannot create directory: a file already exists at "/${segments.join("/")}"`);
            }
            current = current.children[segment] as VDirectory;
        }
        return current;
    }

    function addToTree(path: string): void {
        const segments = getPathComponents(path).slice(1);
        if (segments.length === 0) {
            throw new Error(`Invalid file path: "${path}"`);
        }
        const filename = segments.pop()!;
        const dirNode = ensureDirectory(segments);
        dirNode.children[filename] = { type: "file" };
    }

    function writeFile(path: string, data: string): void {
        content[path] = data;
        addToTree(path);
    }

    function removeFile(path: string): void {
        delete content[path];
        const segments = getPathComponents(path).slice(1);
        if (segments.length === 0) return;
        const filename = segments.pop()!;
        const dirNode = getNodeFromPath("/" + segments.join("/"));
        if (dirNode && dirNode.type === "directory") {
            delete dirNode.children[filename];
        }
    }

    function directoryExists(directoryName: string): boolean {
        const node = getNodeFromPath(directoryName);
        return !!node && node.type === "directory";
    }

    function fileExists(fileName: string): boolean {
        return fileName in content;
    }

    function getAccessibleEntries(directoryName: string): FileSystemEntries | undefined {
        const node = getNodeFromPath(directoryName);
        if (!node || node.type !== "directory") {
            return undefined;
        }
        const fileEntries: string[] = [];
        const directories: string[] = [];
        for (const [name, child] of Object.entries(node.children)) {
            if (child.type === "file") {
                fileEntries.push(name);
            }
            else {
                directories.push(name);
            }
        }
        return { files: fileEntries, directories };
    }

    function readFile(fileName: string): string | undefined {
        return content[fileName];
    }
}
