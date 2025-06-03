import * as collections from "./_namespaces/collections.js";
import * as documents from "./_namespaces/documents.js";
import * as Harness from "./_namespaces/Harness.js";
import * as ts from "./_namespaces/ts.js";
import * as vpath from "./_namespaces/vpath.js";

/**
 * Posix-style path to the TypeScript compiler build outputs (including tsc.js, lib.d.ts, etc.)
 */
export const builtFolder = "/.ts";

/**
 * Posix-style path to additional mountable folders (./tests/projects in this repo)
 */
export const projectsFolder = "/.projects";

/**
 * Posix-style path to additional test libraries
 */
export const testLibFolder = "/.lib";

/**
 * Posix-style path to sources under test
 */
export const srcFolder = "/.src";

// file type
const S_IFMT = 0o170000; // file type
const S_IFSOCK = 0o140000; // socket
const S_IFLNK = 0o120000; // symbolic link
const S_IFREG = 0o100000; // regular file
const S_IFBLK = 0o060000; // block device
const S_IFDIR = 0o040000; // directory
const S_IFCHR = 0o020000; // character device
const S_IFIFO = 0o010000; // FIFO

let devCount = 0; // A monotonically increasing count of device ids
let inoCount = 0; // A monotonically increasing count of inodes

export interface DiffOptions {
    includeChangedFileWithSameContent?: boolean;
    baseIsNotShadowRoot?: boolean;
}

export const timeIncrements = 1000;

/**
 * Represents a virtual POSIX-like file system.
 */
export class FileSystem {
    /** Indicates whether the file system is case-sensitive (`false`) or case-insensitive (`true`). */
    public readonly ignoreCase: boolean;

    /** Gets the comparison function used to compare two paths. */
    public readonly stringComparer: (a: string, b: string) => number;

    // lazy-initialized state that should be mutable even if the FileSystem is frozen.
    private _lazy: {
        links?: collections.SortedMap<string, Inode>;
        shadows?: Map<number, Inode>;
        meta?: collections.Metadata;
    } = {};

    private _cwd: string; // current working directory
    private _time: number;
    private _shadowRoot: FileSystem | undefined;
    private _dirStack: string[] | undefined;

    constructor(ignoreCase: boolean, options: FileSystemOptions = {}) {
        const { time = timeIncrements, files, meta } = options;
        this.ignoreCase = ignoreCase;
        this.stringComparer = this.ignoreCase ? vpath.compareCaseInsensitive : vpath.compareCaseSensitive;
        this._time = time;

        if (meta) {
            for (const key of Object.keys(meta)) {
                this.meta.set(key, meta[key]);
            }
        }

        if (files) {
            this._applyFiles(files, /*dirname*/ "");
        }

        let cwd = options.cwd;
        if ((!cwd || !vpath.isRoot(cwd)) && this._lazy.links) {
            for (const name of this._lazy.links.keys()) {
                cwd = cwd ? vpath.resolve(name, cwd) : name;
                break;
            }
        }

        if (cwd) {
            vpath.validate(cwd, vpath.ValidationFlags.Absolute);
            this.mkdirpSync(cwd);
        }

        this._cwd = cwd || "";
    }

    /**
     * Gets metadata for this `FileSystem`.
     */
    public get meta(): collections.Metadata {
        if (!this._lazy.meta) {
            this._lazy.meta = new collections.Metadata(this._shadowRoot ? this._shadowRoot.meta : undefined);
        }
        return this._lazy.meta;
    }

    /**
     * Gets a value indicating whether the file system is read-only.
     */
    public get isReadonly(): boolean {
        return Object.isFrozen(this);
    }

    /**
     * Makes the file system read-only.
     */
    public makeReadonly(): this {
        Object.freeze(this);
        return this;
    }

    /**
     * Gets the file system shadowed by this file system.
     */
    public get shadowRoot(): FileSystem | undefined {
        return this._shadowRoot;
    }

    /**
     * Snapshots the current file system, effectively shadowing itself. This is useful for
     * generating file system patches using `.diff()` from one snapshot to the next. Performs
     * no action if this file system is read-only.
     */
    public snapshot(): void {
        if (this.isReadonly) return;
        const fs = new FileSystem(this.ignoreCase, { time: this._time });
        fs._lazy = this._lazy;
        fs._cwd = this._cwd;
        fs._time = this._time;
        fs._shadowRoot = this._shadowRoot;
        fs._dirStack = this._dirStack;
        fs.makeReadonly();
        this._lazy = {};
        this._shadowRoot = fs;
    }

    /**
     * Gets a shadow copy of this file system. Changes to the shadow copy do not affect the
     * original, allowing multiple copies of the same core file system without multiple copies
     * of the same data.
     */
    public shadow(ignoreCase: boolean = this.ignoreCase): FileSystem {
        if (!this.isReadonly) throw new Error("Cannot shadow a mutable file system.");
        if (ignoreCase && !this.ignoreCase) throw new Error("Cannot create a case-insensitive file system from a case-sensitive one.");
        const fs = new FileSystem(ignoreCase, { time: this._time });
        fs._shadowRoot = this;
        fs._cwd = this._cwd;
        return fs;
    }

    /**
     * Gets or sets the timestamp (in milliseconds) used for file status, returning the previous timestamp.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/time.html
     */
    public time(value?: number): number {
        if (value !== undefined) {
            if (this.isReadonly) throw createIOError("EPERM");
            this._time = value;
        }
        else if (!this.isReadonly) {
            this._time += timeIncrements;
        }
        return this._time;
    }

    /**
     * Gets the metadata object for a path.
     * @param path
     */
    public filemeta(path: string): collections.Metadata {
        const { node } = this._walk(this._resolve(path));
        if (!node) throw createIOError("ENOENT");
        return this._filemeta(node);
    }

    private _filemeta(node: Inode): collections.Metadata {
        if (!node.meta) {
            const parentMeta = node.shadowRoot && this._shadowRoot && this._shadowRoot._filemeta(node.shadowRoot);
            node.meta = new collections.Metadata(parentMeta);
        }
        return node.meta;
    }

    /**
     * Get the pathname of the current working directory.
     *
     * @link - http://pubs.opengroup.org/onlinepubs/9699919799/functions/getcwd.html
     */
    public cwd(): string {
        if (!this._cwd) throw new Error("The current working directory has not been set.");
        const { node } = this._walk(this._cwd);
        if (!node) throw createIOError("ENOENT");
        if (!isDirectory(node)) throw createIOError("ENOTDIR");
        return this._cwd;
    }

    /**
     * Changes the current working directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chdir.html
     */
    public chdir(path: string): void {
        if (this.isReadonly) throw createIOError("EPERM");
        path = this._resolve(path);
        const { node } = this._walk(path);
        if (!node) throw createIOError("ENOENT");
        if (!isDirectory(node)) throw createIOError("ENOTDIR");
        this._cwd = path;
    }

    /**
     * Pushes the current directory onto the directory stack and changes the current working directory to the supplied path.
     */
    public pushd(path?: string): void {
        if (this.isReadonly) throw createIOError("EPERM");
        if (path) path = this._resolve(path);
        if (this._cwd) {
            if (!this._dirStack) this._dirStack = [];
            this._dirStack.push(this._cwd);
        }
        if (path && path !== this._cwd) {
            this.chdir(path);
        }
    }

