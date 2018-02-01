/// <reference types="node" />
import * as core from "@typescript/vfs-core";
import { FileSet } from "./fileSet";
import { Stats } from "./stats";
import { FSWatcher } from "./watcher";
/**
 * Represents a virtual POSIX-like file system.
 */
export declare class FileSystem {
    readonly ignoreCase: boolean;
    readonly stringComparer: (a: string, b: string) => number;
    private static _portableFilenameCharSet;
    private _lazy;
    private _cwd;
    private _uid;
    private _gid;
    private _umask;
    private _time;
    private _timers;
    private _openFiles;
    private _shadowRoot;
    private _dirStack;
    private _noRecursiveWatchers;
    constructor(ignoreCase: boolean, options?: FileSystemOptions);
    /**
     * Gets metadata for this `FileSystem`.
     */
    readonly meta: core.Metadata;
    /**
     * Gets a value indicating whether the file system is read-only.
     */
    readonly isReadonly: boolean;
    /**
     * Makes the file system read-only.
     */
    makeReadonly(): this;
    /**
     * Gets the file system shadowed by this file system.
     */
    readonly shadowRoot: FileSystem | undefined;
    /**
     * Gets a shadow of this file system.
     */
    shadow(ignoreCase?: boolean): FileSystem;
    /**
     * Gets the metadata object for a path.
     * @param path
     */
    filemeta(path: string): core.Metadata;
    private _filemeta(node);
    /**
     * Gets the user ID to use for file system access.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/getuid.html
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/geteuid.html
     */
    getuid(): number;
    /**
     * Sets the user ID to use for file system access.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/setuid.html
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/seteuid.html
     */
    setuid(value: number): void;
    /**
     * Gets the group ID to use for file system access.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/getgid.html
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/getegid.html
     */
    getgid(): number;
    /**
     * Sets the group ID to use for file system access.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/setgid.html
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/setegid.html
     */
    setgid(value: number): void;
    /**
     * Gets or sets the virtual process's file mode creation mask (umask)
     * to `mask & 0o777` and returns the previous value of the mask.
     *
     * @link http://man7.org/linux/man-pages/man2/umask.2.html
     */
    umask(value?: number): number;
    /**
     * Gets or sets the timestamp (in milliseconds) used for file status, returning the previous timestamp.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/time.html
     */
    time(value?: number | Date | (() => number | Date)): number;
    /**
     * Get the pathname of the current working directory.
     *
     * @link - http://pubs.opengroup.org/onlinepubs/9699919799/functions/getcwd.html
     */
    cwd(): string;
    /**
     * Changes the current working directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chdir.html
     */
    chdir(path: string): void;
    /**
     * Pushes the current directory onto the directory stack and changes the current working directory to the supplied path.
     */
    pushd(path?: string): void;
    /**
     * Pops the previous directory from the location stack and changes the current directory to that directory.
     */
    popd(): void;
    /**
     * Apply a file map to the file system.
     */
    apply(files: FileSet): void;
    /**
     * Recursively remove all files and directories underneath the provided path.
     */
    rimrafSync(path: string): void;
    /**
     * Checks whether the calling process can access the file `path`. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/access.html
     */
    access(path: string, callback: (err: Error | null) => void): void;
    /**
     * Checks whether the calling process can access the file `path`. If `path` is a symbolic link, it is dereferenced.
     * @param mode One or more of the constants `F_OK`, `R_OK`, `W_OK`, or `X_OK`.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/access.html
     */
    access(path: string, mode: number | undefined, callback: (err: Error | null) => void): void;
    /**
     * Checks whether the calling process can access the file `path`. If `path` is a symbolic link, it is dereferenced.
     * @param mode One or more of the constants `F_OK`, `R_OK`, `W_OK`, or `X_OK`.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/access.html
     */
    accessSync(path: string, mode?: number): void;
    private _access(node, mode);
    /**
     * Changes the permissions of a file. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chmod.html
     */
    chmod(path: string, mode: number, callback: (err: Error | null) => void): void;
    /**
     * Changes the permissions of a file. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chmod.html
     */
    chmodSync(path: string, mode: number): void;
    /**
     * Changes the permissions of a file. Like `chmod`, except symbolic links are not dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chmod.html
     */
    lchmod(path: string, mode: number, callback: (err: Error | null) => void): void;
    /**
     * Changes the permissions of a file. Like `chmod`, except symbolic links are not dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chmod.html
     */
    lchmodSync(path: string, mode: number): void;
    /**
     * Changes the permissions of an open file
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/fchmod.html
     */
    fchmod(fd: number, mode: number, callback: (err: Error | null) => void): void;
    /**
     * Changes the permissions of an open file
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/fchmod.html
     */
    fchmodSync(fd: number, mode: number): void;
    private _chmod(syscall, entry, mode, path?);
    /**
     * Changes the ownership of a file. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chown.html
     */
    chown(path: string, uid: number, gid: number, callback: (err: Error | null) => void): void;
    /**
     * Changes the ownership of a file. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chown.html
     */
    chownSync(path: string, uid: number, gid: number): void;
    /**
     * Changes the ownership of a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/lchown.html
     */
    lchown(path: string, uid: number, gid: number, callback: (err: Error | null) => void): void;
    /**
     * Changes the ownership of a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/lchown.html
     */
    lchownSync(path: string, uid: number, gid: number): void;
    /**
     * Changes the ownership of an open file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/fchown.html
     */
    fchown(fd: number, uid: number, gid: number, callback: (err: Error | null) => void): void;
    /**
     * Changes the ownership of an open file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/fchown.html
     */
    fchownSync(fd: number, uid: number, gid: number): void;
    private _chown(syscall, entry, uid, gid, path?);
    /**
     * Sets file access and modification times. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/utimes.html
     */
    utimes(path: string, atime: number | Date, mtime: number | Date, callback: (err: Error | null) => void): void;
    /**
     * Sets file access and modification times. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/utimes.html
     */
    utimesSync(path: string, atime: number | Date, mtime: number | Date): void;
    /**
     * Sets file access and modification times. If `path` is a symbolic link, it is not dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/utimes.html
     */
    lutimes(path: string, atime: number | Date, mtime: number | Date, callback: (err: Error | null) => void): void;
    /**
     * Sets file access and modification times. If `path` is a symbolic link, it is not dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/utimes.html
     */
    lutimesSync(path: string, atime: number | Date, mtime: number | Date): void;
    /**
     * Sets file access and modification times.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/futimes.html
     */
    futimes(fd: number, atime: number | Date, mtime: number | Date, callback: (err: Error | null) => void): void;
    /**
     * Sets file access and modification times.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/futimes.html
     */
    futimesSync(fd: number, atime: number | Date, mtime: number | Date): void;
    private _utimes(syscall, entry, atime, mtime, path?);
    fsync(fd: number, callback: (err: Error | null) => void): void;
    fsyncSync(fd: number): void;
    fdatasync(fd: number, callback: (err: Error | null) => void): void;
    fdatasyncSync(fd: number): void;
    private _fsync(entry, metadata);
    /**
     * Get file status. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/stat.html
     */
    stat(path: string, callback: (err: Error | null, stats: Stats | null) => void): void;
    /**
     * Get file status. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/stat.html
     */
    statSync(path: string): Stats;
    /**
     * Get file status.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/lstat.html
     */
    lstat(path: string, callback: (err: Error | null, stats: Stats | null) => void): void;
    /**
     * Get file status.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/lstat.html
     */
    lstatSync(path: string): Stats;
    /**
     * Get file status.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/fstat.html
     */
    fstat(fd: number, callback: (err: Error | null, stats: Stats | null) => void): void;
    /**
     * Get file status.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/fstat.html
     */
    fstatSync(fd: number): Stats;
    private _stat(syscall, entry, path?);
    scanSync(path: string, axis: Axis, traversal: Traversal): string[];
    lscanSync(path: string, axis: Axis, traversal: Traversal): string[];
    private _scan(path, stats, axis, traversal, noFollow, results);
    /**
     * Read a directory. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/readdir.html
     */
    readdir(path: string, callback: (err: Error | null, files: string[] | null) => void): void;
    /**
     * Read a directory. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/readdir.html
     */
    readdirSync(path: string): string[];
    /**
     * Mounts a physical or virtual file system at a location in this virtual file system.
     *
     * @param source The path in the physical (or other virtual) file system.
     * @param target The path in this virtual file system.
     * @param resolver An object used to resolve files in `source`.
     */
    mount(source: string, target: string, resolver: FileSystemResolver, callback: (err: Error | null) => void): void;
    /**
     * Mounts a physical or virtual file system at a location in this virtual file system.
     *
     * @param source The path in the physical (or other virtual) file system.
     * @param target The path in this virtual file system.
     * @param resolver An object used to resolve files in `source`.
     */
    mount(source: string, target: string, resolver: FileSystemResolver, mode: number | undefined, callback: (err: Error | null) => void): void;
    /**
     * Mounts a physical or virtual file system at a location in this virtual file system.
     *
     * @param source The path in the physical (or other virtual) file system.
     * @param target The path in this virtual file system.
     * @param resolver An object used to resolve files in `source`.
     */
    mountSync(source: string, target: string, resolver: FileSystemResolver, mode?: number): void;
    /**
     * Make a directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/mkdir.html
     */
    mkdir(path: string, callback: (error: Error | null) => void): void;
    /**
     * Make a directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/mkdir.html
     */
    mkdir(path: string, mode: number | undefined, callback: (error: Error | null) => void): void;
    /**
     * Make a directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/mkdir.html
     */
    mkdirSync(path: string, mode?: number): void;
    /**
     * Make a directory and all of its parent paths (if they don't exist).
     */
    mkdirp(path: string, callback: (error: Error | null) => void): void;
    /**
     * Make a directory and all of its parent paths (if they don't exist).
     */
    mkdirp(path: string, mode: number | undefined, callback: (error: Error | null) => void): void;
    /**
     * Make a directory and all of its parent paths (if they don't exist).
     */
    mkdirpSync(path: string, mode?: number): void;
    /**
     * Remove a directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rmdir.html
     */
    rmdir(path: string, callback: (err: Error | null) => void): void;
    /**
     * Remove a directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rmdir.html
     */
    rmdirSync(path: string): void;
    /**
     * Link one file to another file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/link.html
     */
    link(oldpath: string, newpath: string, callback: (err: Error | null) => void): void;
    /**
     * Link one file to another file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/link.html
     */
    linkSync(oldpath: string, newpath: string): void;
    /**
     * Remove a directory entry.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/unlink.html
     */
    unlink(path: string, callback: (err: Error | null) => void): void;
    /**
     * Remove a directory entry.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/unlink.html
     */
    unlinkSync(path: string): void;
    /**
     * Rename a file
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rename.html
     */
    rename(oldpath: string, newpath: string, callback: (err: Error | null) => void): void;
    /**
     * Rename a file
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rename.html
     */
    renameSync(oldpath: string, newpath: string): void;
    /**
     * Make a symbolic link
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/symlink.html
     */
    symlink(target: string, linkpath: string, callback: (err: Error | null) => void): void;
    /**
     * Make a symbolic link
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/symlink.html
     */
    symlinkSync(target: string, linkpath: string): void;
    /**
     * Read the contents of a symbolic link
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/readlink.html
     */
    readlink(path: string, callback: (err: Error | null, path: string | null) => void): void;
    /**
     * Read the contents of a symbolic link
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/readlink.html
     */
    readlinkSync(path: string): string;
    /**
     * Resolve a pathname
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/realpath.html
     */
    realpath(path: string, callback: (err: Error | null, path: string | null) => void): void;
    /**
     * Resolve a pathname
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/realpath.html
     */
    realpathSync(path: string): string;
    /**
     * Open a file
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/open.html
     */
    open(path: string, flags: string | number, callback: (err: Error | null, fd: number | null) => void): void;
    /**
     * Open a file
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/open.html
     */
    open(path: string, flags: string | number, mode: number, callback: (err: Error | null, fd: number | null) => void): void;
    /**
     * Open a file
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/open.html
     */
    openSync(path: string, flags: string | number, mode?: number): number;
    /**
     * Close a file descriptor.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/close.html#
     */
    close(fd: number, callback: (err: Error | null) => void): void;
    /**
     * Close a file descriptor.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/close.html#
     */
    closeSync(fd: number): void;
    /**
     * Read from a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/read.html
     */
    read(fd: number, buffer: Buffer, offset: number, length: number, position: number | undefined, callback: (err: Error | null, bytesRead: number | null, buffer: Buffer) => void): void;
    /**
     * Read from a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/read.html
     */
    readSync(fd: number, buffer: Buffer, offset: number, length: number, position?: number | null): number;
    /**
     * Read from a file.
     */
    readFile(path: string | number, callback: (error: Error | null, data: string | Buffer | null) => void): void;
    /**
     * Read from a file.
     */
    readFile(path: string | number, options: {
        encoding?: null;
        flag?: string | number;
    } | null | undefined, callback: (error: Error | null, data: Buffer | null) => void): void;
    /**
     * Read from a file.
     */
    readFile(path: string | number, options: {
        encoding: string;
        flag?: string | number;
    } | string, callback: (error: Error | null, data: string | null) => void): void;
    /**
     * Read from a file.
     */
    readFile(path: string | number, options: {
        encoding?: string | null;
        flag?: string | number;
    } | string | null | undefined, callback: (error: Error | null, data: string | Buffer | null) => void): void;
    /**
     * Read from a file.
     */
    readFileSync(path: string | number, options?: {
        encoding?: null;
        flag?: string | number;
    } | null): Buffer;
    /**
     * Read from a file.
     */
    readFileSync(path: string | number, options: {
        encoding: string;
        flag?: string | number;
    } | string): string;
    /**
     * Read from a file.
     */
    readFileSync(path: string | number, options?: {
        encoding?: string | null;
        flag?: string | number;
    } | string | null): string | Buffer;
    /**
     * Write to a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/write.html
     */
    write(fd: number, buffer: Buffer, callback: (error: Error | null, bytesWritten: number | null, buffer: Buffer) => void): void;
    /**
     * Write to a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/write.html
     */
    write(fd: number, buffer: Buffer, offset: number | undefined, callback: (error: Error | null, bytesWritten: number | null, buffer: Buffer) => void): void;
    /**
     * Write to a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/write.html
     */
    write(fd: number, buffer: Buffer, offset: number | undefined, length: number | undefined, callback: (error: Error | null, bytesWritten: number | null, buffer: Buffer) => void): void;
    /**
     * Write to a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/write.html
     */
    write(fd: number, buffer: Buffer, offset: number | undefined, length: number | undefined, position: number | undefined, callback: (error: Error | null, bytesWritten: number | null, buffer: Buffer) => void): void;
    /**
     * Write to a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/write.html
     */
    write(fd: number, string: string, callback: (error: Error | null, bytesWritten: number | null, string: string) => void): void;
    /**
     * Write to a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/write.html
     */
    write(fd: number, string: string, position: number | null | undefined, callback: (error: Error | null, bytesWritten: number | null, string: string) => void): void;
    /**
     * Write to a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/write.html
     */
    write(fd: number, string: string, position: number | null | undefined, encoding: string | undefined, callback: (error: Error | null, bytesWritten: number | null, string: string) => void): void;
    /**
     * Write to a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/write.html
     */
    writeSync(fd: number, buffer: Buffer, offset?: number, length?: number, position?: number | null): number;
    /**
     * Write to a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/write.html
     */
    writeSync(fd: number, string: string, position?: number | null, encoding?: string): number;
    /**
     * Append to a file.
     */
    appendFile(path: string | number, data: string | Buffer, callback: (error: Error | null) => void): void;
    /**
     * Append to a file.
     */
    appendFile(path: string | number, data: string | Buffer, options: {
        encoding?: string | null;
        mode?: number;
        flag?: string | number;
    } | string | null | undefined, callback: (error: Error | null) => void): void;
    /**
     * Append to a file.
     */
    appendFileSync(path: string | number, data: string | Buffer, options?: {
        encoding?: string | null;
        mode?: number;
        flag?: string | number;
    } | string | null): void;
    /**
     * Write to a file.
     */
    writeFile(path: string | number, data: string | Buffer, callback: (error: Error | null) => void): void;
    /**
     * Write to a file.
     */
    writeFile(path: string | number, data: string | Buffer, options: {
        encoding?: string | null;
        mode?: number;
        flag?: string | number;
    } | string | null | undefined, callback: (error: Error | null) => void): void;
    /**
     * Write to a file.
     */
    writeFileSync(path: string | number, data: string | Buffer, options?: {
        encoding?: string | null;
        mode?: number;
        flag?: string | number;
    } | string | null): void;
    /**
     * Truncate a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/truncate.html
     */
    truncate(path: string, callback: (error: Error | null) => void): void;
    /**
     * Truncate a file to a specified length.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/truncate.html
     */
    truncate(path: string, length: number | undefined, callback: (error: Error | null) => void): void;
    /**
     * Truncate a file to a specified length.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/truncate.html
     */
    truncateSync(path: string, length?: number): void;
    /**
     * Truncate a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/ftruncate.html
     */
    ftruncate(fd: number, callback: (error: Error | null) => void): void;
    /**
     * Truncate a file to a specified length.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/ftruncate.html
     */
    ftruncate(fd: number, length: number | undefined, callback: (error: Error | null) => void): void;
    /**
     * Truncate a file to a specified length.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/ftruncate.html
     */
    ftruncateSync(fd: number, length?: number): void;
    private _truncate(syscall, entry, length, path?);
    /**
     * Makes a temporary directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/mkdtemp.html
     */
    mkdtemp(template: string, callback: (error: Error | null, folder: string | null) => void): void;
    /**
     * Makes a temporary directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/mkdtemp.html
     */
    mkdtempSync(template: string): void;
    /**
     * Makes a temporary file, returning a file descriptor.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/mkstemp.html
     */
    mkstemp(template: string, callback: (error: Error | null, fd: number | null) => void): void;
    /**
     * Makes a temporary file, returning a file descriptor.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/mkstemp.html
     */
    mkstempSync(template: string): number;
    private _mktemp(syscall, template);
    /**
     * Watch a path for changes.
     */
    watch(path: string, callback?: (eventType: string, filename: string) => void): FSWatcher;
    watch(path: string, options?: {
        recursive?: boolean;
    }, callback?: (eventType: string, filename: string) => void): FSWatcher;
    private _removeWatcher(entry);
    private _removeWatchers(parent, node, name);
    private _notifyChild(parent, eventType, name);
    private _notifySelf(node, eventType);
    private _notifyAncestors(node, eventType);
    private _notify(node, eventType, childPath, noExactMatch);
    /**
     * Watch a path for changes using polling.
     */
    watchFile(path: string, callback: (current: Stats, previous: Stats) => void): void;
    /**
     * Watch a path for changes using polling.
     */
    watchFile(path: string, options: {
        interval?: number;
    } | undefined, callback: (current: Stats, previous: Stats) => void): void;
    private _onWatchInterval(watchedFile);
    /**
     * Stop watching a path for changes.
     */
    unwatchFile(path: string, callback?: (current: Stats, previous: Stats) => void): void;
    debugPrint(): void;
    private _mknod(dev, type, mode, uid?, gid?, umask?);
    private _mknod(dev, type, mode, uid?, gid?, umask?);
    private _mknod(dev, type, mode, uid?, gid?, umask?);
    private _addLink(parent, links, name, node);
    private _removeLink(parent, links, name, node);
    private _replaceLink(oldParent, oldLinks, oldName, newParent, newLinks, newName, node);
    private _getRootLinks();
    private _getLinks(node);
    private _getShadow(root);
    private _getShadow(root);
    private _copyShadowLinks(source, target, parent);
    private _invalidatePaths(node);
    private _getSize(node);
    private _getBuffer(node);
    private _getPaths(node);
    private _file(syscall, fd);
    private _file(syscall, fd, kind);
    private _file(syscall, fd, kind, mode?);
    private _find(path);
    private _lfind(path);
    private _walk(path, noFollow);
    private _resize(node, entry, size);
    private _resolve(path);
    private _applyFiles(files, dirname);
    private _applyFileExtendedOptions(path, entry);
    private _applyFilesWorker(files, dirname, deferred);
    private _normalizeFileMapEntry(value);
}
export interface FileSystemOptions {
    uid?: number;
    gid?: number;
    umask?: number;
    time?: number | Date | (() => number | Date);
    files?: FileSet;
    timers?: FileSystemTimers;
    cwd?: string;
    meta?: Record<string, any>;
    noRecursiveWatchers?: boolean;
}
export declare type Axis = "ancestors" | "ancestors-or-self" | "self" | "descendants-or-self" | "descendants";
export interface Traversal {
    traverse?(path: string, stats: Stats): boolean;
    accept?(path: string, stats: Stats): boolean;
}
export interface FileSystemResolver {
    statSync(path: string): {
        mode: number;
        size: number;
    };
    readdirSync(path: string): string[];
    readFileSync(path: string): Buffer;
}
export interface FileSystemTimers {
    setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
    clearInterval(handle: any): void;
}
