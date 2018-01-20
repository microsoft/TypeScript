import * as core from "@typescript/vfs-core";
import * as constants from "./constants";
import { FileSystemResolver } from "./fileSystem";

// a generic POSIX inode
export type Inode = FileInode | DirectoryInode | SymlinkInode;

export interface InodeBase {
    // inode
    dev: number; // device id
    ino: number; // inode id
    mode: number; // file mode
    uid: number; // owner user id
    gid: number; // owner group id
    atimeMs: number; // access time
    mtimeMs: number; // modified time
    ctimeMs: number; // status change time
    birthtimeMs: number; // creation time
    nlink: number; // number of hard links

    // extra
    shadowRoot: Inode | undefined;
    incomingLinks: Map<DirectoryInode | undefined, core.SortedSet<string>>;
    paths?: ReadonlyArray<string>;
    meta?: core.Metadata; // metadata stored on the inode
}

export interface FileInode extends InodeBase {
    // file inode
    size: number | undefined;
    buffer: Buffer;
    source: string | undefined;
    resolver: FileSystemResolver | undefined;
    shadowRoot: FileInode | undefined;
}

export interface DirectoryInode extends InodeBase {
    // directory inode
    links: core.SortedMap<string, Inode> | undefined;
    source: string | undefined;
    resolver: FileSystemResolver | undefined;
    shadowRoot: DirectoryInode | undefined;
}

export interface SymlinkInode extends InodeBase {
    // symlink inode
    symlink: string;
    shadowRoot: SymlinkInode | undefined;
}

export function isFileInode(node: Inode): node is FileInode {
    return (node.mode & constants.S_IFMT) === constants.S_IFREG;
}

export function isDirectoryInode(node: Inode): node is DirectoryInode {
    return (node.mode & constants.S_IFMT) === constants.S_IFDIR;
}

export function isSymlinkInode(node: Inode): node is SymlinkInode {
    return (node.mode & constants.S_IFMT) === constants.S_IFLNK;
}