    /**
     * Pops the previous directory from the location stack and changes the current directory to that directory.
     */
    public popd(): void {
        if (this.isReadonly) throw createIOError("EPERM");
        const path = this._dirStack && this._dirStack.pop();
        if (path) {
            this.chdir(path);
        }
    }

    /**
     * Update the file system with a set of files.
     */
    public apply(files: FileSet): void {
        this._applyFiles(files, this._cwd);
    }

    /**
     * Scan file system entries along a path. If `path` is a symbolic link, it is dereferenced.
     * @param path The path at which to start the scan.
     * @param axis The axis along which to traverse.
     * @param traversal The traversal scheme to use.
     */
    public scanSync(path: string, axis: Axis, traversal: Traversal): string[] {
        path = this._resolve(path);
        const results: string[] = [];
        this._scan(path, this._stat(this._walk(path)), axis, traversal, /*noFollow*/ false, results);
        return results;
    }

    /**
     * Scan file system entries along a path.
     * @param path The path at which to start the scan.
     * @param axis The axis along which to traverse.
     * @param traversal The traversal scheme to use.
     */
    public lscanSync(path: string, axis: Axis, traversal: Traversal): string[] {
        path = this._resolve(path);
        const results: string[] = [];
        this._scan(path, this._stat(this._walk(path, /*noFollow*/ true)), axis, traversal, /*noFollow*/ true, results);
        return results;
    }

    private _scan(path: string, stats: Stats, axis: Axis, traversal: Traversal, noFollow: boolean, results: string[]) {
        if (axis === "ancestors-or-self" || axis === "self" || axis === "descendants-or-self") {
            if (!traversal.accept || traversal.accept(path, stats)) {
                results.push(path);
            }
        }
        if (axis === "ancestors-or-self" || axis === "ancestors") {
            const dirname = vpath.dirname(path);
            if (dirname !== path) {
                try {
                    const stats = this._stat(this._walk(dirname, noFollow));
                    if (!traversal.traverse || traversal.traverse(dirname, stats)) {
                        this._scan(dirname, stats, "ancestors-or-self", traversal, noFollow, results);
                    }
                }
                catch { /*ignored*/ }
            }
        }
        if (axis === "descendants-or-self" || axis === "descendants") {
            if (stats.isDirectory() && (!traversal.traverse || traversal.traverse(path, stats))) {
                for (const file of this.readdirSync(path)) {
                    try {
                        const childpath = vpath.combine(path, file);
                        const stats = this._stat(this._walk(childpath, noFollow));
                        this._scan(childpath, stats, "descendants-or-self", traversal, noFollow, results);
                    }
                    catch { /*ignored*/ }
                }
            }
        }
    }

    /**
     * Mounts a physical or virtual file system at a location in this virtual file system.
     *
     * @param source The path in the physical (or other virtual) file system.
     * @param target The path in this virtual file system.
     * @param resolver An object used to resolve files in `source`.
     */
    public mountSync(source: string, target: string, resolver: FileSystemResolver): void {
        if (this.isReadonly) throw createIOError("EROFS");

        source = vpath.validate(source, vpath.ValidationFlags.Absolute);

        const { parent, links, node: existingNode, basename } = this._walk(this._resolve(target), /*noFollow*/ true);
        if (existingNode) throw createIOError("EEXIST");

        const time = this.time();
        const node = this._mknod(parent ? parent.dev : ++devCount, S_IFDIR, /*mode*/ 0o777, time);
        node.source = source;
        node.resolver = resolver;
        this._addLink(parent, links, basename, node, time);
    }

    /**
     * Recursively remove all files and directories underneath the provided path.
     */
    public rimrafSync(path: string): void {
        try {
            const stats = this.lstatSync(path);
            if (stats.isFile() || stats.isSymbolicLink()) {
                this.unlinkSync(path);
            }
            else if (stats.isDirectory()) {
                for (const file of this.readdirSync(path)) {
                    this.rimrafSync(vpath.combine(path, file));
                }
                this.rmdirSync(path);
            }
        }
        catch (e) {
            if (e.code === "ENOENT") return;
            throw e;
        }
    }

    /**
     * Make a directory and all of its parent paths (if they don't exist).
     */
    public mkdirpSync(path: string): void {
        path = this._resolve(path);
        const result = this._walk(path, /*noFollow*/ true, (error, result) => {
            if (error.code === "ENOENT") {
                this._mkdir(result);
                return "retry";
            }
            return "throw";
        });

        if (!result.node) this._mkdir(result);
    }

    public getFileListing(): string {
        let result = "";
        const printLinks = (dirname: string | undefined, links: collections.SortedMap<string, Inode>) => {
            for (const [name, node] of links) {
                const path = dirname ? vpath.combine(dirname, name) : name;
                const marker = vpath.compare(this._cwd, path, this.ignoreCase) === 0 ? "*" : " ";
                if (result) result += "\n";
                result += marker;
                if (isDirectory(node)) {
                    result += vpath.addTrailingSeparator(path);
                    printLinks(path, this._getLinks(node));
                }
                else if (isFile(node)) {
                    result += path;
                }
                else if (isSymlink(node)) {
                    result += path + " -> " + node.symlink;
                }
            }
        };
        printLinks(/*dirname*/ undefined, this._getRootLinks());
        return result;
    }

    /**
     * Print diagnostic information about the structure of the file system to the console.
     */
    public debugPrint(): void {
        console.log(this.getFileListing());
    }

    // POSIX API (aligns with NodeJS "fs" module API)

    /**
     * Determines whether a path exists.
     */
    public existsSync(path: string): boolean {
        const result = this._walk(this._resolve(path), /*noFollow*/ true, () => "stop");
        return result !== undefined && result.node !== undefined;
    }

