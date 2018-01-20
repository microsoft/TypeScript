import { FileSystemResolver } from "./fileSystem";

export interface FileSet {
    [name: string]: DirectoryLike | FileLike | Link | Symlink | Mount | null | undefined;
}

export type DirectoryLike = FileSet | Directory;
export type FileLike = File | Buffer | string;

/** Extended options for a directory in a `FileMap` */
export class Directory {
    public readonly files: FileSet;
    public readonly uid: number | undefined;
    public readonly gid: number | undefined;
    public readonly mode: number | undefined;
    public readonly meta: Record<string, any>;
    constructor(files: FileSet, { uid, gid, mode, meta }: { uid?: number, gid?: number, mode?: number, meta?: Record<string, any> } = {}) {
        this.files = files;
        this.uid = uid;
        this.gid = gid;
        this.mode = mode;
        this.meta = meta;
    }
}

/** Extended options for a file in a `FileMap` */
export class File {
    public readonly data: Buffer | string;
    public readonly encoding: string | undefined;
    public readonly uid: number | undefined;
    public readonly gid: number | undefined;
    public readonly mode: number | undefined;
    public readonly meta: Record<string, any>;
    constructor(data: Buffer | string, { uid, gid, mode, meta, encoding }: { encoding?: string, uid?: number, gid?: number, mode?: number, meta?: Record<string, any> } = {}) {
        this.data = data;
        this.encoding = encoding;
        this.uid = uid;
        this.gid = gid;
        this.mode = mode;
        this.meta = meta;
    }
}

/** Extended options for a hard link in a `FileMap` */
export class Link {
    public readonly path: string;
    constructor(path: string) {
        this.path = path;
    }
}

/** Extended options for a symbolic link in a `FileMap` */
export class Symlink {
    public readonly symlink: string;
    public readonly uid: number | undefined;
    public readonly gid: number | undefined;
    public readonly mode: number | undefined;
    public readonly meta: Record<string, any>;
    constructor(symlink: string, { uid, gid, mode, meta }: { uid?: number, gid?: number, mode?: number, meta?: Record<string, any> } = {}) {
        this.symlink = symlink;
        this.uid = uid;
        this.gid = gid;
        this.mode = mode;
        this.meta = meta;
    }
}

/** Extended options for mounting a virtual copy of an external file system via a `FileMap` */
export class Mount {
    public readonly source: string;
    public readonly resolver: FileSystemResolver;
    public readonly uid: number | undefined;
    public readonly gid: number | undefined;
    public readonly mode: number | undefined;
    public readonly meta: Record<string, any>;
    constructor(source: string, resolver: FileSystemResolver, { uid, gid, mode, meta }: { uid?: number, gid?: number, mode?: number, meta?: Record<string, any> } = {}) {
        this.source = source;
        this.resolver = resolver;
        this.uid = uid;
        this.gid = gid;
        this.mode = mode;
        this.meta = meta;
    }
}