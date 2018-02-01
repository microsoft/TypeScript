/// <reference types="node" />
import * as core from "@typescript/vfs-core";
import { FileSystemResolver } from "./fileSystem";
export declare type Inode = FileInode | DirectoryInode | SymlinkInode;
export interface InodeBase {
    dev: number;
    ino: number;
    mode: number;
    uid: number;
    gid: number;
    atimeMs: number;
    mtimeMs: number;
    ctimeMs: number;
    birthtimeMs: number;
    nlink: number;
    shadowRoot: Inode | undefined;
    incomingLinks: Map<DirectoryInode | undefined, core.SortedSet<string>>;
    paths?: ReadonlyArray<string>;
    meta?: core.Metadata;
}
export interface FileInode extends InodeBase {
    size: number | undefined;
    buffer: Buffer;
    source: string | undefined;
    resolver: FileSystemResolver | undefined;
    shadowRoot: FileInode | undefined;
}
export interface DirectoryInode extends InodeBase {
    links: core.SortedMap<string, Inode> | undefined;
    source: string | undefined;
    resolver: FileSystemResolver | undefined;
    shadowRoot: DirectoryInode | undefined;
}
export interface SymlinkInode extends InodeBase {
    symlink: string;
    shadowRoot: SymlinkInode | undefined;
}
export declare function isFileInode(node: Inode): node is FileInode;
export declare function isDirectoryInode(node: Inode): node is DirectoryInode;
export declare function isSymlinkInode(node: Inode): node is SymlinkInode;