    /**
     * Get file status. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/stat.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    public statSync(path: string): Stats {
        return this._stat(this._walk(this._resolve(path)));
    }

    /**
     * Change file access times
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    public utimesSync(path: string, atime: Date, mtime: Date): void {
        if (this.isReadonly) throw createIOError("EROFS");
        if (!isFinite(+atime) || !isFinite(+mtime)) throw createIOError("EINVAL");

        const entry = this._walk(this._resolve(path));
        if (!entry || !entry.node) {
            throw createIOError("ENOENT");
        }
        entry.node.atimeMs = +atime;
        entry.node.mtimeMs = +mtime;
        entry.node.ctimeMs = this.time();
    }

    /**
     * Get file status. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/lstat.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    public lstatSync(path: string): Stats {
        return this._stat(this._walk(this._resolve(path), /*noFollow*/ true));
    }

    private _stat(entry: WalkResult) {
        const node = entry.node;
        if (!node) throw createIOError(`ENOENT`, entry.realpath);
        return new Stats(
            node.dev,
            node.ino,
            node.mode,
            node.nlink,
            /*rdev*/ 0,
            /*size*/ isFile(node) ? this._getSize(node) : isSymlink(node) ? node.symlink.length : 0,
            /*blksize*/ 4096,
            /*blocks*/ 0,
            node.atimeMs,
            node.mtimeMs,
            node.ctimeMs,
            node.birthtimeMs,
        );
    }

    /**
     * Read a directory. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/readdir.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    public readdirSync(path: string): string[] {
        const { node } = this._walk(this._resolve(path));
        if (!node) throw createIOError("ENOENT");
        if (!isDirectory(node)) throw createIOError("ENOTDIR");
        return ts.arrayFrom(this._getLinks(node).keys());
    }

    /**
     * Make a directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/mkdir.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    public mkdirSync(path: string): void {
        if (this.isReadonly) throw createIOError("EROFS");

        this._mkdir(this._walk(this._resolve(path), /*noFollow*/ true));
    }

    private _mkdir({ parent, links, node: existingNode, basename }: WalkResult) {
        if (existingNode) throw createIOError("EEXIST");
        const time = this.time();
        const node = this._mknod(parent ? parent.dev : ++devCount, S_IFDIR, /*mode*/ 0o777, time);
        this._addLink(parent, links, basename, node, time);
    }

    /**
     * Remove a directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rmdir.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    public rmdirSync(path: string): void {
        if (this.isReadonly) throw createIOError("EROFS");
        path = this._resolve(path);

        const { parent, links, node, basename } = this._walk(path, /*noFollow*/ true);
        if (!parent) throw createIOError("EPERM");
        if (!isDirectory(node)) throw createIOError("ENOTDIR");
        if (this._getLinks(node).size !== 0) throw createIOError("ENOTEMPTY");

        this._removeLink(parent, links, basename, node);
    }

    /**
     * Link one file to another file (also known as a "hard link").
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/link.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    public linkSync(oldpath: string, newpath: string): void {
        if (this.isReadonly) throw createIOError("EROFS");

        const { node } = this._walk(this._resolve(oldpath));
        if (!node) throw createIOError("ENOENT");
        if (isDirectory(node)) throw createIOError("EPERM");

        const { parent, links, basename, node: existingNode } = this._walk(this._resolve(newpath), /*noFollow*/ true);
        if (!parent) throw createIOError("EPERM");
        if (existingNode) throw createIOError("EEXIST");

        this._addLink(parent, links, basename, node);
    }

    /**
     * Remove a directory entry.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/unlink.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    public unlinkSync(path: string): void {
        if (this.isReadonly) throw createIOError("EROFS");

        const { parent, links, node, basename } = this._walk(this._resolve(path), /*noFollow*/ true);
        if (!parent) throw createIOError("EPERM");
        if (!node) throw createIOError("ENOENT");
        if (isDirectory(node)) throw createIOError("EISDIR");

        this._removeLink(parent, links, basename, node);
    }

    /**
     * Rename a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rename.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    public renameSync(oldpath: string, newpath: string): void {
        if (this.isReadonly) throw createIOError("EROFS");

        const { parent: oldParent, links: oldParentLinks, node, basename: oldBasename } = this._walk(this._resolve(oldpath), /*noFollow*/ true);
        if (!oldParent) throw createIOError("EPERM");
        if (!node) throw createIOError("ENOENT");

        const { parent: newParent, links: newParentLinks, node: existingNode, basename: newBasename } = this._walk(this._resolve(newpath), /*noFollow*/ true);
        if (!newParent) throw createIOError("EPERM");

        const time = this.time();
        if (existingNode) {
            if (isDirectory(node)) {
                if (!isDirectory(existingNode)) throw createIOError("ENOTDIR");
                // if both old and new arguments point to the same directory, just pass. So we could rename /src/a/1 to /src/A/1 in Win.
                // if not and the directory pointed by the new path is not empty, throw an error.
                if (this.stringComparer(oldpath, newpath) !== 0 && this._getLinks(existingNode).size > 0) throw createIOError("ENOTEMPTY");
            }
            else {
                if (isDirectory(existingNode)) throw createIOError("EISDIR");
            }
            this._removeLink(newParent, newParentLinks, newBasename, existingNode, time);
        }

        this._replaceLink(oldParent, oldParentLinks, oldBasename, newParent, newParentLinks, newBasename, node, time);
    }

    /**
     * Make a symbolic link.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/symlink.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    public symlinkSync(target: string, linkpath: string): void {
        if (this.isReadonly) throw createIOError("EROFS");

        const { parent, links, node: existingNode, basename } = this._walk(this._resolve(linkpath), /*noFollow*/ true);
        if (!parent) throw createIOError("EPERM");
        if (existingNode) throw createIOError("EEXIST");

        const time = this.time();
        const node = this._mknod(parent.dev, S_IFLNK, /*mode*/ 0o666, time);
        node.symlink = vpath.validate(target, vpath.ValidationFlags.RelativeOrAbsolute);
        this._addLink(parent, links, basename, node, time);
    }

    /**
     * Resolve a pathname.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/realpath.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    public realpathSync(path: string): string {
        const { realpath } = this._walk(this._resolve(path));
        return realpath;
    }

    /**
     * Read from a file.
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    public readFileSync(path: string, encoding?: null): Buffer; // eslint-disable-line no-restricted-syntax
    /**
     * Read from a file.
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    public readFileSync(path: string, encoding: BufferEncoding): string;
    /**
     * Read from a file.
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    public readFileSync(path: string, encoding?: BufferEncoding | null): string | Buffer; // eslint-disable-line no-restricted-syntax
    public readFileSync(path: string, encoding: BufferEncoding | null = null) { // eslint-disable-line no-restricted-syntax
        const { node } = this._walk(this._resolve(path));
        if (!node) throw createIOError("ENOENT");
        if (isDirectory(node)) throw createIOError("EISDIR");
        if (!isFile(node)) throw createIOError("EBADF");

        const fileBuffer = this._getBuffer(node, encoding ?? undefined);
        return !fileBuffer.encoding ? fileBuffer.data.slice() : fileBuffer.data;
    }

    /**
     * Write to a file.
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    // eslint-disable-next-line no-restricted-syntax
    public writeFileSync(path: string, data: string | Buffer, encoding: string | null = null): void {
        if (this.isReadonly) throw createIOError("EROFS");

        const { parent, links, node: existingNode, basename } = this._walk(this._resolve(path), /*noFollow*/ false);
        if (!parent) throw createIOError("EPERM");

        const time = this.time();
        let node = existingNode;
        if (!node) {
            node = this._mknod(parent.dev, S_IFREG, 0o666, time);
            this._addLink(parent, links, basename, node, time);
        }

        if (isDirectory(node)) throw createIOError("EISDIR");
        if (!isFile(node)) throw createIOError("EBADF");
        node.buffer = Buffer.isBuffer(data) ?
            { encoding: undefined, data: data.slice() } :
            { encoding: (encoding ?? "utf8") as BufferEncoding, data };
        // Updated the size if it's easy to get, otherwise set to undefined. _getSize will compute the correct size
        node.size = !node.buffer.encoding ? node.buffer.data.byteLength : undefined;
        node.mtimeMs = time;
        node.ctimeMs = time;
    }

    /**
     * Generates a `FileSet` patch containing all the entries in this `FileSystem` that are not in `base`.
     * @param base The base file system. If not provided, this file system's `shadowRoot` is used (if present).
     */
    public diff(base?: FileSystem | undefined, options: DiffOptions = {}): FileSet | undefined {
        if (!base && !options.baseIsNotShadowRoot) base = this.shadowRoot;
        const differences: FileSet = {};
        const hasDifferences = base ?
            FileSystem.rootDiff(differences, this, base, options) :
            FileSystem.trackCreatedInodes(differences, this, this._getRootLinks());
        return hasDifferences ? differences : undefined;
    }

    public static defaultEncoding: BufferEncoding | undefined = "utf8";
    /**
     * Generates a `FileSet` patch containing all the entries in `changed` that are not in `base`.
     */
    public static diff(changed: FileSystem, base: FileSystem, options: DiffOptions = {}): FileSet | undefined {
        const differences: FileSet = {};
        return FileSystem.rootDiff(differences, changed, base, options) ?
            differences :
            undefined;
    }

    private static diffWorker(container: FileSet, changed: FileSystem, changedLinks: ReadonlyMap<string, Inode> | undefined, base: FileSystem, baseLinks: ReadonlyMap<string, Inode> | undefined, options: DiffOptions) {
        if (changedLinks && !baseLinks) return FileSystem.trackCreatedInodes(container, changed, changedLinks);
        if (baseLinks && !changedLinks) return FileSystem.trackDeletedInodes(container, baseLinks);
        if (changedLinks && baseLinks) {
            let hasChanges = false;
            // track base items missing in changed
            baseLinks.forEach((node, basename) => {
                if (!changedLinks.has(basename)) {
                    container[basename] = isDirectory(node) ? new Rmdir() : new Unlink();
                    hasChanges = true;
                }
            });
            // track changed items missing or differing in base
            changedLinks.forEach((changedNode, basename) => {
                const baseNode = baseLinks.get(basename);
                if (baseNode) {
                    if (isDirectory(changedNode) && isDirectory(baseNode)) {
                        return hasChanges = FileSystem.directoryDiff(container, basename, changed, changedNode, base, baseNode, options) || hasChanges;
                    }
                    if (isFile(changedNode) && isFile(baseNode)) {
                        return hasChanges = FileSystem.fileDiff(container, basename, changed, changedNode, base, baseNode, options) || hasChanges;
                    }
                    if (isSymlink(changedNode) && isSymlink(baseNode)) {
                        return hasChanges = FileSystem.symlinkDiff(container, basename, changedNode, baseNode) || hasChanges;
                    }
                }
                return hasChanges = FileSystem.trackCreatedInode(container, basename, changed, changedNode) || hasChanges;
            });
            return hasChanges;
        }
        return false;
    }

    private static rootDiff(container: FileSet, changed: FileSystem, base: FileSystem, options: DiffOptions) {
        while (!changed._lazy.links && changed._shadowRoot) changed = changed._shadowRoot;
        while (!base._lazy.links && base._shadowRoot) base = base._shadowRoot;

        // no difference if the file systems are the same reference
        if (changed === base) return false;

        // no difference if the root links are empty and unshadowed
        if (!changed._lazy.links && !changed._shadowRoot && !base._lazy.links && !base._shadowRoot) return false;

        return FileSystem.diffWorker(container, changed, changed._getRootLinks(), base, base._getRootLinks(), options);
    }

    private static directoryDiff(container: FileSet, basename: string, changed: FileSystem, changedNode: DirectoryInode, base: FileSystem, baseNode: DirectoryInode, options: DiffOptions) {
        while (!changedNode.links && changedNode.shadowRoot) changedNode = changedNode.shadowRoot;
        while (!baseNode.links && baseNode.shadowRoot) baseNode = baseNode.shadowRoot;

        // no difference if the nodes are the same reference
        if (changedNode === baseNode) return false;

        // no difference if both nodes are non shadowed and have no entries
        if (isEmptyNonShadowedDirectory(changedNode) && isEmptyNonShadowedDirectory(baseNode)) return false;

        // no difference if both nodes are unpopulated and point to the same mounted file system
        if (
            !changedNode.links && !baseNode.links &&
            changedNode.resolver && changedNode.source !== undefined &&
            baseNode.resolver === changedNode.resolver && baseNode.source === changedNode.source
        ) return false;

        // no difference if both nodes have identical children
        const children: FileSet = {};
        if (!FileSystem.diffWorker(children, changed, changed._getLinks(changedNode), base, base._getLinks(baseNode), options)) {
            return false;
        }

        container[basename] = new Directory(children);
        return true;
    }

    private static fileDiff(container: FileSet, basename: string, changed: FileSystem, changedNode: FileInode, base: FileSystem, baseNode: FileInode, options: DiffOptions) {
        changedNode = walkSameNodes(changedNode);
        baseNode = walkSameNodes(baseNode);

        // no difference if the nodes are the same reference
        if (changedNode === baseNode) return false;

        // no difference if both nodes are non shadowed and have no entries
        if (isEmptyNonShadowedFile(changedNode) && isEmptyNonShadowedFile(baseNode)) return false;

        // no difference if both nodes are unpopulated and point to the same mounted file system
        if (
            !changedNode.buffer && !baseNode.buffer &&
            changedNode.resolver && changedNode.source !== undefined &&
            baseNode.resolver === changedNode.resolver && baseNode.source === changedNode.source
        ) return false;

        const encoding = changedNode.buffer?.encoding ?? baseNode.buffer?.encoding ?? FileSystem.defaultEncoding;
        const changedBuffer = changed._getBuffer(changedNode, encoding);
        const baseBuffer = base._getBuffer(baseNode, encoding);

        // no difference if both buffers are the same reference
        if (changedBuffer === baseBuffer) {
            if (!options.includeChangedFileWithSameContent || changedNode.mtimeMs === baseNode.mtimeMs) return false;
            container[basename] = new SameFileWithModifiedTime(changedBuffer.data, { encoding: changedBuffer.encoding });
            return true;
        }

        // no difference if both buffers are identical
        if (
            !changedBuffer.encoding && !baseBuffer.encoding && Buffer.compare(changedBuffer.data, baseBuffer.data) === 0 // same buffer content
            || changedBuffer.encoding === baseBuffer.encoding && changedBuffer.data === baseBuffer.data // same string content
        ) {
            if (!options.includeChangedFileWithSameContent) return false;
            container[basename] = new SameFileContentFile(changedBuffer.data, { encoding: changedBuffer.encoding });
            return true;
        }

        container[basename] = new File(changedBuffer.data, { encoding: changedBuffer.encoding });
        return true;

        function walkSameNodes(node: FileInode) {
            while (
                !node.buffer &&
                node.shadowRoot &&
                (!options.includeChangedFileWithSameContent || node.mtimeMs === node.shadowRoot.mtimeMs)
            ) node = node.shadowRoot;
            return node;
        }
    }

    private static symlinkDiff(container: FileSet, basename: string, changedNode: SymlinkInode, baseNode: SymlinkInode) {
        // no difference if the nodes are the same reference
        if (changedNode.symlink === baseNode.symlink) return false;
        container[basename] = new Symlink(changedNode.symlink);
        return true;
    }

    private static trackCreatedInode(container: FileSet, basename: string, changed: FileSystem, node: Inode) {
        if (isDirectory(node)) {
            const children: FileSet = {};
            FileSystem.trackCreatedInodes(children, changed, changed._getLinks(node));
            container[basename] = new Directory(children);
        }
        else if (isSymlink(node)) {
            container[basename] = new Symlink(node.symlink);
        }
        else {
            const buffer = changed._getBuffer(node, FileSystem.defaultEncoding);
            container[basename] = new File(buffer.data, { encoding: buffer.encoding ?? undefined });
        }
        return true;
    }

    private static trackCreatedInodes(container: FileSet, changed: FileSystem, changedLinks: ReadonlyMap<string, Inode>) {
        // no difference if links are empty
        if (!changedLinks.size) return false;

        changedLinks.forEach((node, basename) => {
            FileSystem.trackCreatedInode(container, basename, changed, node);
        });
        return true;
    }

    private static trackDeletedInodes(container: FileSet, baseLinks: ReadonlyMap<string, Inode>) {
        // no difference if links are empty
        if (!baseLinks.size) return false;
        baseLinks.forEach((node, basename) => {
            container[basename] = isDirectory(node) ? new Rmdir() : new Unlink();
        });
        return true;
    }

    private _mknod(dev: number, type: typeof S_IFREG, mode: number, time?: number): FileInode;
    private _mknod(dev: number, type: typeof S_IFDIR, mode: number, time?: number): DirectoryInode;
    private _mknod(dev: number, type: typeof S_IFLNK, mode: number, time?: number): SymlinkInode;
    private _mknod(dev: number, type: number, mode: number, time = this.time()): Inode {
        return {
            dev,
            ino: ++inoCount,
            mode: (mode & ~S_IFMT & ~0o022 & 0o7777) | (type & S_IFMT),
            atimeMs: time,
            mtimeMs: time,
            ctimeMs: time,
            birthtimeMs: time,
            nlink: 0,
        };
    }

    private _addLink(parent: DirectoryInode | undefined, links: collections.SortedMap<string, Inode>, name: string, node: Inode, time = this.time()) {
        links.set(name, node);
        node.nlink++;
        node.ctimeMs = time;
        if (parent) parent.mtimeMs = time;
        if (!parent && !this._cwd) this._cwd = name;
    }

    private _removeLink(parent: DirectoryInode | undefined, links: collections.SortedMap<string, Inode>, name: string, node: Inode, time = this.time()) {
        links.delete(name);
        node.nlink--;
        node.ctimeMs = time;
        if (parent) parent.mtimeMs = time;
    }

    private _replaceLink(oldParent: DirectoryInode, oldLinks: collections.SortedMap<string, Inode>, oldName: string, newParent: DirectoryInode, newLinks: collections.SortedMap<string, Inode>, newName: string, node: Inode, time: number) {
        if (oldParent !== newParent) {
            this._removeLink(oldParent, oldLinks, oldName, node, time);
            this._addLink(newParent, newLinks, newName, node, time);
        }
        else {
            oldLinks.delete(oldName);
            oldLinks.set(newName, node);
            oldParent.mtimeMs = time;
            newParent.mtimeMs = time;
        }
    }

    private _getRootLinks() {
        if (!this._lazy.links) {
            this._lazy.links = new collections.SortedMap<string, Inode>(this.stringComparer);
            if (this._shadowRoot) {
                this._copyShadowLinks(this._shadowRoot._getRootLinks(), this._lazy.links);
            }
        }
        return this._lazy.links;
    }

    private _getLinks(node: DirectoryInode) {
        if (!node.links) {
            const links = new collections.SortedMap<string, Inode>(this.stringComparer);
            const { source, resolver } = node;
            if (source && resolver) {
                node.source = undefined;
                node.resolver = undefined;
                for (const name of resolver.readdirSync(source)) {
                    const path = vpath.combine(source, name);
                    const stats = resolver.statSync(path);
                    switch (stats.mode & S_IFMT) {
                        case S_IFDIR:
                            const dir = this._mknod(node.dev, S_IFDIR, 0o777);
                            dir.source = vpath.combine(source, name);
                            dir.resolver = resolver;
                            this._addLink(node, links, name, dir);
                            break;
                        case S_IFREG:
                            const file = this._mknod(node.dev, S_IFREG, 0o666);
                            file.source = vpath.combine(source, name);
                            file.resolver = resolver;
                            file.size = stats.size;
                            this._addLink(node, links, name, file);
                            break;
                    }
                }
            }
            else if (this._shadowRoot && node.shadowRoot) {
                this._copyShadowLinks(this._shadowRoot._getLinks(node.shadowRoot), links);
            }
            node.links = links;
        }
        return node.links;
    }

    private _getShadow(root: DirectoryInode): DirectoryInode;
    private _getShadow(root: Inode): Inode;
    private _getShadow(root: Inode) {
        const shadows = this._lazy.shadows || (this._lazy.shadows = new Map<number, Inode>());

        let shadow = shadows.get(root.ino);
        if (!shadow) {
            shadow = {
                dev: root.dev,
                ino: root.ino,
                mode: root.mode,
                atimeMs: root.atimeMs,
                mtimeMs: root.mtimeMs,
                ctimeMs: root.ctimeMs,
                birthtimeMs: root.birthtimeMs,
                nlink: root.nlink,
                shadowRoot: root,
            };

            if (isSymlink(root)) (shadow as SymlinkInode).symlink = root.symlink;
            shadows.set(shadow.ino, shadow);
        }

        return shadow;
    }

    private _copyShadowLinks(source: ReadonlyMap<string, Inode>, target: collections.SortedMap<string, Inode>) {
        for (const [name, root] of source) {
            target.set(name, this._getShadow(root));
        }
    }

    private _getSize(node: FileInode): number {
        if (node.buffer) return Buffer.byteLength(node.buffer.data);
        if (node.size !== undefined) return node.size;
        if (node.source && node.resolver) return node.size = node.resolver.statSync(node.source).size;
        if (this._shadowRoot && node.shadowRoot) return node.size = this._shadowRoot._getSize(node.shadowRoot);
        return 0;
    }

    private _getBuffer(node: FileInode, encoding: BufferEncoding | undefined): FileDataBuffer {
        if (!node.buffer) {
            const { source, resolver } = node;
            if (source && resolver) {
                node.source = undefined;
                node.resolver = undefined;
                node.size = undefined;
                node.buffer = resolver.readFileSync(source);
            }
            else if (this._shadowRoot && node.shadowRoot) {
                node.buffer = this._shadowRoot._getBuffer(node.shadowRoot, encoding);
            }
            else {
                node.buffer = { encoding: undefined, data: Buffer.allocUnsafe(0) };
            }
        }
        ensureBufferEncoding(node.buffer, encoding);
        return node.buffer;
    }

    /**
     * Walk a path to its end.
     *
     * @param path The path to follow.
     * @param noFollow A value indicating whether to *not* dereference a symbolic link at the
     * end of a path.
     *
     * @link http://man7.org/linux/man-pages/man7/path_resolution.7.html
     */
    private _walk(path: string, noFollow?: boolean, onError?: (error: NodeJS.ErrnoException, fragment: WalkResult) => "retry" | "throw"): WalkResult;
    private _walk(path: string, noFollow?: boolean, onError?: (error: NodeJS.ErrnoException, fragment: WalkResult) => "stop" | "retry" | "throw"): WalkResult | undefined;
    private _walk(path: string, noFollow?: boolean, onError?: (error: NodeJS.ErrnoException, fragment: WalkResult) => "stop" | "retry" | "throw"): WalkResult | undefined {
        let links = this._getRootLinks();
        let parent: DirectoryInode | undefined;
        let components = vpath.parse(path);
        let step = 0;
        let depth = 0;
        let retry = false;
        while (true) {
            if (depth >= 40) throw createIOError("ELOOP");
            const lastStep = step === components.length - 1;
            let basename = components[step];
            const linkEntry = links.getEntry(basename);
            if (linkEntry) {
                components[step] = basename = linkEntry[0];
            }
            const node = linkEntry?.[1];
            if (lastStep && (noFollow || !isSymlink(node))) {
                return { realpath: vpath.format(components), basename, parent, links, node };
            }
            if (node === undefined) {
                if (trapError(createIOError("ENOENT"), node)) continue;
                return undefined;
            }
            if (isSymlink(node)) {
                const dirname = vpath.format(components.slice(0, step));
                const symlink = vpath.resolve(dirname, node.symlink);
                links = this._getRootLinks();
                parent = undefined;
                components = vpath.parse(symlink).concat(components.slice(step + 1));
                step = 0;
                depth++;
                retry = false;
                continue;
            }
            if (isDirectory(node)) {
                links = this._getLinks(node);
                parent = node;
                step++;
                retry = false;
                continue;
            }
            if (trapError(createIOError("ENOTDIR"), node)) continue;
            return undefined;
        }

        function trapError(error: NodeJS.ErrnoException, node?: Inode) {
            const realpath = vpath.format(components.slice(0, step + 1));
            const basename = components[step];
            const result = !retry && onError ? onError(error, { realpath, basename, parent, links, node }) : "throw";
            if (result === "stop") return false;
            if (result === "retry") {
                retry = true;
                return true;
            }
            throw error;
        }
    }

    /**
     * Resolve a path relative to the current working directory.
     */
    private _resolve(path: string) {
        return this._cwd
            ? vpath.resolve(this._cwd, vpath.validate(path, vpath.ValidationFlags.RelativeOrAbsolute | vpath.ValidationFlags.AllowWildcard))
            : vpath.validate(path, vpath.ValidationFlags.Absolute | vpath.ValidationFlags.AllowWildcard);
    }

    private _applyFiles(files: FileSet, dirname: string) {
        const deferred: [Symlink | Link | Mount, string][] = [];
        this._applyFilesWorker(files, dirname, deferred);
        for (const [entry, path] of deferred) {
            this.mkdirpSync(vpath.dirname(path));
            this.pushd(vpath.dirname(path));
            if (entry instanceof Symlink) {
                if (this.stringComparer(vpath.dirname(path), path) === 0) {
                    throw new TypeError("Roots cannot be symbolic links.");
                }
                this.symlinkSync(vpath.resolve(dirname, entry.symlink), path);
                this._applyFileExtendedOptions(path, entry);
            }
            else if (entry instanceof Link) {
                if (this.stringComparer(vpath.dirname(path), path) === 0) {
                    throw new TypeError("Roots cannot be hard links.");
                }
                this.linkSync(entry.path, path);
            }
            else {
                this.mountSync(entry.source, path, entry.resolver);
                this._applyFileExtendedOptions(path, entry);
            }
            this.popd();
        }
    }

    private _applyFileExtendedOptions(path: string, entry: Directory | File | Symlink | Mount) {
        const { meta } = entry;
        if (meta !== undefined) {
            const filemeta = this.filemeta(path);
            for (const key of Object.keys(meta)) {
                filemeta.set(key, meta[key]);
            }
        }
    }

    private _applyFilesWorker(files: FileSet, dirname: string, deferred: [Symlink | Link | Mount, string][]) {
        for (const key of Object.keys(files)) {
            const value = normalizeFileSetEntry(files[key]);
            const path = dirname ? vpath.resolve(dirname, key) : key;
            vpath.validate(path, vpath.ValidationFlags.Absolute | vpath.ValidationFlags.AllowWildcard);

            // eslint-disable-next-line no-restricted-syntax
            if (value === null || value === undefined || value instanceof Rmdir || value instanceof Unlink) {
                if (this.stringComparer(vpath.dirname(path), path) === 0) {
                    throw new TypeError("Roots cannot be deleted.");
                }
                this.rimrafSync(path);
            }
            else if (value instanceof File) {
                if (this.stringComparer(vpath.dirname(path), path) === 0) {
                    throw new TypeError("Roots cannot be files.");
                }
                this.mkdirpSync(vpath.dirname(path));
                this.writeFileSync(path, value.data, value.encoding);
                this._applyFileExtendedOptions(path, value);
            }
            else if (value instanceof Directory) {
                this.mkdirpSync(path);
                this._applyFileExtendedOptions(path, value);
                this._applyFilesWorker(value.files, path, deferred);
            }
            else {
                deferred.push([value, path]);
            }
        }
    }
}

