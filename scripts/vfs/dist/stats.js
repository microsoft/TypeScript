"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants = require("./constants");
class Stats {
    constructor(dev = 0, ino = 0, mode = 0, nlink = 0, uid = 0, gid = 0, rdev = 0, size = 0, blksize = 0, blocks = 0, atimeMs = 0, mtimeMs = 0, ctimeMs = 0, birthtimeMs = 0) {
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
    isFile() { return (this.mode & constants.S_IFMT) === constants.S_IFREG; }
    isDirectory() { return (this.mode & constants.S_IFMT) === constants.S_IFDIR; }
    isSymbolicLink() { return (this.mode & constants.S_IFMT) === constants.S_IFLNK; }
    isBlockDevice() { return (this.mode & constants.S_IFMT) === constants.S_IFBLK; }
    isCharacterDevice() { return (this.mode & constants.S_IFMT) === constants.S_IFCHR; }
    isFIFO() { return (this.mode & constants.S_IFMT) === constants.S_IFIFO; }
    isSocket() { return (this.mode & constants.S_IFMT) === constants.S_IFSOCK; }
}
exports.Stats = Stats;

//# sourceMappingURL=stats.js.map
