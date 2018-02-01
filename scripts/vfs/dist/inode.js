"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants = require("./constants");
function isFileInode(node) {
    return (node.mode & constants.S_IFMT) === constants.S_IFREG;
}
exports.isFileInode = isFileInode;
function isDirectoryInode(node) {
    return (node.mode & constants.S_IFMT) === constants.S_IFDIR;
}
exports.isDirectoryInode = isDirectoryInode;
function isSymlinkInode(node) {
    return (node.mode & constants.S_IFMT) === constants.S_IFLNK;
}
exports.isSymlinkInode = isSymlinkInode;

//# sourceMappingURL=inode.js.map