export interface FileSystemOptions {
    // Sets the initial timestamp for new files and directories
    time?: number;

    // A set of file system entries to initially add to the file system.
    files?: FileSet;

    // Sets the initial working directory for the file system.
    cwd?: string;

    // Sets initial metadata attached to the file system.
    meta?: Record<string, any>;
}

export interface FileSystemCreateOptions extends FileSystemOptions {
    // Sets the documents to add to the file system.
    documents?: readonly documents.TextDocument[];
}

export type Axis = "ancestors" | "ancestors-or-self" | "self" | "descendants-or-self" | "descendants";

export interface Traversal {
    /** A function called to choose whether to continue to traverse to either ancestors or descendants. */
    traverse?(path: string, stats: Stats): boolean;
    /** A function called to choose whether to accept a path as part of the result. */
    accept?(path: string, stats: Stats): boolean;
}

export interface FileSystemResolver {
    statSync(path: string): { mode: number; size: number; };
    readdirSync(path: string): string[];
    readFileSync(path: string): FileDataBuffer;
}

export interface FileSystemResolverHost {
    useCaseSensitiveFileNames(): boolean;
    getAccessibleFileSystemEntries(path: string): ts.FileSystemEntries;
    directoryExists(path: string): boolean;
    fileExists(path: string): boolean;
    getFileSize(path: string): number;
    readFile(path: string): string | undefined;
    getWorkspaceRoot(): string;
}

