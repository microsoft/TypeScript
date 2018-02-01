/// <reference types="node" />
import { FileSystemResolver } from "./fileSystem";
export interface FileSet {
    [name: string]: DirectoryLike | FileLike | Link | Symlink | Mount | null | undefined;
}
export declare type DirectoryLike = FileSet | Directory;
export declare type FileLike = File | Buffer | string;
/** Extended options for a directory in a `FileMap` */
export declare class Directory {
    readonly files: FileSet;
    readonly uid: number | undefined;
    readonly gid: number | undefined;
    readonly mode: number | undefined;
    readonly meta: Record<string, any>;
    constructor(files: FileSet, {uid, gid, mode, meta}?: {
        uid?: number;
        gid?: number;
        mode?: number;
        meta?: Record<string, any>;
    });
}
/** Extended options for a file in a `FileMap` */
export declare class File {
    readonly data: Buffer | string;
    readonly encoding: string | undefined;
    readonly uid: number | undefined;
    readonly gid: number | undefined;
    readonly mode: number | undefined;
    readonly meta: Record<string, any>;
    constructor(data: Buffer | string, {uid, gid, mode, meta, encoding}?: {
        encoding?: string;
        uid?: number;
        gid?: number;
        mode?: number;
        meta?: Record<string, any>;
    });
}
/** Extended options for a hard link in a `FileMap` */
export declare class Link {
    readonly path: string;
    constructor(path: string);
}
/** Extended options for a symbolic link in a `FileMap` */
export declare class Symlink {
    readonly symlink: string;
    readonly uid: number | undefined;
    readonly gid: number | undefined;
    readonly mode: number | undefined;
    readonly meta: Record<string, any>;
    constructor(symlink: string, {uid, gid, mode, meta}?: {
        uid?: number;
        gid?: number;
        mode?: number;
        meta?: Record<string, any>;
    });
}
/** Extended options for mounting a virtual copy of an external file system via a `FileMap` */
export declare class Mount {
    readonly source: string;
    readonly resolver: FileSystemResolver;
    readonly uid: number | undefined;
    readonly gid: number | undefined;
    readonly mode: number | undefined;
    readonly meta: Record<string, any>;
    constructor(source: string, resolver: FileSystemResolver, {uid, gid, mode, meta}?: {
        uid?: number;
        gid?: number;
        mode?: number;
        meta?: Record<string, any>;
    });
}
