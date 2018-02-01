"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants = require("./constants");
const vpath = require("@typescript/vfs-path");
const core = require("@typescript/vfs-core");
const vfs_errors_1 = require("@typescript/vfs-errors");
const inode_1 = require("./inode");
const fileSet_1 = require("./fileSet");
const stats_1 = require("./stats");
const watcher_1 = require("./watcher");
const _throw = (e) => { throw e; };
const RWX_OK = constants.R_OK | constants.W_OK | constants.X_OK;
let devCount = 0; // A monotonically increasing count of device ids
let inoCount = 0; // A monotonically increasing count of inodes
let fdCount = 0; // A monotonically increasing count of file descriptors
let wdCount = 0; // A monotonically increasing count of watch descriptors
let cookieCount = 0; // A monotonically increasing count of watch event cookies
/**
 * Represents a virtual POSIX-like file system.
 */
class FileSystem {
    constructor(ignoreCase, options = {}) {
        // lazy-initialized state that should be mutable even if the FileSystem is frozen.
        this._lazy = {};
        this._openFiles = new Map();
        const { uid = 0, gid = 0, umask = 0o022, time = -1, timers, files, meta, noRecursiveWatchers = false } = options;
        this.ignoreCase = ignoreCase;
        this.stringComparer = this.ignoreCase ? vpath.compareCaseInsensitive : vpath.compareCaseSensitive;
        this._uid = uid;
        this._gid = gid;
        this._umask = umask;
        this._time = time;
        this._timers = timers || { setInterval, clearInterval };
        this._noRecursiveWatchers = noRecursiveWatchers;
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
            vpath.validate(cwd, 2017 /* Absolute */);
            this.mkdirpSync(cwd, /*mode*/ 0o777);
        }
        this._cwd = cwd || "";
    }
    /**
     * Gets metadata for this `FileSystem`.
     */
    get meta() {
        if (!this._lazy.meta) {
            this._lazy.meta = new core.Metadata(this._shadowRoot ? this._shadowRoot.meta : undefined);
        }
        return this._lazy.meta;
    }
    /**
     * Gets a value indicating whether the file system is read-only.
     */
    get isReadonly() {
        return Object.isFrozen(this);
    }
    /**
     * Makes the file system read-only.
     */
    makeReadonly() {
        Object.freeze(this);
        return this;
    }
    /**
     * Gets the file system shadowed by this file system.
     */
    get shadowRoot() {
        return this._shadowRoot;
    }
    /**
     * Gets a shadow of this file system.
     */
    shadow(ignoreCase = this.ignoreCase) {
        if (!this.isReadonly)
            throw new Error("Cannot shadow a mutable file system.");
        if (ignoreCase && !this.ignoreCase)
            throw new Error("Cannot create a case-insensitive file system from a case-sensitive one.");
        const fs = new FileSystem(ignoreCase, {
            uid: this._uid,
            gid: this._gid,
            umask: this._umask,
            time: this._time,
        });
        fs._shadowRoot = this;
        fs._cwd = this._cwd;
        return fs;
    }
    /**
     * Gets the metadata object for a path.
     * @param path
     */
    filemeta(path) {
        path = this._resolve(path);
        const { node } = this._find(path) || _throw(new vfs_errors_1.IOError("ENOENT", "scandir", path));
        return this._filemeta(node);
    }
    _filemeta(node) {
        if (!node.meta) {
            const parentMeta = node.shadowRoot && this._shadowRoot && this._shadowRoot._filemeta(node.shadowRoot);
            node.meta = new core.Metadata(parentMeta);
        }
        return node.meta;
    }
    /**
     * Gets the user ID to use for file system access.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/getuid.html
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/geteuid.html
     */
    getuid() {
        return this._uid;
    }
    /**
     * Sets the user ID to use for file system access.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/setuid.html
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/seteuid.html
     */
    setuid(value) {
        if (this.isReadonly)
            throw new vfs_errors_1.IOError("EPERM", "setuid");
        this._uid = value;
    }
    /**
     * Gets the group ID to use for file system access.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/getgid.html
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/getegid.html
     */
    getgid() {
        return this._gid;
    }
    /**
     * Sets the group ID to use for file system access.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/setgid.html
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/setegid.html
     */
    setgid(value) {
        if (this.isReadonly)
            throw new vfs_errors_1.IOError("EPERM", "setgid");
        this._gid = value;
    }
    /**
     * Gets or sets the virtual process's file mode creation mask (umask)
     * to `mask & 0o777` and returns the previous value of the mask.
     *
     * @link http://man7.org/linux/man-pages/man2/umask.2.html
     */
    umask(value) {
        if (value !== undefined && this.isReadonly)
            throw new vfs_errors_1.IOError("EPERM", "umask");
        const result = this._umask;
        if (value !== undefined) {
            this._umask = value;
        }
        return result;
    }
    /**
     * Gets or sets the timestamp (in milliseconds) used for file status, returning the previous timestamp.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/time.html
     */
    time(value) {
        if (value !== undefined && this.isReadonly)
            throw new vfs_errors_1.IOError("EPERM");
        let result = this._time;
        if (typeof result === "function")
            result = result();
        if (typeof result === "object")
            result = result.getTime();
        if (result === -1)
            result = Date.now();
        if (value !== undefined) {
            this._time = value;
        }
        return result;
    }
    /**
     * Get the pathname of the current working directory.
     *
     * @link - http://pubs.opengroup.org/onlinepubs/9699919799/functions/getcwd.html
     */
    cwd() {
        if (!this._cwd)
            throw new Error("The current working directory has not been set.");
        const { node } = this._find(this._cwd) || _throw(new vfs_errors_1.IOError("ENOENT", "getcwd"));
        if (!inode_1.isDirectoryInode(node))
            throw new vfs_errors_1.IOError("ENOTDIR", "getcwd");
        if (!this._access(node, constants.X_OK))
            throw new vfs_errors_1.IOError("EPERM", "getcwd");
        return this._cwd;
    }
    /**
     * Changes the current working directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chdir.html
     */
    chdir(path) {
        if (this.isReadonly)
            throw new vfs_errors_1.IOError("EPERM", "chdir", path);
        path = this._resolve(path);
        const { node } = this._find(path) || _throw(new vfs_errors_1.IOError("ENOENT", "chdir", path));
        if (!inode_1.isDirectoryInode(node))
            throw new vfs_errors_1.IOError("ENOTDIR", "chdir", path);
        if (this._cwd !== path) {
            this._cwd = path;
        }
    }
    /**
     * Pushes the current directory onto the directory stack and changes the current working directory to the supplied path.
     */
    pushd(path) {
        if (this.isReadonly)
            throw new vfs_errors_1.IOError("EPERM", "chdir", path);
        if (path)
            path = this._resolve(path);
        if (this._cwd) {
            if (!this._dirStack)
                this._dirStack = [];
            this._dirStack.push(this._cwd);
        }
        if (path && path !== this._cwd) {
            this.chdir(path);
        }
    }
    /**
     * Pops the previous directory from the location stack and changes the current directory to that directory.
     */
    popd() {
        if (this.isReadonly)
            throw new vfs_errors_1.IOError("EPERM", "popd");
        const path = this._dirStack && this._dirStack.pop();
        if (path) {
            this.chdir(path);
        }
    }
    /**
     * Apply a file map to the file system.
     */
    apply(files) {
        this._applyFiles(files, this._cwd);
    }
    /**
     * Recursively remove all files and directories underneath the provided path.
     */
    rimrafSync(path) {
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
            if (e.code === "ENOENT")
                return;
            throw e;
        }
    }
    access(path, mode, callback) {
        if (typeof mode === "function")
            callback = mode, mode = undefined;
        if (!callback)
            throw new vfs_errors_1.IOError("EINVAL");
        try {
            this.accessSync(path, mode);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Checks whether the calling process can access the file `path`. If `path` is a symbolic link, it is dereferenced.
     * @param mode One or more of the constants `F_OK`, `R_OK`, `W_OK`, or `X_OK`.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/access.html
     */
    accessSync(path, mode = constants.F_OK) {
        path = this._resolve(path);
        if (!isFinite(mode) || (mode & ~RWX_OK))
            throw new vfs_errors_1.IOError("EINVAL", "access", path);
        const { node } = this._find(path) || _throw(new vfs_errors_1.IOError("ENOENT", "access", path));
        if (!this._access(node, mode))
            throw new vfs_errors_1.IOError("EACCES", "access", path);
    }
    _access(node, mode) {
        let flags = (node.mode & constants.S_IRWXO) >> 0;
        if (this.getgid() === node.gid)
            flags |= (node.mode & constants.S_IRWXG) >> 3;
        if (this.getuid() === node.uid)
            flags |= (node.mode & constants.S_IRWXU) >> 6;
        return (flags & mode) === mode;
    }
    /**
     * Changes the permissions of a file. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chmod.html
     */
    chmod(path, mode, callback) {
        try {
            this.chmodSync(path, mode);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Changes the permissions of a file. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chmod.html
     */
    chmodSync(path, mode) {
        path = this._resolve(path);
        this._chmod("chmod", this._find(path) || _throw(new vfs_errors_1.IOError("ENOENT", "chmod", path)), mode, path);
    }
    /**
     * Changes the permissions of a file. Like `chmod`, except symbolic links are not dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chmod.html
     */
    lchmod(path, mode, callback) {
        try {
            this.lchmodSync(path, mode);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Changes the permissions of a file. Like `chmod`, except symbolic links are not dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chmod.html
     */
    lchmodSync(path, mode) {
        path = this._resolve(path);
        this._chmod("lchmod", this._lfind(path) || _throw(new vfs_errors_1.IOError("ENOENT", "lchmod", path)), mode, path);
    }
    /**
     * Changes the permissions of an open file
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/fchmod.html
     */
    fchmod(fd, mode, callback) {
        try {
            this.fchmodSync(fd, mode);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Changes the permissions of an open file
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/fchmod.html
     */
    fchmodSync(fd, mode) {
        this._chmod("fchmod", this._file("fchmod", fd), mode);
    }
    _chmod(syscall, entry, mode, path) {
        if (!isFinite(mode))
            throw new vfs_errors_1.IOError("EINVAL", syscall, path);
        if (this._uid !== 0 && this._uid !== entry.node.uid)
            throw new vfs_errors_1.IOError("EPERM", syscall, path);
        if (this.isReadonly)
            throw new vfs_errors_1.IOError("EROFS", syscall, path);
        entry.node.mode = (entry.node.mode & constants.S_IFMT) | (mode & 0o7777);
        entry.node.ctimeMs = this.time();
        this._notifySelf(entry.node, "rename");
    }
    /**
     * Changes the ownership of a file. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chown.html
     */
    chown(path, uid, gid, callback) {
        try {
            this.chownSync(path, uid, gid);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Changes the ownership of a file. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chown.html
     */
    chownSync(path, uid, gid) {
        path = this._resolve(path);
        this._chown("chown", this._find(path) || _throw(new vfs_errors_1.IOError("ENOENT", "chown", path)), uid, gid, path);
    }
    /**
     * Changes the ownership of a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/lchown.html
     */
    lchown(path, uid, gid, callback) {
        try {
            this.lchownSync(path, uid, gid);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Changes the ownership of a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/lchown.html
     */
    lchownSync(path, uid, gid) {
        path = this._resolve(path);
        this._chown("lchown", this._lfind(path) || _throw(new vfs_errors_1.IOError("ENOENT", "lchown", path)), uid, gid, path);
    }
    /**
     * Changes the ownership of an open file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/fchown.html
     */
    fchown(fd, uid, gid, callback) {
        try {
            this.fchownSync(fd, uid, gid);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Changes the ownership of an open file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/fchown.html
     */
    fchownSync(fd, uid, gid) {
        this._chown("fchown", this._file("fchown", fd), uid, gid);
    }
    _chown(syscall, entry, uid, gid, path) {
        if (!isFinite(uid) || !isFinite(gid))
            throw new vfs_errors_1.IOError("EINVAL", syscall, path);
        if (uid === entry.node.uid)
            uid = -1;
        if (gid === entry.node.gid)
            gid = -1;
        if (uid === -1 && gid === -1)
            return;
        if (uid !== -1 && this._uid !== 0)
            throw new vfs_errors_1.IOError("EPERM", syscall, path);
        if (gid !== -1 && this._uid !== 0 && this._uid !== entry.node.uid)
            throw new vfs_errors_1.IOError("EPERM", syscall, path);
        if (this.isReadonly)
            throw new vfs_errors_1.IOError("EROFS", syscall, path);
        if (uid !== -1)
            entry.node.uid = uid;
        if (gid !== -1)
            entry.node.gid = gid;
        entry.node.mode &= ~(constants.S_ISGID | constants.S_ISUID);
        entry.node.ctimeMs = this.time();
        this._notifySelf(entry.node, "rename");
    }
    /**
     * Sets file access and modification times. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/utimes.html
     */
    utimes(path, atime, mtime, callback) {
        try {
            this.utimesSync(path, atime, mtime);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Sets file access and modification times. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/utimes.html
     */
    utimesSync(path, atime, mtime) {
        path = this._resolve(path);
        this._utimes("utimes", this._find(path) || _throw(new vfs_errors_1.IOError("ENOENT", "utimes", path)), atime, mtime, path);
    }
    /**
     * Sets file access and modification times. If `path` is a symbolic link, it is not dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/utimes.html
     */
    lutimes(path, atime, mtime, callback) {
        try {
            this.lutimesSync(path, atime, mtime);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Sets file access and modification times. If `path` is a symbolic link, it is not dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/utimes.html
     */
    lutimesSync(path, atime, mtime) {
        path = this._resolve(path);
        this._utimes("lutimes", this._lfind(path) || _throw(new vfs_errors_1.IOError("ENOENT", "lutimes", path)), atime, mtime, path);
    }
    /**
     * Sets file access and modification times.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/futimes.html
     */
    futimes(fd, atime, mtime, callback) {
        try {
            this.futimesSync(fd, atime, mtime);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Sets file access and modification times.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/futimes.html
     */
    futimesSync(fd, atime, mtime) {
        this._utimes("futimes", this._file("futimes", fd), atime, mtime);
    }
    _utimes(syscall, entry, atime, mtime, path) {
        if (this.isReadonly)
            throw new vfs_errors_1.IOError("EROFS", syscall, path);
        const atimeMs = typeof atime === "number" ? atime : atime.getTime();
        const mtimeMs = typeof mtime === "number" ? mtime : mtime.getTime();
        if (!isFinite(atimeMs) || !isFinite(mtimeMs))
            throw new vfs_errors_1.IOError("EINVAL", syscall, path);
        entry.node.atimeMs = atimeMs;
        entry.node.mtimeMs = mtimeMs;
        entry.node.ctimeMs = this.time();
        this._notifySelf(entry.node, "rename");
    }
    fsync(fd, callback) {
        try {
            this.fsyncSync(fd);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    fsyncSync(fd) {
        this._fsync(this._file("fsync", fd, "file"), /*metadata*/ true);
    }
    fdatasync(fd, callback) {
        try {
            this.fdatasyncSync(fd);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    fdatasyncSync(fd) {
        this._fsync(this._file("fsyncdata", fd, "file"), /*metadata*/ false);
    }
    _fsync(entry, metadata) {
        if (inode_1.isFileInode(entry.node) && entry.buffer && entry.buffer !== entry.node.buffer) {
            const time = this.time();
            entry.node.buffer = entry.buffer;
            entry.node.mtimeMs = time;
            entry.node.ctimeMs = time;
            if (metadata) {
                entry.node.size = entry.node.buffer.byteLength;
            }
            this._notifySelf(entry.node, "change");
        }
    }
    /**
     * Get file status. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/stat.html
     */
    stat(path, callback) {
        try {
            process.nextTick(callback, null, this.statSync(path));
        }
        catch (e) {
            process.nextTick(callback, e, null);
        }
    }
    /**
     * Get file status. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/stat.html
     */
    statSync(path) {
        path = this._resolve(path);
        return this._stat("stat", this._find(path) || _throw(new vfs_errors_1.IOError("ENOENT", "stat", path)), path);
    }
    /**
     * Get file status.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/lstat.html
     */
    lstat(path, callback) {
        try {
            process.nextTick(callback, null, this.lstatSync(path));
        }
        catch (e) {
            process.nextTick(callback, e, null);
        }
    }
    /**
     * Get file status.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/lstat.html
     */
    lstatSync(path) {
        path = this._resolve(path);
        return this._stat("lstat", this._lfind(path) || _throw(new vfs_errors_1.IOError("ENOENT", "lstat", path)), path);
    }
    /**
     * Get file status.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/fstat.html
     */
    fstat(fd, callback) {
        try {
            process.nextTick(callback, null, this.fstatSync(fd));
        }
        catch (e) {
            process.nextTick(callback, e, null);
        }
    }
    /**
     * Get file status.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/fstat.html
     */
    fstatSync(fd) {
        return this._stat("fstat", this._file("fstat", fd));
    }
    _stat(syscall, entry, path) {
        const node = entry.node;
        return new stats_1.Stats(node.dev, node.ino, node.mode, node.nlink, node.uid, node.gid, 
        /*rdev*/ 0, 
        /*size*/ inode_1.isFileInode(node) ? this._getSize(node) : inode_1.isSymlinkInode(node) ? node.symlink.length : 0, 
        /*blksize*/ 4096, 
        /*blocks*/ 0, node.atimeMs, node.mtimeMs, node.ctimeMs, node.birthtimeMs);
    }
    scanSync(path, axis, traversal) {
        path = this._resolve(path);
        const results = [];
        this._scan(path, this.statSync(path), axis, traversal, /*noFollow*/ false, results);
        return results;
    }
    lscanSync(path, axis, traversal) {
        path = this._resolve(path);
        const results = [];
        this._scan(path, this.statSync(path), axis, traversal, /*noFollow*/ true, results);
        return results;
    }
    _scan(path, stats, axis, traversal, noFollow, results) {
        if (axis === "ancestors-or-self" || axis === "self" || axis === "descendants-or-self") {
            if (!traversal.accept || traversal.accept(path, stats)) {
                results.push(path);
            }
        }
        if (axis === "ancestors-or-self" || axis === "ancestors") {
            const dirname = vpath.dirname(path);
            if (dirname !== path) {
                try {
                    const stats = this._stat("scandir", this._walk(dirname, noFollow) || _throw(new vfs_errors_1.IOError("ENOENT", "scandir", dirname)));
                    if (!traversal.traverse || traversal.traverse(dirname, stats)) {
                        this._scan(dirname, stats, "ancestors-or-self", traversal, noFollow, results);
                    }
                }
                catch (_a) { }
            }
        }
        if (axis === "descendants-or-self" || axis === "descendants") {
            if (stats.isDirectory() && (!traversal.traverse || traversal.traverse(path, stats))) {
                for (const file of this.readdirSync(path)) {
                    try {
                        const childpath = vpath.combine(path, file);
                        const stats = this._stat("scandir", this._walk(childpath, noFollow) || _throw(new vfs_errors_1.IOError("ENOENT", "scandir", childpath)));
                        this._scan(childpath, stats, "descendants-or-self", traversal, noFollow, results);
                    }
                    catch (_b) { }
                }
            }
        }
    }
    /**
     * Read a directory. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/readdir.html
     */
    readdir(path, callback) {
        try {
            process.nextTick(callback, null, this.readdirSync(path));
        }
        catch (e) {
            process.nextTick(callback, e, null);
        }
    }
    /**
     * Read a directory. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/readdir.html
     */
    readdirSync(path) {
        path = this._resolve(path);
        const { node } = this._find(path) || _throw(new vfs_errors_1.IOError("ENOENT", "readdir", path));
        if (!inode_1.isDirectoryInode(node))
            throw new vfs_errors_1.IOError("ENOTDIR", "readdir", path);
        if (!this._access(node, constants.R_OK))
            throw new vfs_errors_1.IOError("EACCES", "readdir", path);
        return Array.from(this._getLinks(node).keys());
    }
    mount(source, target, resolver, mode, callback) {
        if (typeof mode === "function")
            callback = mode, mode = undefined;
        if (typeof callback !== "function")
            throw new vfs_errors_1.IOError("EINVAL");
        try {
            this.mountSync(source, target, resolver, mode);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Mounts a physical or virtual file system at a location in this virtual file system.
     *
     * @param source The path in the physical (or other virtual) file system.
     * @param target The path in this virtual file system.
     * @param resolver An object used to resolve files in `source`.
     */
    mountSync(source, target, resolver, mode = 0o777) {
        source = vpath.validate(source, 2017 /* Absolute */);
        target = this._resolve(target);
        mode = mode & 0o1777; // allows S_ISVTX bit
        let parent;
        let name;
        // special case for FS root
        if (this.stringComparer(vpath.dirname(target), target) === 0) {
            if (this.getuid() !== 0)
                throw new vfs_errors_1.IOError("EPERM", "mount", source, target);
            name = target;
        }
        else {
            const entry = this._find(vpath.dirname(target)) || _throw(new vfs_errors_1.IOError("ENOENT", "mount", source, target));
            if (!inode_1.isDirectoryInode(entry.node))
                throw new vfs_errors_1.IOError("ENOTDIR", "mount", source, target);
            if (!this._access(entry.node, constants.W_OK))
                throw new vfs_errors_1.IOError("EACCES", "mount", source, target);
            parent = entry.node;
            name = vpath.basename(target);
        }
        const links = this._getLinks(parent);
        if (links.has(name))
            throw new vfs_errors_1.IOError("EEXIST", "mount", source, target);
        if (this.isReadonly)
            throw new vfs_errors_1.IOError("EROFS", "mount", source, target);
        const node = parent
            ? this._mknod(parent.dev, constants.S_IFDIR, mode)
            : this._mknod(++devCount, constants.S_IFDIR, mode, /*uid*/ 0, /*gid*/ 0, /*umask*/ 0o000);
        node.source = source;
        node.resolver = resolver;
        this._addLink(parent, links, name, node);
        if (parent) {
            parent.mtimeMs = this.time();
            this._notifyChild(parent, "rename", name);
            this._notifyAncestors(parent, "change");
        }
        else if (!this._cwd) {
            this._cwd = name;
        }
    }
    mkdir(path, mode, callback) {
        if (typeof mode === "function")
            callback = mode, mode = undefined;
        if (typeof callback !== "function")
            throw new vfs_errors_1.IOError("EINVAL");
        try {
            this.mkdirSync(path, mode);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Make a directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/mkdir.html
     */
    mkdirSync(path, mode = 0o777) {
        path = this._resolve(path);
        if (!isFinite(mode))
            throw new vfs_errors_1.IOError("EINVAL", "mkdir", path);
        mode = mode & 0o1777; // allows S_ISVTX bit
        let parent;
        let name;
        // special case for FS root
        if (this.stringComparer(vpath.dirname(path), path) === 0) {
            if (this.getuid() !== 0)
                throw new vfs_errors_1.IOError("EPERM", "mkdir", path);
            name = path;
        }
        else {
            const parentEntry = this._find(vpath.dirname(path)) || _throw(new vfs_errors_1.IOError("ENOENT", "mkdir", path));
            if (!inode_1.isDirectoryInode(parentEntry.node))
                throw new vfs_errors_1.IOError("ENOTDIR", "mkdir", path);
            if (!this._access(parentEntry.node, constants.W_OK))
                throw new vfs_errors_1.IOError("EACCES", "mkdir", path);
            parent = parentEntry.node;
            name = vpath.basename(path);
        }
        const links = this._getLinks(parent);
        if (links.has(name))
            throw new vfs_errors_1.IOError("EEXIST", "mkdir", path);
        if (this.isReadonly)
            throw new vfs_errors_1.IOError("EROFS", "mkdir", path);
        const node = parent
            ? this._mknod(parent.dev, constants.S_IFDIR, mode)
            : this._mknod(++devCount, constants.S_IFDIR, mode, /*uid*/ 0, /*gid*/ 0, /*umask*/ 0o000);
        if (parent && parent.mode & constants.S_ISGID) {
            node.mode |= constants.S_ISGID;
            node.gid = parent.gid;
        }
        this._addLink(parent, links, name, node);
        if (parent) {
            parent.mtimeMs = this.time();
            this._notifyChild(parent, "rename", name);
            this._notifyAncestors(parent, "change");
        }
        else if (!this._cwd) {
            this._cwd = name;
        }
    }
    mkdirp(path, mode, callback) {
        if (typeof mode === "function")
            callback = mode, mode = undefined;
        if (typeof callback !== "function")
            throw new vfs_errors_1.IOError("EINVAL");
        try {
            this.mkdirpSync(path, mode);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Make a directory and all of its parent paths (if they don't exist).
     */
    mkdirpSync(path, mode = 0o777) {
        path = this._resolve(path);
        try {
            this.mkdirSync(path, mode);
        }
        catch (e) {
            if (e.code === "ENOENT") {
                this.mkdirpSync(vpath.dirname(path), mode);
                this.mkdirSync(path, mode);
            }
            else if (e.code !== "EEXIST") {
                throw e;
            }
        }
    }
    /**
     * Remove a directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rmdir.html
     */
    rmdir(path, callback) {
        try {
            this.rmdirSync(path);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Remove a directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rmdir.html
     */
    rmdirSync(path) {
        path = this._resolve(path);
        const { parent, node, basename } = this._find(path) || _throw(new vfs_errors_1.IOError("ENOENT", "rmdir", path));
        if (!inode_1.isDirectoryInode(node))
            throw new vfs_errors_1.IOError("ENOTDIR", "rmdir", path);
        if (this._getLinks(node).size !== 0)
            throw new vfs_errors_1.IOError("ENOTEMPTY", "rmdir", path);
        if (!this._access(parent, constants.W_OK))
            throw new vfs_errors_1.IOError("EACCES", "mkdir", path);
        if (this.isReadonly)
            throw new vfs_errors_1.IOError("EROFS", "rmdir", path);
        const name = vpath.basename(path);
        const links = this._getLinks(parent);
        this._removeLink(parent, links, name, node);
        const time = this.time();
        parent.mtimeMs = time;
        node.ctimeMs = time;
        this._invalidatePaths(node);
        this._notifyChild(parent, "rename", basename);
        this._notifyAncestors(parent, "change");
        this._removeWatchers(parent, node, basename);
    }
    /**
     * Link one file to another file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/link.html
     */
    link(oldpath, newpath, callback) {
        try {
            this.linkSync(oldpath, newpath);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Link one file to another file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/link.html
     */
    linkSync(oldpath, newpath) {
        oldpath = this._resolve(oldpath);
        newpath = this._resolve(newpath);
        const { node, basename: oldBasename } = this._find(oldpath) || _throw(new vfs_errors_1.IOError("ENOENT", "link", oldpath, newpath));
        if (inode_1.isDirectoryInode(node))
            throw new vfs_errors_1.IOError("EPERM", "link", oldpath, newpath);
        const { node: newParent } = this._find(vpath.dirname(newpath)) || _throw(new vfs_errors_1.IOError("ENOENT", "link", oldpath, newpath));
        if (!inode_1.isDirectoryInode(newParent))
            throw new vfs_errors_1.IOError("ENOTDIR", "link", oldpath, newpath);
        const newParentLinks = this._getLinks(newParent);
        const newBasename = vpath.basename(newpath);
        if (newParentLinks.has(newBasename))
            throw new vfs_errors_1.IOError("EEXIST", "link", oldpath, newpath);
        if (!this._access(newParent, constants.W_OK))
            throw new vfs_errors_1.IOError("EACCES", "link", oldpath, newpath);
        if (this.isReadonly)
            throw new vfs_errors_1.IOError("EROFS", "link", oldpath, newpath);
        this._addLink(newParent, newParentLinks, newBasename, node);
        const time = this.time();
        newParent.mtimeMs = time;
        node.ctimeMs = time;
        this._invalidatePaths(node);
        this._notifyChild(newParent, "rename", newBasename);
        this._notifyAncestors(newParent, "change");
    }
    /**
     * Remove a directory entry.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/unlink.html
     */
    unlink(path, callback) {
        try {
            this.unlinkSync(path);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Remove a directory entry.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/unlink.html
     */
    unlinkSync(path) {
        path = this._resolve(path);
        const { parent, node, basename } = this._lfind(path) || _throw(new vfs_errors_1.IOError("ENOENT", "unlink", path));
        if (inode_1.isDirectoryInode(node))
            throw new vfs_errors_1.IOError("EISDIR", "unlink", path);
        if (!this._access(parent, constants.W_OK))
            throw new vfs_errors_1.IOError("EACCES", "unlink", path);
        if (this.isReadonly)
            throw new vfs_errors_1.IOError("EROFS", "unlink", path);
        const links = this._getLinks(parent);
        this._removeLink(parent, links, basename, node);
        const time = this.time();
        parent.mtimeMs = time;
        node.ctimeMs = time;
        this._invalidatePaths(node);
        this._notifyChild(parent, "rename", basename);
        this._notifyAncestors(parent, "change");
        this._removeWatchers(parent, node, basename);
    }
    /**
     * Rename a file
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rename.html
     */
    rename(oldpath, newpath, callback) {
        try {
            this.renameSync(oldpath, newpath);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Rename a file
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rename.html
     */
    renameSync(oldpath, newpath) {
        oldpath = this._resolve(oldpath);
        newpath = this._resolve(newpath);
        const { parent: oldParent, node, basename: oldBasename } = this._lfind(oldpath) || _throw(new vfs_errors_1.IOError("ENOENT", "rename", oldpath, newpath));
        const { node: newParent } = this._find(vpath.dirname(newpath)) || _throw(new vfs_errors_1.IOError("ENOENT", "rename", oldpath, newpath));
        if (!inode_1.isDirectoryInode(newParent))
            throw new vfs_errors_1.IOError("ENOTDIR", "rename", oldpath, newpath);
        const newBasename = vpath.basename(newpath);
        const newParentLinks = this._getLinks(newParent);
        const existingNode = newParentLinks.get(newBasename);
        if (existingNode) {
            if (inode_1.isDirectoryInode(node)) {
                if (!inode_1.isDirectoryInode(existingNode))
                    throw new vfs_errors_1.IOError("ENOTDIR", "rename", oldpath, newpath);
                if (this._getLinks(existingNode).size > 0)
                    throw new vfs_errors_1.IOError("ENOTEMPTY", "rename", oldpath, newpath);
            }
            else {
                if (inode_1.isDirectoryInode(existingNode))
                    throw new vfs_errors_1.IOError("EISDIR", "rename", oldpath, newpath);
            }
        }
        if (!this._access(oldParent, constants.W_OK))
            throw new vfs_errors_1.IOError("EACCES", "rename", oldpath, newpath);
        if (!this._access(newParent, constants.W_OK))
            throw new vfs_errors_1.IOError("EACCES", "rename", oldpath, newpath);
        if (this.isReadonly)
            throw new vfs_errors_1.IOError("EROFS", "rename", oldpath, newpath);
        const time = this.time();
        if (existingNode) {
            this._removeLink(newParent, newParentLinks, newBasename, existingNode);
            this._invalidatePaths(existingNode);
            existingNode.ctimeMs = time;
            this._notifyChild(newParent, "rename", newBasename);
            this._removeWatchers(newParent, existingNode, newBasename);
        }
        const oldParentLinks = this._getLinks(oldParent);
        this._replaceLink(oldParent, oldParentLinks, oldBasename, newParent, newParentLinks, newBasename, node);
        oldParent.mtimeMs = time;
        newParent.mtimeMs = time;
        this._invalidatePaths(node);
        const cookie = ++cookieCount;
        this._notifyChild(oldParent, "rename", oldBasename);
        this._notifyChild(newParent, "rename", newBasename);
        this._notifyAncestors(newParent, "change");
        if (newParent !== oldParent) {
            this._notifyAncestors(oldParent, "change");
        }
    }
    /**
     * Make a symbolic link
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/symlink.html
     */
    symlink(target, linkpath, callback) {
        try {
            this.symlinkSync(target, linkpath);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Make a symbolic link
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/symlink.html
     */
    symlinkSync(target, linkpath) {
        target = vpath.validate(target, 2016 /* RelativeOrAbsolute */);
        linkpath = this._resolve(linkpath);
        const dirname = vpath.dirname(linkpath);
        const { node: parent } = this._find(dirname) || _throw(new vfs_errors_1.IOError("ENOENT", "symlink", target, linkpath));
        if (!inode_1.isDirectoryInode(parent))
            throw new vfs_errors_1.IOError("ENOTDIR", "symlink", target, linkpath);
        const basename = vpath.basename(linkpath);
        const parentLinks = this._getLinks(parent);
        if (parentLinks.has(basename))
            throw new vfs_errors_1.IOError("EEXIST", "symlink", target, linkpath);
        if (!this._access(parent, constants.W_OK))
            throw new vfs_errors_1.IOError("EACCES", "symlink", target, linkpath);
        if (this.isReadonly)
            throw new vfs_errors_1.IOError("EROFS", "symlink", target, linkpath);
        const node = this._mknod(parent.dev, constants.S_IFLNK, 0o666);
        node.symlink = target;
        this._addLink(parent, parentLinks, basename, node);
        const time = this.time();
        parent.mtimeMs = time;
        this._notifyChild(parent, "rename", basename);
        this._notifyAncestors(parent, "change");
    }
    /**
     * Read the contents of a symbolic link
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/readlink.html
     */
    readlink(path, callback) {
        try {
            process.nextTick(callback, null, this.readlinkSync(path));
        }
        catch (e) {
            process.nextTick(callback, e, null);
        }
    }
    /**
     * Read the contents of a symbolic link
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/readlink.html
     */
    readlinkSync(path) {
        path = this._resolve(path);
        const { node } = this._lfind(path) || _throw(new vfs_errors_1.IOError("ENOENT", "readlink", path));
        if (!inode_1.isSymlinkInode(node))
            throw new vfs_errors_1.IOError("EINVAL", "readlink", path);
        return node.symlink;
    }
    /**
     * Resolve a pathname
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/realpath.html
     */
    realpath(path, callback) {
        try {
            process.nextTick(callback, null, this.realpathSync(path));
        }
        catch (e) {
            process.nextTick(callback, e, null);
        }
    }
    /**
     * Resolve a pathname
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/realpath.html
     */
    realpathSync(path) {
        path = this._resolve(path);
        const entry = this._find(path) || _throw(new vfs_errors_1.IOError("ENOENT", "realpath", path));
        return entry.path;
    }
    open(path, flags, mode, callback) {
        if (typeof mode === "function")
            callback = mode, mode = undefined;
        if (typeof callback !== "function")
            throw new vfs_errors_1.IOError("EINVAL");
        try {
            process.nextTick(callback, null, this.openSync(path, flags, mode));
        }
        catch (e) {
            process.nextTick(callback, e, null);
        }
    }
    /**
     * Open a file
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/open.html
     */
    openSync(path, flags, mode = 0o666) {
        path = this._resolve(path);
        flags = parseFlags(flags);
        if (!isFinite(flags) || !isFinite(mode))
            throw new vfs_errors_1.IOError("EINVAL", "open", path);
        const read = (flags & constants.O_ACCMODE) !== constants.O_WRONLY;
        const write = flags & constants.O_ACCMODE && flags & constants.O_CREAT | constants.O_TRUNC;
        if (write && this.isReadonly)
            throw new vfs_errors_1.IOError("EROFS", "open", path);
        const basename = vpath.basename(path);
        const entry = this._walk(path, /*noFollow*/ !!(flags & constants.O_NOFOLLOW));
        let node;
        let parent;
        if (!entry) {
            if (~flags & constants.O_CREAT)
                throw new vfs_errors_1.IOError("ENOENT", "open", path);
            if (flags & constants.O_DIRECTORY)
                throw new vfs_errors_1.IOError("ENOTDIR", "open", path);
            flags |= constants.O_TRUNC;
            const entry = this._walk(vpath.dirname(path), /*noFollow*/ false) || _throw(new vfs_errors_1.IOError("ENOENT", "open", path));
            parent = entry.node;
            if (!inode_1.isDirectoryInode(parent))
                throw new vfs_errors_1.IOError("ENOTDIR", "open", path);
            if (!this._access(parent, constants.W_OK))
                throw new vfs_errors_1.IOError("EACCES", "open", path);
            node = this._mknod(parent.dev, constants.S_IFREG, mode);
            node.buffer = Buffer.allocUnsafe(0);
            if (parent.mode & constants.S_ISGID) {
                node.mode |= constants.S_ISGID;
                node.gid = parent.gid;
            }
            const links = this._getLinks(parent);
            this._addLink(parent, links, basename, node);
            const time = this.time();
            parent.mtimeMs = time;
            this._notifyChild(parent, "rename", basename);
            this._notifyAncestors(parent, "change");
        }
        else {
            if (flags & constants.O_EXCL)
                throw new vfs_errors_1.IOError("EEXIST", "open", path);
            node = entry.node;
            parent = entry.parent;
        }
        if (flags & constants.O_DIRECTORY && inode_1.isFileInode(node))
            throw new vfs_errors_1.IOError("ENOTDIR", "open", path);
        if (write && inode_1.isDirectoryInode(node))
            throw new vfs_errors_1.IOError("EISDIR", "open", path);
        if (write && !this._access(node, constants.W_OK))
            throw new vfs_errors_1.IOError("EACCES", "open", path);
        if (read && !this._access(node, constants.R_OK))
            throw new vfs_errors_1.IOError("EACCES", "open", path);
        const file = {
            fd: ++fdCount,
            path,
            basename,
            parent,
            node,
            flags,
            written: false,
            offset: inode_1.isFileInode(node) && (flags & (constants.O_APPEND | constants.O_TRUNC)) === constants.O_APPEND ? this._getSize(node) : 0,
            buffer: undefined
        };
        this._openFiles.set(file.fd, file);
        if (flags & constants.O_TRUNC) {
            file.buffer = Buffer.allocUnsafe(0);
            if (flags & constants.O_SYNC) {
                this._fsync(file, /*metadata*/ true);
            }
        }
        return file.fd;
    }
    /**
     * Close a file descriptor.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/close.html#
     */
    close(fd, callback) {
        try {
            this.closeSync(fd);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Close a file descriptor.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/close.html#
     */
    closeSync(fd) {
        const entry = this._file("close", fd);
        this._openFiles.delete(entry.fd);
        this._fsync(entry, /*metadata*/ true);
    }
    /**
     * Read from a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/read.html
     */
    read(fd, buffer, offset, length, position, callback) {
        try {
            process.nextTick(callback, null, this.readSync(fd, buffer, offset, length, position), buffer);
        }
        catch (e) {
            process.nextTick(callback, e, null, buffer);
        }
    }
    /**
     * Read from a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/read.html
     */
    readSync(fd, buffer, offset, length, position) {
        if (typeof position !== "number")
            position = -1;
        if (!isFinite(offset) || !isFinite(length) || !isFinite(position))
            throw new vfs_errors_1.IOError("EINVAL", "read");
        if (offset < 0 || length < 0 || position < -1 || offset > buffer.byteLength - length)
            throw new vfs_errors_1.IOError("EINVAL", "read");
        if (length === 0)
            return 0;
        const entry = this._file("read", fd, "file", constants.R_OK);
        const parent = entry.parent;
        const node = entry.node;
        if (position !== -1)
            entry.offset = position;
        if (!entry.buffer)
            entry.buffer = this._getBuffer(node);
        const bytesRead = entry.buffer.copy(buffer, offset, entry.offset, entry.offset + length);
        entry.offset += bytesRead;
        return bytesRead;
    }
    readFile(path, options, callback) {
        if (typeof options === "function")
            callback = options, options = undefined;
        if (typeof callback !== "function")
            throw new vfs_errors_1.IOError("EINVAL");
        try {
            process.nextTick(callback, null, this.readFileSync(path, options));
        }
        catch (e) {
            process.nextTick(callback, e, null);
        }
    }
    readFileSync(path, options = {}) {
        if (options === null || typeof options === "string")
            options = { encoding: options };
        const { encoding, flag = "r" } = options;
        const fd = typeof path === "number" ? path : this.openSync(path, flag, /*mode*/ 0o666);
        const size = this.fstatSync(fd).size;
        let buffer = Buffer.allocUnsafe(size);
        try {
            let offset = 0;
            let lastOffset;
            while (lastOffset !== offset && offset < size) {
                lastOffset = offset;
                offset += this.readSync(fd, buffer, offset, size - offset, offset);
            }
            if (offset < size)
                buffer = buffer.slice(0, offset);
        }
        finally {
            if (typeof path !== "number") {
                this.closeSync(fd);
            }
        }
        return encoding ? buffer.toString(encoding) : buffer;
    }
    write(fd, buffer, offset, length, position, callback) {
        if (typeof offset === "function")
            length = offset, offset = undefined;
        if (typeof length === "function")
            position = length, length = undefined;
        if (typeof position === "function")
            callback = position, position = undefined;
        if (typeof callback !== "function")
            throw new vfs_errors_1.IOError("EINVAL");
        try {
            if (Buffer.isBuffer(buffer)) {
                if (typeof offset !== "number")
                    offset = undefined;
                if (typeof length !== "number")
                    length = undefined;
                process.nextTick(callback, null, this.writeSync(fd, buffer, offset, length, position), buffer);
            }
            else {
                if (typeof length !== "string")
                    length = undefined;
                process.nextTick(callback, null, this.writeSync(fd, buffer, offset, length));
            }
        }
        catch (e) {
            process.nextTick(callback, e, null, buffer);
        }
    }
    writeSync(fd, buffer, offset, length, position) {
        if (Buffer.isBuffer(buffer)) {
            if (typeof offset !== "number")
                offset = 0;
            if (typeof length !== "number")
                length = buffer.byteLength - offset;
        }
        else {
            buffer = Buffer.from(buffer, typeof length === "string" ? length : "utf8");
            position = offset;
            offset = 0;
            length = buffer.byteLength;
        }
        if (typeof position !== "number")
            position = -1;
        if (!isFinite(offset) || !isFinite(length) || !isFinite(position))
            throw new vfs_errors_1.IOError("EINVAL", "write");
        if (offset < 0 || length < 0 || position < -1 || offset > buffer.byteLength - length)
            throw new vfs_errors_1.IOError("EINVAL", "write");
        if (length === 0)
            return;
        const entry = this._file("write", fd, "file", constants.W_OK);
        const parent = entry.parent;
        const node = entry.node;
        if (position !== -1)
            entry.offset = position;
        if (!entry.buffer) {
            // if we haven't yet started writing, get a copy of the storage buffer
            const buffer = this._getBuffer(node);
            entry.buffer = Buffer.allocUnsafe(buffer.byteLength);
            buffer.copy(entry.buffer, 0, 0, buffer.byteLength);
        }
        if (entry.offset >= entry.buffer.byteLength - length) {
            // if we are writing to a point outside of the size of the buffer, resize it
            entry.buffer = resizeBuffer(entry.buffer, entry.offset + length);
        }
        const bytesWritten = buffer.copy(entry.buffer, entry.offset, offset, offset + length);
        entry.offset += bytesWritten;
        if (entry.flags & constants.O_SYNC) {
            this._fsync(entry, /*metadata*/ true);
        }
        return bytesWritten;
    }
    appendFile(path, data, options, callback) {
        if (typeof options === "function")
            callback = options, options = undefined;
        if (typeof callback !== "function")
            throw new vfs_errors_1.IOError("EINVAL");
        try {
            this.appendFileSync(path, data, options);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Append to a file.
     */
    appendFileSync(path, data, options = {}) {
        if (options === null || typeof options === "string")
            options = { encoding: options };
        const { encoding, mode = 0o666, flag = "a" } = options;
        this.writeFileSync(path, data, { encoding, mode, flag });
    }
    writeFile(path, data, options, callback) {
        if (typeof options === "function")
            callback = options, options = undefined;
        if (typeof callback !== "function")
            throw new vfs_errors_1.IOError("EINVAL");
        try {
            this.writeFileSync(path, data, options);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Write to a file.
     */
    writeFileSync(path, data, options = {}) {
        if (options === null || typeof options === "string")
            options = { encoding: options };
        const { encoding, mode = 0o666, flag = "w" } = options;
        const flags = parseFlags(flag);
        const fd = typeof path === "number" ? path : this.openSync(path, flags, mode);
        const buffer = Buffer.isBuffer(data) ? data : Buffer.from("" + data, encoding || "utf8");
        try {
            let offset = 0;
            while (offset < buffer.byteLength) {
                offset += this.writeSync(fd, buffer, offset, buffer.byteLength - offset, flags & constants.O_APPEND ? null : offset);
            }
        }
        finally {
            if (typeof path !== "number") {
                this.closeSync(fd);
            }
        }
    }
    truncate(path, length, callback) {
        if (typeof length === "function")
            callback = length, length = undefined;
        if (typeof callback !== "function")
            throw new vfs_errors_1.IOError("EINVAL");
        try {
            this.truncateSync(path, length);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Truncate a file to a specified length.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/truncate.html
     */
    truncateSync(path, length = 0) {
        path = this._resolve(path);
        this._truncate("truncate", this._find(path) || _throw(new vfs_errors_1.IOError("ENOENT", "truncate", path)), length);
    }
    ftruncate(fd, length, callback) {
        if (typeof length === "function")
            callback = length, length = undefined;
        if (typeof callback !== "function")
            throw new vfs_errors_1.IOError("EINVAL");
        try {
            this.ftruncateSync(fd, length);
            process.nextTick(callback, null);
        }
        catch (e) {
            process.nextTick(callback, e);
        }
    }
    /**
     * Truncate a file to a specified length.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/ftruncate.html
     */
    ftruncateSync(fd, length = 0) {
        this._truncate("ftruncate", this._file("ftruncate", fd, "file", constants.W_OK), length);
    }
    _truncate(syscall, entry, length, path) {
        if (!isFinite(length))
            throw new vfs_errors_1.IOError("EINVAL", syscall, path);
        if (!inode_1.isFileInode(entry.node))
            throw new vfs_errors_1.IOError("ENOENT", syscall, path);
        if (this.isReadonly)
            throw new vfs_errors_1.IOError("EROFS", syscall, path);
        if (this._getSize(entry.node) !== length) {
            this._resize(entry.node, entry.node, length);
        }
        entry.node.mtimeMs = this.time();
        this._notifySelf(entry.node, "change");
    }
    /**
     * Makes a temporary directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/mkdtemp.html
     */
    mkdtemp(template, callback) {
        try {
            process.nextTick(callback, null, this.mkdtempSync(template));
        }
        catch (e) {
            process.nextTick(callback, e, null);
        }
    }
    /**
     * Makes a temporary directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/mkdtemp.html
     */
    mkdtempSync(template) {
        this.mkdirSync(this._mktemp("mkdtemp", template));
    }
    /**
     * Makes a temporary file, returning a file descriptor.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/mkstemp.html
     */
    mkstemp(template, callback) {
        try {
            process.nextTick(callback, null, this.mkstempSync(template));
        }
        catch (e) {
            process.nextTick(callback, e, null);
        }
    }
    /**
     * Makes a temporary file, returning a file descriptor.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/mkstemp.html
     */
    mkstempSync(template) {
        return this.openSync(this._mktemp("mkstemp", template), constants.O_RDWR | constants.O_CREAT | constants.O_EXCL, constants.S_IRUSR | constants.S_IWUSR);
    }
    _mktemp(syscall, template) {
        if (this.isReadonly)
            throw new vfs_errors_1.IOError("EROFS", syscall, template);
        template = this._resolve(template);
        if (vpath.hasTrailingSeparator(template))
            throw new vfs_errors_1.IOError("EINVAL", syscall, template);
        const basename = vpath.basename(template);
        let count = 0;
        for (let i = basename.length - 1; i >= 0; i--) {
            if (basename.charAt(i) !== "X")
                break;
            count++;
        }
        if (count < 6)
            throw new vfs_errors_1.IOError("EINVAL", syscall, template);
        const { node: parent, path } = this._find(vpath.dirname(template)) || _throw(new vfs_errors_1.IOError("ENOENT", syscall, template));
        if (!inode_1.isDirectoryInode(parent))
            throw new vfs_errors_1.IOError("ENOTDIR", syscall, template);
        if (!this._access(parent, constants.W_OK))
            throw new vfs_errors_1.IOError("EACCES", syscall, template);
        const parentLinks = this._getLinks(parent);
        const prefix = basename.slice(0, basename.length - count);
        while (true) {
            let suffix = "";
            while (suffix.length < count) {
                suffix += FileSystem._portableFilenameCharSet.charAt(Math.floor(Math.random() * FileSystem._portableFilenameCharSet.length));
            }
            const name = prefix + suffix;
            if (!parentLinks.has(name))
                return vpath.combine(path, name);
        }
    }
    watch(path, options, callback) {
        path = this._resolve(path);
        if (typeof options === "function")
            callback = options, options = undefined;
        if (typeof options === "undefined")
            options = {};
        const watcher = new watcher_1.FSWatcher(this);
        const realpath = this.realpathSync(path);
        const recursive = this._noRecursiveWatchers ? false : !!options.recursive;
        const watchers = this._lazy.watchers || (this._lazy.watchers = new core.SortedMap(this.stringComparer));
        let pathWatchers = watchers.get(realpath);
        if (!pathWatchers) {
            pathWatchers = new watcher_1.FSWatcherEntrySet(realpath);
            watchers.set(realpath, pathWatchers);
        }
        pathWatchers.add(watcher["_entry"] = { watcher, path, recursive, container: pathWatchers });
        return typeof callback === "function" ? watcher.on("change", callback) : watcher;
    }
    _removeWatcher(entry) {
        entry.watcher["_entry"] = undefined;
        entry.container.delete(entry);
        if (entry.container.size === 0) {
            const watchers = this._lazy.watchers;
            if (!watchers)
                return;
            if (entry.container === watchers.get(entry.container.path)) {
                watchers.delete(entry.container.path);
            }
        }
    }
    _removeWatchers(parent, node, name) {
        if (!this._lazy.watchers)
            return;
        const paths = parent ? this._getPaths(parent).map(path => vpath.combine(path, name)) : [name];
        for (const path of paths) {
            const watchers = this._lazy.watchers.get(path);
            if (!watchers)
                continue;
            for (const watcher of watchers) {
                this._removeWatcher(watcher);
            }
        }
    }
    _notifyChild(parent, eventType, name) {
        this._notify(parent, eventType, name, /*noExactMatch*/ false);
    }
    _notifySelf(node, eventType) {
        this._notify(node, eventType, /*childPath*/ undefined, /*noExactMatch*/ false);
    }
    _notifyAncestors(node, eventType) {
        this._notify(node, eventType, /*childPath*/ undefined, /*noExactMatch*/ true);
    }
    _notify(node, eventType, childPath, noExactMatch) {
        if (typeof childPath === "boolean")
            noExactMatch = childPath, childPath = undefined;
        if (!this._lazy.watchers)
            return;
        for (const path of this._getPaths(node)) {
            const fullPath = childPath ? vpath.combine(path, childPath) : path;
            const dirname = vpath.dirname(fullPath);
            for (const [watchedPath, watchers] of this._lazy.watchers) {
                const exactMatch = !noExactMatch && vpath.equals(watchedPath, fullPath, this.ignoreCase);
                const nonRecursiveMatch = watchers.nonRecursiveCount > 0 && vpath.equals(watchedPath, dirname, this.ignoreCase);
                const recursiveMatch = watchers.recursiveCount > 0 && vpath.beneath(watchedPath, dirname, this.ignoreCase);
                if (exactMatch || nonRecursiveMatch || recursiveMatch) {
                    for (const { watcher, recursive } of watchers) {
                        if (exactMatch || (recursive ? recursiveMatch : nonRecursiveMatch)) {
                            const entry = watcher["_entry"];
                            const name = exactMatch ? vpath.basename(entry ? entry.path : fullPath) : vpath.relative(watchedPath, fullPath, this.ignoreCase);
                            watcher.emit("change", eventType, name);
                        }
                    }
                }
            }
        }
    }
    watchFile(path, options, callback) {
        if (typeof options === "function")
            callback = options, options = undefined;
        if (typeof options === "undefined")
            options = {};
        if (typeof callback !== "function")
            throw new vfs_errors_1.IOError("EINVAL");
        path = this._resolve(path);
        const entry = this._find(path);
        const { interval = 5007 } = options;
        const watchedFiles = this._lazy.watchedFiles || (this._lazy.watchedFiles = new core.SortedMap(this.stringComparer));
        let watchedFileSet = watchedFiles.get(path);
        if (!watchedFileSet)
            watchedFiles.set(path, watchedFileSet = new Set());
        const watchedFile = {
            path,
            handle: this._timers.setInterval(() => this._onWatchInterval(watchedFile), interval),
            previous: entry ? this._stat("stat", entry, path) : new stats_1.Stats(),
            listener: callback
        };
        watchedFileSet.add(watchedFile);
        if (!entry) {
            callback(watchedFile.previous, watchedFile.previous);
        }
    }
    _onWatchInterval(watchedFile) {
        if (watchedFile.handle === undefined)
            return;
        const entry = this._find(watchedFile.path);
        const previous = watchedFile.previous;
        const current = entry ? this._stat("stat", entry, watchedFile.path) : new stats_1.Stats();
        if (current.dev !== previous.dev ||
            current.ino !== previous.ino ||
            current.mode !== previous.mode ||
            current.nlink !== previous.nlink ||
            current.uid !== previous.uid ||
            current.gid !== previous.gid ||
            current.rdev !== previous.rdev ||
            current.size !== previous.size ||
            current.blksize !== previous.blksize ||
            current.blocks !== previous.blocks ||
            current.atimeMs !== previous.atimeMs ||
            current.mtimeMs !== previous.mtimeMs ||
            current.ctimeMs !== previous.ctimeMs ||
            current.birthtimeMs !== previous.birthtimeMs) {
            watchedFile.previous = current;
            const callback = watchedFile.listener;
            callback(current, previous);
        }
    }
    /**
     * Stop watching a path for changes.
     */
    unwatchFile(path, callback) {
        path = this._resolve(path);
        const watchedFiles = this._lazy.watchedFiles;
        if (!watchedFiles)
            return;
        const watchedFileSet = watchedFiles.get(path);
        if (!watchedFileSet)
            return;
        for (const watchedFile of watchedFileSet) {
            if (!callback || watchedFile.listener === callback) {
                this._timers.clearInterval(watchedFile.handle);
                watchedFileSet.delete(watchedFile);
                watchedFile.handle = undefined;
            }
        }
        if (watchedFileSet.size === 0) {
            watchedFiles.delete(path);
        }
    }
    debugPrint() {
        let result = "";
        const printLinks = (dirname, links) => {
            for (const [name, node] of links) {
                const path = dirname ? vpath.combine(dirname, name) : name;
                const marker = vpath.compare(this._cwd, path, this.ignoreCase) === 0 ? "*" : " ";
                if (result)
                    result += "\n";
                result += marker;
                if (inode_1.isDirectoryInode(node)) {
                    result += vpath.addTrailingSeparator(path);
                    printLinks(path, this._getLinks(node));
                }
                else if (inode_1.isFileInode(node)) {
                    result += path;
                }
                else if (inode_1.isSymlinkInode(node)) {
                    result += path + " -> " + node.symlink;
                }
            }
        };
        printLinks(/*dirname*/ undefined, this._getRootLinks());
        console.log(result);
    }
    _mknod(dev, type, mode, uid = this.getuid(), gid = this.getgid(), umask = this.umask()) {
        const timestamp = this.time();
        return {
            dev,
            ino: ++inoCount,
            mode: (mode & ~constants.S_IFMT & ~umask & 0o7777) | (type & constants.S_IFMT),
            uid,
            gid,
            atimeMs: timestamp,
            mtimeMs: timestamp,
            ctimeMs: timestamp,
            birthtimeMs: timestamp,
            nlink: 0,
            incomingLinks: new Map(),
        };
    }
    _addLink(parent, links, name, node) {
        links.set(name, node);
        node.nlink++;
        let set = node.incomingLinks.get(parent);
        if (!set)
            node.incomingLinks.set(parent, set = new core.SortedSet(this.stringComparer));
        set.add(name);
    }
    _removeLink(parent, links, name, node) {
        links.delete(name);
        node.nlink--;
        const set = node.incomingLinks.get(parent);
        if (set) {
            set.delete(name);
            if (set.size === 0)
                node.incomingLinks.delete(parent);
        }
    }
    _replaceLink(oldParent, oldLinks, oldName, newParent, newLinks, newName, node) {
        if (oldParent !== newParent) {
            this._removeLink(oldParent, oldLinks, oldName, node);
            this._addLink(newParent, newLinks, newName, node);
            return;
        }
        oldLinks.delete(oldName);
        oldLinks.set(newName, node);
        const set = node.incomingLinks.get(oldParent);
        if (set) {
            set.delete(oldName);
            set.add(newName);
        }
    }
    _getRootLinks() {
        if (!this._lazy.links) {
            this._lazy.links = new core.SortedMap(this.stringComparer);
            if (this._shadowRoot) {
                this._copyShadowLinks(this._shadowRoot._getRootLinks(), this._lazy.links, /*parent*/ undefined);
            }
            this._lazy.links = this._lazy.links;
        }
        return this._lazy.links;
    }
    _getLinks(node) {
        if (!node)
            return this._getRootLinks();
        if (!node.links) {
            const links = new core.SortedMap(this.stringComparer);
            const { source, resolver } = node;
            if (source && resolver) {
                node.source = undefined;
                node.resolver = undefined;
                for (const name of resolver.readdirSync(source)) {
                    const path = vpath.combine(source, name);
                    const stats = resolver.statSync(path);
                    switch (stats.mode & constants.S_IFMT) {
                        case constants.S_IFDIR:
                            const dir = this._mknod(node.dev, constants.S_IFDIR, 0o777);
                            dir.source = vpath.combine(source, name);
                            dir.resolver = resolver;
                            this._addLink(node, links, name, dir);
                            break;
                        case constants.S_IFREG:
                            const file = this._mknod(node.dev, constants.S_IFREG, 0o666);
                            file.source = vpath.combine(source, name);
                            file.resolver = resolver;
                            file.size = stats.size;
                            this._addLink(node, links, name, file);
                            break;
                    }
                }
            }
            else if (this._shadowRoot && node.shadowRoot) {
                this._copyShadowLinks(this._shadowRoot._getLinks(node.shadowRoot), links, node);
            }
            node.links = links;
        }
        return node.links;
    }
    _getShadow(root) {
        const shadows = this._lazy.shadows || (this._lazy.shadows = new Map());
        let shadow = shadows.get(root.ino);
        if (!shadow) {
            shadow = {
                dev: root.dev,
                ino: root.ino,
                mode: root.mode,
                uid: root.uid,
                gid: root.gid,
                atimeMs: root.atimeMs,
                mtimeMs: root.mtimeMs,
                ctimeMs: root.ctimeMs,
                birthtimeMs: root.birthtimeMs,
                nlink: root.nlink,
                shadowRoot: root,
                incomingLinks: new Map(),
                paths: root.paths
            };
            if (inode_1.isSymlinkInode(root))
                shadow.symlink = root.symlink;
            shadows.set(shadow.ino, shadow);
            for (const [rootParent, rootNames] of root.incomingLinks) {
                shadow.incomingLinks.set(rootParent && this._getShadow(rootParent), new core.SortedSet(this.stringComparer, rootNames));
            }
        }
        return shadow;
    }
    _copyShadowLinks(source, target, parent) {
        const shadows = this._lazy.shadows || (this._lazy.shadows = new Map());
        for (const [name, root] of source) {
            target.set(name, this._getShadow(root));
        }
    }
    _invalidatePaths(node) {
        node.paths = undefined;
        if (inode_1.isDirectoryInode(node)) {
            for (const child of this._getLinks(node).values()) {
                this._invalidatePaths(child);
            }
        }
    }
    _getSize(node) {
        if (node.buffer)
            return node.buffer.byteLength;
        if (node.size !== undefined)
            return node.size;
        if (node.source && node.resolver)
            return node.size = node.resolver.statSync(node.source).size;
        if (this._shadowRoot && node.shadowRoot)
            return node.size = this._shadowRoot._getSize(node.shadowRoot);
        return 0;
    }
    _getBuffer(node) {
        if (!node.buffer) {
            const { source, resolver } = node;
            if (source && resolver) {
                node.source = undefined;
                node.resolver = undefined;
                node.size = undefined;
                node.buffer = resolver.readFileSync(source);
            }
            else if (this._shadowRoot && node.shadowRoot) {
                node.buffer = this._shadowRoot._getBuffer(node.shadowRoot);
            }
            else {
                node.buffer = Buffer.allocUnsafe(0);
            }
        }
        return node.buffer;
    }
    _getPaths(node) {
        if (!node.paths) {
            const result = [];
            for (const [parent, names] of node.incomingLinks) {
                if (parent) {
                    for (const path of this._getPaths(parent)) {
                        for (const name of names) {
                            result.push(vpath.combine(path, name));
                        }
                    }
                }
                else {
                    for (const name of names) {
                        result.push(name);
                    }
                }
            }
            node.paths = result;
        }
        return node.paths;
    }
    _file(syscall, fd, kind, mode = constants.F_OK) {
        const entry = this._openFiles.get(fd);
        if (!entry)
            throw new vfs_errors_1.IOError("EBADF", syscall);
        if (kind === "file" && inode_1.isDirectoryInode(entry.node))
            throw new vfs_errors_1.IOError("EISDIR", syscall);
        if (kind === "file" && !inode_1.isFileInode(entry.node))
            throw new vfs_errors_1.IOError("EBADF", syscall);
        if (kind === "directory" && !inode_1.isDirectoryInode(entry.node))
            throw new vfs_errors_1.IOError("EBADF", syscall);
        if (mode & constants.W_OK && !isWritable(entry))
            throw new vfs_errors_1.IOError("EBADF", syscall);
        if (mode & constants.R_OK && !isReadable(entry))
            throw new vfs_errors_1.IOError("EBADF", syscall);
        return entry;
    }
    _find(path) {
        return this._walk(path, /*noFollow*/ false);
    }
    _lfind(path) {
        return this._walk(path, /*noFollow*/ true);
    }
    // http://man7.org/linux/man-pages/man7/path_resolution.7.html
    _walk(path, noFollow) {
        let links = this._getRootLinks();
        let parent;
        let components = vpath.parse(path);
        let step = 0;
        let depth = 0;
        while (step < components.length) {
            if (depth >= 40)
                throw new vfs_errors_1.IOError("ELOOP", "scandir", vpath.format(components.slice(0, step)));
            const lastStep = step === components.length - 1;
            const basename = components[step];
            const node = links.get(basename);
            if (node === undefined)
                return undefined;
            if (inode_1.isSymlinkInode(node) && !(noFollow && lastStep)) {
                const dirname = vpath.format(components.slice(0, step));
                const symlink = vpath.resolve(dirname, node.symlink);
                if (!vpath.isAbsolute(symlink))
                    throw new Error("Path not absolute");
                links = this._getRootLinks();
                parent = undefined;
                components = vpath.parse(symlink).concat(components.slice(step + 1));
                step = 0;
                depth++;
                continue;
            }
            if (lastStep) {
                const path = vpath.format(components);
                if (!parent && inode_1.isDirectoryInode(node))
                    parent = node;
                if (!parent)
                    throw new vfs_errors_1.IOError("ENOENT", "scandir", path);
                return { path, basename, parent, node };
            }
            if (inode_1.isDirectoryInode(node)) {
                const subpath = vpath.format(components.slice(0, step + 1));
                if (!this._access(node, constants.X_OK))
                    throw new vfs_errors_1.IOError("EACCES", "scandir", path);
                links = this._getLinks(node);
                parent = node;
                step++;
                continue;
            }
            throw new vfs_errors_1.IOError("ENOTDIR", "scandir", vpath.format(components.slice(0, step + 1)));
        }
        return undefined;
    }
    _resize(node, entry, size) {
        if (!entry.buffer) {
            entry.buffer = this._getBuffer(node);
        }
        const oldSize = entry.buffer.byteLength;
        if (entry.buffer.byteLength !== size) {
            const oldBuffer = entry.buffer;
            entry.buffer = size < oldSize ? Buffer.allocUnsafe(size) : Buffer.alloc(size);
            oldBuffer.copy(entry.buffer, 0, 0, Math.min(oldSize, size));
        }
    }
    _resolve(path) {
        return this._cwd
            ? vpath.resolve(this._cwd, vpath.validate(path, 2016 /* RelativeOrAbsolute */))
            : vpath.validate(path, 2017 /* Absolute */);
    }
    _applyFiles(files, dirname) {
        const deferred = [];
        this._applyFilesWorker(files, dirname, deferred);
        for (const [entry, path] of deferred) {
            this.mkdirpSync(vpath.dirname(path), 0o777);
            this.pushd(vpath.dirname(path));
            if (entry instanceof fileSet_1.Symlink) {
                if (this.stringComparer(vpath.dirname(path), path) === 0) {
                    throw new TypeError("Roots cannot be symbolic links.");
                }
                this.symlinkSync(entry.symlink, path);
                this._applyFileExtendedOptions(path, entry);
            }
            else if (entry instanceof fileSet_1.Link) {
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
    _applyFileExtendedOptions(path, entry) {
        const { uid = -1, gid = -1, mode, meta } = entry;
        if (uid !== -1 || gid !== -1)
            this.chownSync(path, uid, gid);
        if (mode !== undefined)
            this.chmodSync(path, mode);
        if (meta !== undefined) {
            const filemeta = this.filemeta(path);
            for (const key of Object.keys(meta)) {
                filemeta.set(key, meta[key]);
            }
        }
    }
    _applyFilesWorker(files, dirname, deferred) {
        for (const key of Object.keys(files)) {
            const value = this._normalizeFileMapEntry(files[key]);
            const path = dirname ? vpath.resolve(dirname, key) : key;
            vpath.validate(path, 2017 /* Absolute */);
            if (value === null || value === undefined) {
                if (this.stringComparer(vpath.dirname(path), path) === 0) {
                    throw new TypeError("Roots cannot be deleted.");
                }
                this.rimrafSync(path);
            }
            else if (value instanceof fileSet_1.File) {
                if (this.stringComparer(vpath.dirname(path), path) === 0) {
                    throw new TypeError("Roots cannot be files.");
                }
                this.mkdirpSync(vpath.dirname(path), 0o777);
                this.writeFileSync(path, value.data, value.encoding);
                this._applyFileExtendedOptions(path, value);
            }
            else if (value instanceof fileSet_1.Directory) {
                this.mkdirpSync(path, 0o777);
                this._applyFileExtendedOptions(path, value);
                this._applyFilesWorker(value.files, path, deferred);
            }
            else {
                deferred.push([value, path]);
            }
        }
    }
    _normalizeFileMapEntry(value) {
        if (value === undefined ||
            value === null ||
            value instanceof fileSet_1.Directory ||
            value instanceof fileSet_1.File ||
            value instanceof fileSet_1.Link ||
            value instanceof fileSet_1.Symlink ||
            value instanceof fileSet_1.Mount) {
            return value;
        }
        return typeof value === "string" || Buffer.isBuffer(value) ? new fileSet_1.File(value) : new fileSet_1.Directory(value);
    }
}
FileSystem._portableFilenameCharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-";
exports.FileSystem = FileSystem;
function isReadable(file) {
    return (file.flags & constants.O_ACCMODE) !== constants.O_WRONLY;
}
function isWritable(file) {
    return (file.flags & constants.O_ACCMODE) !== constants.O_RDONLY;
}
function parseFlags(flags) {
    if (typeof flags === "string") {
        switch (flags) {
            case "r": return constants.O_RDONLY;
            case "r+": return constants.O_RDWR;
            case "rs+": return constants.O_RDWR;
            case "w": return constants.O_WRONLY | constants.O_TRUNC | constants.O_CREAT;
            case "wx": return constants.O_WRONLY | constants.O_TRUNC | constants.O_CREAT | constants.O_EXCL;
            case "w+": return constants.O_RDWR | constants.O_TRUNC | constants.O_CREAT;
            case "wx+": return constants.O_RDWR | constants.O_TRUNC | constants.O_CREAT | constants.O_EXCL;
            case "a": return constants.O_WRONLY | constants.O_APPEND | constants.O_CREAT;
            case "ax": return constants.O_WRONLY | constants.O_APPEND | constants.O_CREAT | constants.O_EXCL;
            case "a+": return constants.O_RDWR | constants.O_APPEND | constants.O_CREAT;
            case "ax+": return constants.O_RDWR | constants.O_APPEND | constants.O_CREAT | constants.O_EXCL;
            default: throw new Error(`Unrecognized file open flag: ${flags}`);
        }
    }
    return flags;
}
function resizeBuffer(buffer, size) {
    if (buffer.byteLength === size)
        return buffer;
    const newBuffer = Buffer.allocUnsafe(size);
    newBuffer.fill(0, buffer.copy(newBuffer, 0, 0, size));
    return newBuffer;
}

//# sourceMappingURL=fileSystem.js.map