export function createResolver(host: FileSystemResolverHost): FileSystemResolver {
    return {
        readdirSync(path: string): string[] {
            const { files, directories } = host.getAccessibleFileSystemEntries(path);
            return directories.concat(files);
        },
        statSync(path: string): { mode: number; size: number; } {
            if (host.directoryExists(path)) {
                return { mode: S_IFDIR | 0o777, size: 0 };
            }
            else if (host.fileExists(path)) {
                return { mode: S_IFREG | 0o666, size: host.getFileSize(path) };
            }
            else {
                throw new Error("ENOENT: path does not exist");
            }
        },
        readFileSync(path: string): FileDataBuffer {
            return { encoding: "utf8", data: host.readFile(path)! };
        },
    };
}

/**
 * Create a virtual file system from a physical file system using the following path mappings:
 *
 *  - `/.ts` is a directory mapped to `${workspaceRoot}/built/local`
 *  - `/.lib` is a directory mapped to `${workspaceRoot}/tests/lib`
 *  - `/.src` is a virtual directory to be used for tests.
 *
 * Unless overridden, `/.src` will be the current working directory for the virtual file system.
 */
export function createFromFileSystem(host: FileSystemResolverHost, ignoreCase: boolean, { documents, files, cwd, time, meta }: FileSystemCreateOptions = {}): FileSystem {
    const fs = getBuiltLocal(host, ignoreCase).shadow();
    if (meta) {
        for (const key of Object.keys(meta)) {
            fs.meta.set(key, meta[key]);
        }
    }
    if (time) {
        fs.time(time);
    }
    if (cwd) {
        fs.mkdirpSync(cwd);
        fs.chdir(cwd);
    }
    if (documents) {
        for (const document of documents) {
            fs.mkdirpSync(vpath.dirname(document.file));
            fs.writeFileSync(document.file, document.text, "utf8");
            fs.filemeta(document.file).set("document", document);
            // Add symlinks
            const symlink = document.meta.get("symlink");
            if (symlink) {
                for (const link of symlink.split(",").map(link => link.trim())) {
                    fs.mkdirpSync(vpath.dirname(link));
                    fs.symlinkSync(vpath.resolve(fs.cwd(), document.file), link);
                }
            }
        }
    }
    if (files) {
        fs.apply(files);
    }
    return fs;
}

