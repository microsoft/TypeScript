import * as constants from "./constants";

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
    constructor(dev: number, ino: number, mode: number, nlink: number, uid: number, gid: number, rdev: number, size: number, blksize: number, blocks: number, atimeMs: number, mtimeMs: number, ctimeMs: number, birthtimeMs: number);
    constructor(dev: number = 0, ino: number = 0, mode: number = 0, nlink: number = 0, uid: number = 0, gid: number = 0, rdev: number = 0, size: number = 0, blksize: number = 0, blocks: number = 0, atimeMs: number = 0, mtimeMs: number = 0, ctimeMs: number = 0, birthtimeMs: number = 0) {
        this.dev = dev;
        this.ino = ino;
        this.mode = mode;
        this.nlink = nlink;
        this.uid = uid;
        this.gid = gid;
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

    public isFile() { return (this.mode & constants.S_IFMT) === constants.S_IFREG; }
    public isDirectory() { return (this.mode & constants.S_IFMT) === constants.S_IFDIR; }
    public isSymbolicLink() { return (this.mode & constants.S_IFMT) === constants.S_IFLNK; }
    public isBlockDevice() { return (this.mode & constants.S_IFMT) === constants.S_IFBLK; }
    public isCharacterDevice() { return (this.mode & constants.S_IFMT) === constants.S_IFCHR; }
    public isFIFO() { return (this.mode & constants.S_IFMT) === constants.S_IFIFO; }
    public isSocket() { return (this.mode & constants.S_IFMT) === constants.S_IFSOCK; }
}