export class Stats {
    public dev: number;
    public ino: number;
    public mode: number;
    public nlink: number;
    public uid: number;
    public gid: number;
    public rdev: number;
    public size: number;
    public blksize: number;
    public blocks: number;
    public atimeMs: number;
    public mtimeMs: number;
    public ctimeMs: number;
    public birthtimeMs: number;
    public atime: Date;
    public mtime: Date;
    public ctime: Date;
    public birthtime: Date;

    constructor();
    constructor(dev: number, ino: number, mode: number, nlink: number, rdev: number, size: number, blksize: number, blocks: number, atimeMs: number, mtimeMs: number, ctimeMs: number, birthtimeMs: number);
    constructor(dev = 0, ino = 0, mode = 0, nlink = 0, rdev = 0, size = 0, blksize = 0, blocks = 0, atimeMs = 0, mtimeMs = 0, ctimeMs = 0, birthtimeMs = 0) {
        this.dev = dev;
        this.ino = ino;
        this.mode = mode;
        this.nlink = nlink;
        this.uid = 0;
        this.gid = 0;
        this.rdev = rdev;
        this.size = size;
        this.blksize = blksize;
        this.blocks = blocks;
        this.atimeMs = atimeMs;
        this.mtimeMs = mtimeMs;
        this.ctimeMs = ctimeMs;
        this.birthtimeMs = birthtimeMs;
        this.atime = new Date(this.atimeMs);
        this.mtime = new Date(this.mtimeMs);
        this.ctime = new Date(this.ctimeMs);
        this.birthtime = new Date(this.birthtimeMs);
    }

    public isFile(): boolean {
        return (this.mode & S_IFMT) === S_IFREG;
    }
    public isDirectory(): boolean {
        return (this.mode & S_IFMT) === S_IFDIR;
    }
    public isSymbolicLink(): boolean {
        return (this.mode & S_IFMT) === S_IFLNK;
    }
    public isBlockDevice(): boolean {
        return (this.mode & S_IFMT) === S_IFBLK;
    }
    public isCharacterDevice(): boolean {
        return (this.mode & S_IFMT) === S_IFCHR;
    }
    public isFIFO(): boolean {
        return (this.mode & S_IFMT) === S_IFIFO;
    }
    public isSocket(): boolean {
        return (this.mode & S_IFMT) === S_IFSOCK;
    }
}

// IOErrorMessages is defined like this to reduce duplication for --isolatedDeclarations
const TemplateIOErrorMessages = {
    EACCES: "access denied",
    EIO: "an I/O error occurred",
    ENOENT: "no such file or directory",
    EEXIST: "file already exists",
    ELOOP: "too many symbolic links encountered",
    ENOTDIR: "no such directory",
    EISDIR: "path is a directory",
    EBADF: "invalid file descriptor",
    EINVAL: "invalid value",
    ENOTEMPTY: "directory not empty",
    EPERM: "operation not permitted",
    EROFS: "file system is read-only",
} as const;
export const IOErrorMessages: typeof TemplateIOErrorMessages = Object.freeze(TemplateIOErrorMessages);

export function createIOError(code: keyof typeof IOErrorMessages, details = ""): NodeJS.ErrnoException {
    const err: NodeJS.ErrnoException = new Error(`${code}: ${IOErrorMessages[code]} ${details}`);
    err.code = code;
    if (Error.captureStackTrace) Error.captureStackTrace(err, createIOError);
    return err;
}

/**
 * A template used to populate files, directories, links, etc. in a virtual file system.
 */
export interface FileSet {
    [name: string]: DirectoryLike | FileLike | Link | Symlink | Mount | Rmdir | Unlink | null | undefined; // eslint-disable-line no-restricted-syntax
}

export type DirectoryLike = FileSet | Directory;
export type FileLike = File | Buffer | string;

/** Extended options for a directory in a `FileSet` */
export class Directory {
    public readonly files: FileSet;
    public readonly meta: Record<string, any> | undefined;
    constructor(files: FileSet, { meta }: { meta?: Record<string, any>; } = {}) {
        this.files = files;
        this.meta = meta;
    }
}

/** Extended options for a file in a `FileSet` */
export class File {
    public readonly data: Buffer | string;
    public readonly encoding: string | undefined;
    public readonly meta: Record<string, any> | undefined;
    constructor(data: Buffer | string, { meta, encoding }: { encoding?: string; meta?: Record<string, any>; } = {}) {
        this.data = data;
        this.encoding = encoding;
        this.meta = meta;
    }
}

export class SameFileContentFile extends File {
    constructor(data: Buffer | string, metaAndEncoding?: { encoding?: string; meta?: Record<string, any>; }) {
        super(data, metaAndEncoding);
    }
}

export class SameFileWithModifiedTime extends File {
    constructor(data: Buffer | string, metaAndEncoding?: { encoding?: string; meta?: Record<string, any>; }) {
        super(data, metaAndEncoding);
    }
}

/** Extended options for a hard link in a `FileSet` */
export class Link {
    public readonly path: string;
    constructor(path: string) {
        this.path = path;
    }
}

/** Removes a directory in a `FileSet` */
export class Rmdir {
    public _rmdirBrand?: never; // brand necessary for proper type guards
}

/** Unlinks a file in a `FileSet` */
export class Unlink {
    public _unlinkBrand?: never; // brand necessary for proper type guards
}

/** Extended options for a symbolic link in a `FileSet` */
export class Symlink {
    public readonly symlink: string;
    public readonly meta: Record<string, any> | undefined;
    constructor(symlink: string, { meta }: { meta?: Record<string, any>; } = {}) {
        this.symlink = symlink;
        this.meta = meta;
    }
}

/** Extended options for mounting a virtual copy of an external file system via a `FileSet` */
export class Mount {
    public readonly source: string;
    public readonly resolver: FileSystemResolver;
    public readonly meta: Record<string, any> | undefined;
    constructor(source: string, resolver: FileSystemResolver, { meta }: { meta?: Record<string, any>; } = {}) {
        this.source = source;
        this.resolver = resolver;
        this.meta = meta;
    }
}

// a generic POSIX inode
type Inode = FileInode | DirectoryInode | SymlinkInode;

type FileDataBuffer = { encoding?: undefined; data: Buffer; } | { encoding: BufferEncoding; data: string; };

function ensureBufferEncoding(fileBuffer: FileDataBuffer, encoding: BufferEncoding | undefined) {
    if (fileBuffer.encoding === encoding) return;

    const buffer = !fileBuffer.encoding ? fileBuffer.data : Buffer.from(fileBuffer.data, fileBuffer.encoding);

    fileBuffer.encoding = encoding;
    fileBuffer.data = !encoding ? buffer : buffer.toString(encoding);
}

interface FileInode {
    dev: number; // device id
    ino: number; // inode id
    mode: number; // file mode
    atimeMs: number; // access time
    mtimeMs: number; // modified time
    ctimeMs: number; // status change time
    birthtimeMs: number; // creation time
    nlink: number; // number of hard links
    size?: number;
    buffer?: FileDataBuffer;
    source?: string;
    resolver?: FileSystemResolver;
    shadowRoot?: FileInode;
    meta?: collections.Metadata;
}

interface DirectoryInode {
    dev: number; // device id
    ino: number; // inode id
    mode: number; // file mode
    atimeMs: number; // access time
    mtimeMs: number; // modified time
    ctimeMs: number; // status change time
    birthtimeMs: number; // creation time
    nlink: number; // number of hard links
    links?: collections.SortedMap<string, Inode>;
    source?: string;
    resolver?: FileSystemResolver;
    shadowRoot?: DirectoryInode;
    meta?: collections.Metadata;
}

interface SymlinkInode {
    dev: number; // device id
    ino: number; // inode id
    mode: number; // file mode
    atimeMs: number; // access time
    mtimeMs: number; // modified time
    ctimeMs: number; // status change time
    birthtimeMs: number; // creation time
    nlink: number; // number of hard links
    symlink: string;
    shadowRoot?: SymlinkInode;
    meta?: collections.Metadata;
}

function isEmptyNonShadowedDirectory(node: DirectoryInode) {
    return !node.links && !node.shadowRoot && !node.resolver && !node.source;
}

function isEmptyNonShadowedFile(node: FileInode) {
    return !node.buffer && !node.shadowRoot && !node.resolver && !node.source;
}

function isFile(node: Inode | undefined): node is FileInode {
    return node !== undefined && (node.mode & S_IFMT) === S_IFREG;
}

function isDirectory(node: Inode | undefined): node is DirectoryInode {
    return node !== undefined && (node.mode & S_IFMT) === S_IFDIR;
}

function isSymlink(node: Inode | undefined): node is SymlinkInode {
    return node !== undefined && (node.mode & S_IFMT) === S_IFLNK;
}

interface WalkResult {
    realpath: string;
    basename: string;
    parent: DirectoryInode | undefined;
    links: collections.SortedMap<string, Inode>;
    node: Inode | undefined;
}

let builtLocalHost: FileSystemResolverHost | undefined;
let builtLocalCI: FileSystem | undefined;
let builtLocalCS: FileSystem | undefined;

function getBuiltLocal(host: FileSystemResolverHost, ignoreCase: boolean): FileSystem {
    if (builtLocalHost !== host) {
        builtLocalCI = undefined;
        builtLocalCS = undefined;
        builtLocalHost = host;
    }
    if (!builtLocalCI) {
        const resolver = createResolver(host);
        builtLocalCI = new FileSystem(/*ignoreCase*/ true, {
            files: {
                [builtFolder]: new Mount(vpath.resolve(host.getWorkspaceRoot(), "built/local"), resolver),
                [testLibFolder]: new Mount(vpath.resolve(host.getWorkspaceRoot(), "tests/lib"), resolver),
                [projectsFolder]: new Mount(vpath.resolve(host.getWorkspaceRoot(), "tests/projects"), resolver),
                [srcFolder]: {},
            },
            cwd: srcFolder,
            meta: { defaultLibLocation: builtFolder },
        });
        builtLocalCI.makeReadonly();
    }
    if (ignoreCase) return builtLocalCI;
    if (!builtLocalCS) {
        builtLocalCS = builtLocalCI.shadow(/*ignoreCase*/ false);
        builtLocalCS.makeReadonly();
    }
    return builtLocalCS;
}

/* eslint-disable no-restricted-syntax */
function normalizeFileSetEntry(value: FileSet[string]) {
    if (
        value === undefined ||
        value === null ||
        value instanceof Directory ||
        value instanceof File ||
        value instanceof Link ||
        value instanceof Symlink ||
        value instanceof Mount ||
        value instanceof Rmdir ||
        value instanceof Unlink
    ) {
        return value;
    }
    return typeof value === "string" || Buffer.isBuffer(value) ? new File(value) : new Directory(value);
}

export function formatPatch(patch: FileSet): string;
export function formatPatch(patch: FileSet | undefined): string | null;
export function formatPatch(patch: FileSet | undefined) {
    return patch ? formatPatchWorker("", patch) : null;
}
/* eslint-enable no-restricted-syntax */

function formatPatchWorker(dirname: string, container: FileSet): string {
    let text = "";
    for (const name of Object.keys(container)) {
        const entry = normalizeFileSetEntry(container[name]);
        const file = dirname ? vpath.combine(dirname, name) : name;
        // eslint-disable-next-line no-restricted-syntax
        if (entry === null || entry === undefined || entry instanceof Unlink) {
            text += `//// [${file}] unlink\r\n`;
        }
        else if (entry instanceof Rmdir) {
            text += `//// [${vpath.addTrailingSeparator(file)}] rmdir\r\n`;
        }
        else if (entry instanceof Directory) {
            text += formatPatchWorker(file, entry.files);
        }
        else if (entry instanceof SameFileWithModifiedTime) {
            text += `//// [${file}] file changed its modified time\r\n`;
        }
        else if (entry instanceof SameFileContentFile) {
            text += `//// [${file}] file written with same contents\r\n`;
        }
        else if (entry instanceof File) {
            const content = typeof entry.data === "string" ? entry.data : entry.data.toString("utf8");
            text += `//// [${file}]\r\n${content}\r\n\r\n`;
        }
        else if (entry instanceof Link) {
            text += `//// [${file}] link(${entry.path})\r\n`;
        }
        else if (entry instanceof Symlink) {
            text += `//// [${file}] symlink(${entry.symlink})\r\n`;
        }
        else if (entry instanceof Mount) {
            text += `//// [${file}] mount(${entry.source})\r\n`;
        }
    }
    return text;
}

export function iteratePatch(patch: FileSet | undefined): IterableIterator<[string, string]> | null { // eslint-disable-line no-restricted-syntax
    // eslint-disable-next-line no-restricted-syntax
    return patch ? Harness.Compiler.iterateOutputs(iteratePatchWorker("", patch)) : null;
}

function* iteratePatchWorker(dirname: string, container: FileSet): IterableIterator<documents.TextDocument> {
    for (const name of Object.keys(container)) {
        const entry = normalizeFileSetEntry(container[name]);
        const file = dirname ? vpath.combine(dirname, name) : name;
        if (entry instanceof Directory) {
            yield* iteratePatchWorker(file, entry.files);
        }
        else if (entry instanceof File) {
            const content = typeof entry.data === "string" ? entry.data : entry.data.toString("utf8");
            yield new documents.TextDocument(file, content);
        }
    }
}
