"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vpath = require("@typescript/vfs-path");
const constants = require("../constants");
const typemock_1 = require("typemock");
const fileSystem_1 = require("../fileSystem");
const fileSet_1 = require("../fileSet");
const chai_1 = require("chai");
describe("fileSystem", () => {
    function describeFileSystem(title, ignoreCase, root) {
        describe(title, () => {
            describe("accessSync", () => {
                it("ok (user owner)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.umask(0o000);
                    fs.chmodSync("file", 0o700);
                    fs.chownSync("file", 1, 2);
                    fs.setuid(1);
                    fs.setgid(3);
                    fs.accessSync("file", constants.R_OK | constants.W_OK | constants.X_OK);
                });
                it("ok (group owner)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.umask(0o000);
                    fs.chmodSync("file", 0o070);
                    fs.chownSync("file", 1, 2);
                    fs.setuid(3);
                    fs.setgid(2);
                    fs.accessSync("file", constants.R_OK | constants.W_OK | constants.X_OK);
                });
                it("ok (other)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.umask(0o000);
                    fs.chmodSync("file", 0o007);
                    fs.setuid(3);
                    fs.setgid(4);
                    fs.accessSync("file", constants.R_OK | constants.W_OK | constants.X_OK);
                });
                it("ok (none)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.umask(0o000);
                    fs.chmodSync("file", 0o000);
                    fs.setuid(1);
                    fs.setgid(2);
                    fs.accessSync("file", constants.F_OK);
                });
                it("fail (self, EACCES)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.umask(0o000);
                    fs.chmodSync("file", 0o000);
                    fs.setuid(1);
                    fs.setgid(2);
                    chai_1.assert.throws(() => { fs.accessSync("file", constants.R_OK); }, /EACCES/);
                });
                it("fail (parent, EACCES)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir/file": "" } } });
                    fs.umask(0o000);
                    fs.chmodSync("dir", 0o666);
                    fs.setuid(1);
                    fs.setgid(2);
                    chai_1.assert.throws(() => { fs.accessSync("dir/file", constants.R_OK); }, /EACCES/);
                });
            });
            describe("chmodSync", () => {
                it("ok", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.chmodSync("file", 0o654);
                    chai_1.assert.strictEqual(fs.statSync("file").mode & 0o777, 0o654);
                });
                it("fail (EPERM)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.setuid(1);
                    chai_1.assert.throws(() => fs.chmodSync("file", 0o654), /EPERM/);
                });
                it("fail (EROFS)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.makeReadonly();
                    chai_1.assert.throws(() => fs.chmodSync("file", 0o654), /EROFS/);
                });
            });
            describe("fchmodSync", () => {
                it("ok", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    fs.fchmodSync(fd, 0o654);
                    fs.closeSync(fd);
                    chai_1.assert.strictEqual(fs.statSync("file").mode & 0o777, 0o654);
                });
                it("fail (EPERM)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.setuid(1);
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    chai_1.assert.throws(() => fs.fchmodSync(fd, 0o654), /EPERM/);
                });
                it("fail (EROFS)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.makeReadonly();
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    chai_1.assert.throws(() => fs.fchmodSync(fd, 0o654), /EROFS/);
                });
            });
            describe("chownSync", () => {
                it("ok (uid)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.chownSync("file", 1, -1);
                    const stats = fs.statSync("file");
                    chai_1.assert.strictEqual(stats.uid, 1);
                    chai_1.assert.strictEqual(stats.gid, 0);
                });
                it("ok (gid)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.chownSync("file", 1, -1);
                    fs.setuid(1);
                    fs.chownSync("file", -1, 2);
                    const stats = fs.statSync("file");
                    chai_1.assert.strictEqual(stats.uid, 1);
                    chai_1.assert.strictEqual(stats.gid, 2);
                });
                it("fail (uid, EPERM)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.setuid(1);
                    chai_1.assert.throws(() => fs.chownSync("file", 1, -1), /EPERM/);
                });
                it("fail (gid, EPERM)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.setuid(1);
                    chai_1.assert.throws(() => fs.chownSync("file", -1, 1), /EPERM/);
                });
                it("fail (EROFS)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.makeReadonly();
                    chai_1.assert.throws(() => fs.chownSync("file", 1, 2), /EROFS/);
                });
            });
            describe("fchownSync", () => {
                it("ok (uid)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    fs.fchownSync(fd, 1, -1);
                    fs.closeSync(fd);
                    const stats = fs.statSync("file");
                    chai_1.assert.strictEqual(stats.uid, 1);
                    chai_1.assert.strictEqual(stats.gid, 0);
                });
                it("ok (gid)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    fs.chownSync("file", 1, -1);
                    fs.setuid(1);
                    fs.chownSync("file", -1, 2);
                    const stats = fs.statSync("file");
                    chai_1.assert.strictEqual(stats.uid, 1);
                    chai_1.assert.strictEqual(stats.gid, 2);
                });
                it("fail (uid, EPERM)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.setuid(1);
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    chai_1.assert.throws(() => fs.fchownSync(fd, 1, 2), /EPERM/);
                });
                it("fail (gid, EPERM)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.setuid(1);
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    chai_1.assert.throws(() => fs.fchownSync(fd, -1, 2), /EPERM/);
                });
                it("fail (EROFS)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.makeReadonly();
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    chai_1.assert.throws(() => fs.fchownSync(fd, 1, 2), /EROFS/);
                });
            });
            describe("utimesSync", () => {
                it("ok", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "" } } });
                    fs.time(3);
                    fs.utimesSync("file", 1, 2);
                    const stats = fs.statSync("file");
                    chai_1.assert.strictEqual(stats.atimeMs, 1);
                    chai_1.assert.strictEqual(stats.mtimeMs, 2);
                    chai_1.assert.strictEqual(stats.ctimeMs, 3);
                });
            });
            describe("futimesSync", () => {
                it("ok", () => __awaiter(this, void 0, void 0, function* () {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "" } } });
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    fs.time(3);
                    fs.futimesSync(fd, 1, 2);
                    fs.closeSync(fd);
                    const stats2 = fs.statSync("file");
                    chai_1.assert.strictEqual(stats2.atimeMs, 1);
                    chai_1.assert.strictEqual(stats2.mtimeMs, 2);
                    chai_1.assert.strictEqual(stats2.ctimeMs, 3);
                }));
            });
            describe("statSync", () => {
                it("ok (file)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    const stats = fs.statSync("file");
                    chai_1.assert.isTrue(stats.isFile());
                    chai_1.assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    chai_1.assert.strictEqual(stats.nlink, 1);
                    chai_1.assert.strictEqual(stats.size, 7);
                    chai_1.assert.strictEqual(stats.uid, 1);
                    chai_1.assert.strictEqual(stats.gid, 2);
                    chai_1.assert.strictEqual(stats.atimeMs, 0);
                    chai_1.assert.strictEqual(stats.mtimeMs, 0);
                    chai_1.assert.strictEqual(stats.ctimeMs, 0);
                    chai_1.assert.strictEqual(stats.birthtimeMs, 0);
                });
                it("ok (file, hardlink)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    fs.linkSync("file", "link");
                    const stats = fs.statSync("link");
                    chai_1.assert.isTrue(stats.isFile());
                    chai_1.assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    chai_1.assert.strictEqual(stats.nlink, 2);
                    chai_1.assert.strictEqual(stats.size, 7);
                    chai_1.assert.strictEqual(stats.uid, 1);
                    chai_1.assert.strictEqual(stats.gid, 2);
                    chai_1.assert.strictEqual(stats.atimeMs, 0);
                    chai_1.assert.strictEqual(stats.mtimeMs, 0);
                    chai_1.assert.strictEqual(stats.ctimeMs, 1);
                    chai_1.assert.strictEqual(stats.birthtimeMs, 0);
                });
                it("ok (file, symlink)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    fs.symlinkSync("file", "symlink");
                    fs.lchmodSync("symlink", 0o456);
                    fs.lchownSync("symlink", 3, 4);
                    const stats = fs.statSync("symlink");
                    chai_1.assert.isTrue(stats.isFile());
                    chai_1.assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    chai_1.assert.strictEqual(stats.nlink, 1);
                    chai_1.assert.strictEqual(stats.size, 7);
                    chai_1.assert.strictEqual(stats.uid, 1);
                    chai_1.assert.strictEqual(stats.gid, 2);
                    chai_1.assert.strictEqual(stats.atimeMs, 0);
                    chai_1.assert.strictEqual(stats.mtimeMs, 0);
                    chai_1.assert.strictEqual(stats.ctimeMs, 0);
                    chai_1.assert.strictEqual(stats.birthtimeMs, 0);
                });
                it("ok (directory)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { time: 0, files: { [root]: { "dir": {} } } });
                    fs.chmodSync("dir", 0o654);
                    fs.chownSync("dir", 1, 2);
                    fs.time(1);
                    const stats = fs.statSync("dir");
                    chai_1.assert.isTrue(stats.isDirectory());
                    chai_1.assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    chai_1.assert.strictEqual(stats.nlink, 1);
                    chai_1.assert.strictEqual(stats.size, 0);
                    chai_1.assert.strictEqual(stats.uid, 1);
                    chai_1.assert.strictEqual(stats.gid, 2);
                    chai_1.assert.strictEqual(stats.atimeMs, 0);
                    chai_1.assert.strictEqual(stats.mtimeMs, 0);
                    chai_1.assert.strictEqual(stats.ctimeMs, 0);
                    chai_1.assert.strictEqual(stats.birthtimeMs, 0);
                });
                it("ok (directory, symlink)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { time: 0, files: { [root]: { "dir": {} } } });
                    fs.chmodSync("dir", 0o654);
                    fs.chownSync("dir", 1, 2);
                    fs.time(1);
                    fs.symlinkSync("dir", "symlink");
                    fs.lchmodSync("symlink", 0o456);
                    fs.lchownSync("symlink", 3, 4);
                    const stats = fs.statSync("symlink");
                    chai_1.assert.isTrue(stats.isDirectory());
                    chai_1.assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    chai_1.assert.strictEqual(stats.nlink, 1);
                    chai_1.assert.strictEqual(stats.size, 0);
                    chai_1.assert.strictEqual(stats.uid, 1);
                    chai_1.assert.strictEqual(stats.gid, 2);
                    chai_1.assert.strictEqual(stats.atimeMs, 0);
                    chai_1.assert.strictEqual(stats.mtimeMs, 0);
                    chai_1.assert.strictEqual(stats.ctimeMs, 0);
                    chai_1.assert.strictEqual(stats.birthtimeMs, 0);
                });
            });
            describe("lstatSync", () => {
                it("ok (file)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    const stats = fs.lstatSync("file");
                    chai_1.assert.isTrue(stats.isFile());
                    chai_1.assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    chai_1.assert.strictEqual(stats.nlink, 1);
                    chai_1.assert.strictEqual(stats.size, 7);
                    chai_1.assert.strictEqual(stats.uid, 1);
                    chai_1.assert.strictEqual(stats.gid, 2);
                    chai_1.assert.strictEqual(stats.atimeMs, 0);
                    chai_1.assert.strictEqual(stats.mtimeMs, 0);
                    chai_1.assert.strictEqual(stats.ctimeMs, 0);
                    chai_1.assert.strictEqual(stats.birthtimeMs, 0);
                });
                it("ok (file, hardlink)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    fs.linkSync("file", "link");
                    const stats = fs.lstatSync("link");
                    chai_1.assert.isTrue(stats.isFile());
                    chai_1.assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    chai_1.assert.strictEqual(stats.nlink, 2);
                    chai_1.assert.strictEqual(stats.size, 7);
                    chai_1.assert.strictEqual(stats.uid, 1);
                    chai_1.assert.strictEqual(stats.gid, 2);
                    chai_1.assert.strictEqual(stats.atimeMs, 0);
                    chai_1.assert.strictEqual(stats.mtimeMs, 0);
                    chai_1.assert.strictEqual(stats.ctimeMs, 1);
                    chai_1.assert.strictEqual(stats.birthtimeMs, 0);
                });
                it("ok (file, symlink)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    fs.symlinkSync("file", "symlink");
                    fs.lchmodSync("symlink", 0o456);
                    fs.lchownSync("symlink", 3, 4);
                    const stats = fs.lstatSync("symlink");
                    chai_1.assert.isTrue(stats.isSymbolicLink());
                    chai_1.assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o456);
                    chai_1.assert.strictEqual(stats.nlink, 1);
                    chai_1.assert.strictEqual(stats.size, 4);
                    chai_1.assert.strictEqual(stats.uid, 3);
                    chai_1.assert.strictEqual(stats.gid, 4);
                    chai_1.assert.strictEqual(stats.atimeMs, 1);
                    chai_1.assert.strictEqual(stats.mtimeMs, 1);
                    chai_1.assert.strictEqual(stats.ctimeMs, 1);
                    chai_1.assert.strictEqual(stats.birthtimeMs, 1);
                });
                it("ok (directory)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { time: 0, files: { [root]: { "dir": {} } } });
                    fs.chmodSync("dir", 0o654);
                    fs.chownSync("dir", 1, 2);
                    fs.time(1);
                    const stats = fs.lstatSync("dir");
                    chai_1.assert.isTrue(stats.isDirectory());
                    chai_1.assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    chai_1.assert.strictEqual(stats.nlink, 1);
                    chai_1.assert.strictEqual(stats.size, 0);
                    chai_1.assert.strictEqual(stats.uid, 1);
                    chai_1.assert.strictEqual(stats.gid, 2);
                    chai_1.assert.strictEqual(stats.atimeMs, 0);
                    chai_1.assert.strictEqual(stats.mtimeMs, 0);
                    chai_1.assert.strictEqual(stats.ctimeMs, 0);
                    chai_1.assert.strictEqual(stats.birthtimeMs, 0);
                });
                it("ok (directory, symlink)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { time: 0, files: { [root]: { "dir": {} } } });
                    fs.chmodSync("dir", 0o654);
                    fs.chownSync("dir", 1, 2);
                    fs.time(1);
                    fs.symlinkSync("dir", "symlink");
                    fs.lchmodSync("symlink", 0o456);
                    fs.lchownSync("symlink", 3, 4);
                    const stats = fs.lstatSync("symlink");
                    chai_1.assert.isTrue(stats.isSymbolicLink());
                    chai_1.assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o456);
                    chai_1.assert.strictEqual(stats.nlink, 1);
                    chai_1.assert.strictEqual(stats.size, 3);
                    chai_1.assert.strictEqual(stats.uid, 3);
                    chai_1.assert.strictEqual(stats.gid, 4);
                    chai_1.assert.strictEqual(stats.atimeMs, 1);
                    chai_1.assert.strictEqual(stats.mtimeMs, 1);
                    chai_1.assert.strictEqual(stats.ctimeMs, 1);
                    chai_1.assert.strictEqual(stats.birthtimeMs, 1);
                });
            });
            describe("fstatSync", () => {
                it("ok (file)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    const stats = fs.fstatSync(fd);
                    fs.closeSync(fd);
                    chai_1.assert.isTrue(stats.isFile());
                    chai_1.assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    chai_1.assert.strictEqual(stats.nlink, 1);
                    chai_1.assert.strictEqual(stats.size, 7);
                    chai_1.assert.strictEqual(stats.uid, 1);
                    chai_1.assert.strictEqual(stats.gid, 2);
                    chai_1.assert.strictEqual(stats.atimeMs, 0);
                    chai_1.assert.strictEqual(stats.mtimeMs, 0);
                    chai_1.assert.strictEqual(stats.ctimeMs, 0);
                    chai_1.assert.strictEqual(stats.birthtimeMs, 0);
                });
                it("ok (file hardlink)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    fs.linkSync("file", "link");
                    const fd = fs.openSync("link", constants.O_RDONLY);
                    const stats = fs.fstatSync(fd);
                    fs.closeSync(fd);
                    chai_1.assert.isTrue(stats.isFile());
                    chai_1.assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    chai_1.assert.strictEqual(stats.nlink, 2);
                    chai_1.assert.strictEqual(stats.size, 7);
                    chai_1.assert.strictEqual(stats.uid, 1);
                    chai_1.assert.strictEqual(stats.gid, 2);
                    chai_1.assert.strictEqual(stats.atimeMs, 0);
                    chai_1.assert.strictEqual(stats.mtimeMs, 0);
                    chai_1.assert.strictEqual(stats.ctimeMs, 1);
                    chai_1.assert.strictEqual(stats.birthtimeMs, 0);
                });
                it("ok (file symlink)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    fs.symlinkSync("file", "symlink");
                    fs.lchmodSync("symlink", 0o456);
                    fs.lchownSync("symlink", 3, 4);
                    const fd = fs.openSync("symlink", constants.O_RDONLY);
                    const stats = fs.fstatSync(fd);
                    fs.closeSync(fd);
                    chai_1.assert.isTrue(stats.isFile());
                    chai_1.assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    chai_1.assert.strictEqual(stats.nlink, 1);
                    chai_1.assert.strictEqual(stats.size, 7);
                    chai_1.assert.strictEqual(stats.uid, 1);
                    chai_1.assert.strictEqual(stats.gid, 2);
                    chai_1.assert.strictEqual(stats.atimeMs, 0);
                    chai_1.assert.strictEqual(stats.mtimeMs, 0);
                    chai_1.assert.strictEqual(stats.ctimeMs, 0);
                    chai_1.assert.strictEqual(stats.birthtimeMs, 0);
                });
                it("ok (directory)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { time: 0, files: { [root]: { "dir": {} } } });
                    fs.chmodSync("dir", 0o654);
                    fs.chownSync("dir", 1, 2);
                    fs.time(1);
                    const fd = fs.openSync("dir", constants.O_RDONLY | constants.O_DIRECTORY);
                    const stats = fs.fstatSync(fd);
                    fs.closeSync(fd);
                    chai_1.assert.isTrue(stats.isDirectory());
                    chai_1.assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    chai_1.assert.strictEqual(stats.nlink, 1);
                    chai_1.assert.strictEqual(stats.size, 0);
                    chai_1.assert.strictEqual(stats.uid, 1);
                    chai_1.assert.strictEqual(stats.gid, 2);
                    chai_1.assert.strictEqual(stats.atimeMs, 0);
                    chai_1.assert.strictEqual(stats.mtimeMs, 0);
                    chai_1.assert.strictEqual(stats.ctimeMs, 0);
                    chai_1.assert.strictEqual(stats.birthtimeMs, 0);
                });
                it("ok (directory symlink)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { time: 0, files: { [root]: { "dir": {} } } });
                    fs.chmodSync("dir", 0o654);
                    fs.chownSync("dir", 1, 2);
                    fs.time(1);
                    fs.symlinkSync("dir", "symlink");
                    fs.lchmodSync("symlink", 0o456);
                    fs.lchownSync("symlink", 3, 4);
                    const fd = fs.openSync("symlink", constants.O_RDONLY | constants.O_DIRECTORY);
                    const stats = fs.fstatSync(fd);
                    fs.closeSync(fd);
                    chai_1.assert.isTrue(stats.isDirectory());
                    chai_1.assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    chai_1.assert.strictEqual(stats.nlink, 1);
                    chai_1.assert.strictEqual(stats.size, 0);
                    chai_1.assert.strictEqual(stats.uid, 1);
                    chai_1.assert.strictEqual(stats.gid, 2);
                    chai_1.assert.strictEqual(stats.atimeMs, 0);
                    chai_1.assert.strictEqual(stats.mtimeMs, 0);
                    chai_1.assert.strictEqual(stats.ctimeMs, 0);
                    chai_1.assert.strictEqual(stats.birthtimeMs, 0);
                });
            });
            describe("readdirSync", () => {
                it("ok", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "a": {} } } });
                    const actual = fs.readdirSync(root);
                    chai_1.assert.deepEqual(actual, ["a"]);
                });
            });
            describe("mkdirSync", () => {
                it("ok", () => {
                    const path = vpath.combine(root, "a");
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: {} } });
                    fs.mkdirSync(path);
                    chai_1.assert.isTrue(fs.statSync(path).isDirectory());
                });
            });
            describe("rmdirSync", () => {
                it("ok", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "a": {} } } });
                    fs.rmdirSync(vpath.combine(root, "a"));
                    const actual = fs.readdirSync(root);
                    chai_1.assert.deepEqual(actual.length, 0);
                });
            });
            describe("linkSync", () => {
                it("ok", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.linkSync("file", "link");
                    const stats1 = fs.statSync("file");
                    const stats2 = fs.statSync("link");
                    chai_1.assert.deepEqual(stats2, stats1);
                    chai_1.assert.strictEqual(stats1.nlink, 2);
                });
            });
            describe("unlinkSync", () => {
                it("ok (nlink = 1)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.unlinkSync("file");
                    chai_1.assert.throws(() => fs.statSync("file"), /ENOENT/);
                });
                it("ok (nlink > 1)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.linkSync("file", "link");
                    fs.unlinkSync("file");
                    chai_1.assert.throws(() => fs.statSync("file"), /ENOENT/);
                    const stats = fs.statSync("link");
                    chai_1.assert.strictEqual(stats.nlink, 1);
                });
            });
            describe("renameSync", () => {
                it("ok", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    const stats1 = fs.statSync("file");
                    fs.renameSync("file", "renamed");
                    chai_1.assert.throws(() => fs.statSync("file"), /ENOENT/);
                    const stats2 = fs.statSync("renamed");
                    chai_1.assert.strictEqual(stats2.ino, stats1.ino);
                });
            });
            describe("truncateSync", () => {
                it("length 0", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.truncateSync("file", 0);
                    chai_1.assert.strictEqual(fs.readFileSync("file", "utf8"), "");
                });
                it("length non-zero and less than size", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.truncateSync("file", 2);
                    chai_1.assert.strictEqual(fs.readFileSync("file", "utf8"), "te");
                });
                it("length greater than size", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.truncateSync("file", 5);
                    chai_1.assert.strictEqual(fs.readFileSync("file", "utf8"), "test\u0000");
                });
            });
            describe("ftruncateSync", () => {
                it("length 0", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    const fd = fs.openSync("file", constants.O_WRONLY);
                    fs.ftruncateSync(fd, 0);
                    fs.closeSync(fd);
                    chai_1.assert.strictEqual(fs.readFileSync("file", "utf8"), "");
                });
                it("length non-zero and less than size", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    const fd = fs.openSync("file", constants.O_WRONLY);
                    fs.ftruncateSync(fd, 2);
                    fs.closeSync(fd);
                    chai_1.assert.strictEqual(fs.readFileSync("file", "utf8"), "te");
                });
                it("length greater than size", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    const fd = fs.openSync("file", constants.O_WRONLY);
                    fs.ftruncateSync(fd, 5);
                    fs.closeSync(fd);
                    chai_1.assert.strictEqual(fs.readFileSync("file", "utf8"), "test\u0000");
                });
            });
            describe("symlinkSync", () => {
                it("ok (absolute target)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync(vpath.combine(root, "file"), "symlink");
                    chai_1.assert.strictEqual(fs.readFileSync("symlink", "utf8"), "test");
                });
                it("ok (relative target)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync("file", "symlink");
                    chai_1.assert.strictEqual(fs.readFileSync("symlink", "utf8"), "test");
                });
                it("ok (indirect target)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync("file", "symlink1");
                    fs.symlinkSync("symlink1", "symlink2");
                    chai_1.assert.strictEqual(fs.readFileSync("symlink2", "utf8"), "test");
                });
            });
            describe("readlinkSync", () => {
                it("ok (absolute target)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync(vpath.combine(root, "file"), "symlink");
                    chai_1.assert.strictEqual(fs.readlinkSync("symlink"), vpath.combine(root, "file"));
                });
                it("ok (relative target)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync("file", "symlink");
                    chai_1.assert.strictEqual(fs.readlinkSync("symlink"), "file");
                });
            });
            describe("realpathSync", () => {
                it("ok (absolute target)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync(vpath.combine(root, "file"), "symlink");
                    chai_1.assert.strictEqual(fs.realpathSync("symlink"), vpath.combine(root, "file"));
                });
                it("ok (relative target)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync("file", "symlink");
                    chai_1.assert.strictEqual(fs.realpathSync("symlink"), vpath.combine(root, "file"));
                });
                it("ok (indirect target)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync("file", "symlink1");
                    fs.symlinkSync("symlink1", "symlink2");
                    chai_1.assert.strictEqual(fs.realpathSync("symlink2"), vpath.combine(root, "file"));
                });
            });
            describe("openSync", () => {
                it("ok", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    const fd = fs.openSync("file", "r");
                    chai_1.assert.isTrue(isFinite(fd));
                    chai_1.assert.isTrue(fd !== 0);
                });
            });
            describe("closeSync", () => {
                it("ok", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    const fd = fs.openSync("file", "r");
                    fs.closeSync(fd);
                    chai_1.assert.throws(() => fs.fstatSync(fd), /EBADF/);
                });
            });
            describe("readSync", () => {
                it("ok", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    const fd = fs.openSync("file", "r");
                    const buffer = Buffer.alloc(4);
                    const bytesRead = fs.readSync(fd, buffer, 0, buffer.byteLength);
                    chai_1.assert.strictEqual(bytesRead, buffer.byteLength);
                    chai_1.assert.strictEqual(buffer.toString("utf8"), "test");
                });
            });
            describe("readFileSync", () => {
                it("ok", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    chai_1.assert.strictEqual(fs.readFileSync("file", "utf8"), "test");
                });
            });
            describe("writeSync", () => {
                it("ok", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    const fd = fs.openSync("file", "w");
                    const buffer = Buffer.from("replacement", "utf8");
                    const bytesWritten = fs.writeSync(fd, buffer, 0, buffer.byteLength);
                    fs.closeSync(fd);
                    chai_1.assert.strictEqual(bytesWritten, buffer.byteLength);
                    chai_1.assert.strictEqual(fs.readFileSync("file", "utf8"), "replacement");
                });
            });
            describe("writeFileSync", () => {
                it("ok", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.writeFileSync("file", "replacement", "utf8");
                    chai_1.assert.strictEqual(fs.readFileSync("file", "utf8"), "replacement");
                });
            });
            describe("appendFileSync", () => {
                it("ok", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.appendFileSync("file", "addition", "utf8");
                    chai_1.assert.strictEqual(fs.readFileSync("file", "utf8"), "testaddition");
                });
            });
            describe("mount", () => {
                it("ok", () => {
                    const other = new fileSystem_1.FileSystem(/*ignoreCase*/ false, { files: {
                            "/": {
                                "subdir": {},
                                "file": ""
                            }
                        } });
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: {} } });
                    fs.mountSync("/", vpath.combine(root, "dir"), other);
                    const names = fs.readdirSync(vpath.combine(root, "dir"));
                    chai_1.assert.deepEqual(names, ["file", "subdir"]);
                });
            });
            describe("shadow", () => {
                it("ok", () => {
                    const rootFs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: {} } }).makeReadonly();
                    const shadowFs = rootFs.shadow();
                    chai_1.assert.strictEqual(shadowFs.shadowRoot, rootFs);
                });
                it("shadow reads from root", () => {
                    const rootFs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": {}, "file": "test" } } }).makeReadonly();
                    const shadowFs = rootFs.shadow();
                    chai_1.assert.deepEqual(shadowFs.readdirSync(root), ["dir", "file"]);
                    chai_1.assert.strictEqual(shadowFs.readFileSync("file", "utf8"), "test");
                });
                it("shadow write does not affect root", () => {
                    const rootFs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": {}, "file": "test" } } }).makeReadonly();
                    const shadowFs = rootFs.shadow();
                    shadowFs.writeFileSync("file", "replacement", "utf8");
                    chai_1.assert.strictEqual(rootFs.readFileSync("file", "utf8"), "test");
                });
            });
            describe("meta", () => {
                it("ok", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.filemeta("file").set("testKey", "testValue");
                    chai_1.assert.strictEqual(fs.filemeta("file").get("testKey"), "testValue");
                });
                it("shadow inherits from root", () => {
                    const rootFs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    rootFs.filemeta("file").set("testKey", "testValue");
                    rootFs.makeReadonly();
                    const shadowFs = rootFs.shadow();
                    chai_1.assert.strictEqual(shadowFs.filemeta("file").get("testKey"), "testValue");
                });
                it("shadow inherits from root with mutation", () => {
                    const rootFs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    rootFs.makeReadonly();
                    const shadowFs = rootFs.shadow();
                    rootFs.filemeta("file").set("testKey", "testValue");
                    chai_1.assert.strictEqual(shadowFs.filemeta("file").get("testKey"), "testValue");
                });
                it("shadow does not mutate root", () => {
                    const rootFs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    rootFs.filemeta("file").set("testKey", "testValue");
                    rootFs.makeReadonly();
                    const shadowFs = rootFs.shadow();
                    shadowFs.filemeta("file").set("testKey", "newValue");
                    chai_1.assert.strictEqual(rootFs.filemeta("file").get("testKey"), "testValue");
                });
            });
            describe("watch", () => {
                describe("directory (non-recursive)", () => {
                    it("open() new file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": {} } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                        fs.openSync("dir/file", "w+");
                        callbackSpy.verify(_ => _("rename", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("open() + write() new file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": {} } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                        const fd = fs.openSync("dir/file", "w+");
                        fs.writeSync(fd, Buffer.from("test"), 0, 4);
                        callbackSpy.verify(_ => _("rename", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("open() + write() + close() new file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": {} } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                        const fd = fs.openSync("dir/file", "w+");
                        fs.writeSync(fd, Buffer.from("test"), 0, 4);
                        fs.closeSync(fd);
                        callbackSpy.verify(_ => _("rename", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(2));
                    });
                    it("open() + close() new file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": {} } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                        const fd = fs.openSync("dir/file", "w+");
                        fs.closeSync(fd);
                        callbackSpy.verify(_ => _("rename", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("writeFile() new file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": {} } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                        fs.writeFileSync("dir/file", "test");
                        callbackSpy.verify(_ => _("rename", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(2));
                    });
                    it("writeFile() replace file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "" } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                        fs.writeFileSync("dir/file", "test");
                        callbackSpy.verify(_ => _("change", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("truncate() file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "test" } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                        fs.truncateSync(vpath.combine(root, "dir/file"));
                        callbackSpy.verify(_ => _("change", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("rename() file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "test" } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                        fs.renameSync(vpath.combine(root, "dir/file"), vpath.combine(root, "dir/file1"));
                        callbackSpy.verify(_ => _("rename", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("rename", "file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(2));
                    });
                    it("link() new file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "test" } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                        fs.linkSync(vpath.combine(root, "dir/file"), vpath.combine(root, "dir/file1"));
                        callbackSpy.verify(_ => _("rename", "file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("symlink() file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "test" } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                        fs.symlinkSync(vpath.combine(root, "dir/file"), vpath.combine(root, "dir/file1"));
                        callbackSpy.verify(_ => _("rename", "file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("unlink() file (single link)", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "" } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                        fs.unlinkSync(vpath.combine(root, "dir/file"));
                        callbackSpy.verify(_ => _("rename", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("unlink() file (multiple links)", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "", "file1": new fileSet_1.Link("file") } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                        fs.unlinkSync(vpath.combine(root, "dir/file"));
                        callbackSpy.verify(_ => _("rename", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("mkdir() new subdirectory", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": {} } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                        fs.mkdirSync(vpath.combine(root, "dir/subdir"));
                        callbackSpy.verify(_ => _("rename", "subdir"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("rmdir() subdirectory", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "subdir": {} } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                        fs.rmdirSync(vpath.combine(root, "dir/subdir"));
                        callbackSpy.verify(_ => _("rename", "subdir"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                });
                describe("directory (recursive)", () => {
                    it("open() new file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "sub1": {} } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), { recursive: true }, callbackSpy.proxy);
                        fs.openSync("dir/sub1/file1", "w+");
                        callbackSpy.verify(_ => _("rename", "sub1/file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "sub1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(2));
                    });
                    it("open() + write() new file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "sub1": {} } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), { recursive: true }, callbackSpy.proxy);
                        const fd = fs.openSync("dir/sub1/file1", "w+");
                        fs.writeSync(fd, Buffer.from("test"), 0, 4);
                        callbackSpy.verify(_ => _("rename", "sub1/file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "sub1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(2));
                    });
                    it("open() + write() + close() new file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "sub1": {} } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), { recursive: true }, callbackSpy.proxy);
                        const fd = fs.openSync("dir/sub1/file1", "w+");
                        fs.writeSync(fd, Buffer.from("test"), 0, 4);
                        fs.closeSync(fd);
                        callbackSpy.verify(_ => _("rename", "sub1/file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "sub1/file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "sub1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(3));
                    });
                    it("open() + close() new file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "sub1": {} } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), { recursive: true }, callbackSpy.proxy);
                        const fd = fs.openSync("dir/sub1/file1", "w+");
                        fs.closeSync(fd);
                        callbackSpy.verify(_ => _("rename", "sub1/file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "sub1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(2));
                    });
                    it("writeFile() new file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "sub1": {} } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), { recursive: true }, callbackSpy.proxy);
                        fs.writeFileSync("dir/sub1/file1", "test");
                        callbackSpy.verify(_ => _("rename", "sub1/file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "sub1/file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "sub1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(3));
                    });
                    it("writeFile() replace file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "sub1": { "file1": "" } } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), { recursive: true }, callbackSpy.proxy);
                        fs.writeFileSync("dir/sub1/file1", "test");
                        callbackSpy.verify(_ => _("change", "sub1/file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("truncate() file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "sub1": { "file1": "test" } } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), { recursive: true }, callbackSpy.proxy);
                        fs.truncateSync(vpath.combine(root, "dir/sub1/file1"));
                        callbackSpy.verify(_ => _("change", "sub1/file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("rename() file (same directory)", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "sub1": { "file1": "test" } } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), { recursive: true }, callbackSpy.proxy);
                        fs.renameSync(vpath.combine(root, "dir/sub1/file1"), vpath.combine(root, "dir/sub1/file2"));
                        callbackSpy.verify(_ => _("rename", "sub1/file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("rename", "sub1/file2"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "sub1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(3));
                    });
                    it("rename() file (different directory)", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "sub1": { "file1": "test" }, "sub2": {} } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), { recursive: true }, callbackSpy.proxy);
                        fs.renameSync(vpath.combine(root, "dir/sub1/file1"), vpath.combine(root, "dir/sub2/file1"));
                        callbackSpy.verify(_ => _("rename", "sub1/file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("rename", "sub2/file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "sub1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "sub2"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(4));
                    });
                    it("link() file (same directory)", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "sub1": { "file1": "test" } } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), { recursive: true }, callbackSpy.proxy);
                        fs.linkSync(vpath.combine(root, "dir/sub1/file1"), vpath.combine(root, "dir/sub1/file2"));
                        callbackSpy.verify(_ => _("rename", "sub1/file2"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "sub1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(2));
                    });
                    it("link() file (different directory)", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "sub1": { "file1": "test" }, "sub2": {} } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), { recursive: true }, callbackSpy.proxy);
                        fs.linkSync(vpath.combine(root, "dir/sub1/file1"), vpath.combine(root, "dir/sub2/file1"));
                        callbackSpy.verify(_ => _("rename", "sub2/file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "sub2"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(2));
                    });
                    it("symlink() file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "sub1": { "file": "test" } } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), { recursive: true }, callbackSpy.proxy);
                        fs.symlinkSync(vpath.combine(root, "dir/sub1/file"), vpath.combine(root, "dir/sub1/file1"));
                        callbackSpy.verify(_ => _("rename", "sub1/file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "sub1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(2));
                    });
                    it("unlink() file (single link)", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "sub1": { "file1": "" } } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), { recursive: true }, callbackSpy.proxy);
                        fs.unlinkSync(vpath.combine(root, "dir/sub1/file1"));
                        callbackSpy.verify(_ => _("rename", "sub1/file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "sub1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(2));
                    });
                    it("unlink() file (multiple links)", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "sub1": { "file1": "", "file2": new fileSet_1.Link("file1") } } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), { recursive: true }, callbackSpy.proxy);
                        fs.unlinkSync(vpath.combine(root, "dir/sub1/file1"));
                        callbackSpy.verify(_ => _("rename", "sub1/file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "sub1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(2));
                    });
                    it("mkdir() new subdirectory", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "sub1": {} } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), { recursive: true }, callbackSpy.proxy);
                        fs.mkdirSync(vpath.combine(root, "dir/sub1/sub2"));
                        callbackSpy.verify(_ => _("rename", "sub1/sub2"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "sub1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(2));
                    });
                    it("rmdir() subdirectory", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "sub1": { "sub2": {} } } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir"), { recursive: true }, callbackSpy.proxy);
                        fs.rmdirSync(vpath.combine(root, "dir/sub1/sub2"));
                        callbackSpy.verify(_ => _("rename", "sub1/sub2"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "sub1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(2));
                    });
                });
                describe("file", () => {
                    it("writeFile() replace", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file1": "" } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir/file1"), callbackSpy.proxy);
                        fs.writeFileSync("dir/file1", "test");
                        callbackSpy.verify(_ => _("change", "file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("unlink() (single link)", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file1": "" } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir/file1"), callbackSpy.proxy);
                        fs.unlinkSync(vpath.combine(root, "dir/file1"));
                        callbackSpy.verify(_ => _("rename", "file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                });
                describe("symlink (directory, non-recursive)", () => {
                    it("open() new file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": {}, "dir2": new fileSet_1.Symlink("dir") } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir2"), callbackSpy.proxy);
                        fs.openSync("dir/file", "w+");
                        callbackSpy.verify(_ => _("rename", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("open() + write() new file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": {}, "dir2": new fileSet_1.Symlink("dir") } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir2"), callbackSpy.proxy);
                        const fd = fs.openSync("dir/file", "w+");
                        fs.writeSync(fd, Buffer.from("test"), 0, 4);
                        callbackSpy.verify(_ => _("rename", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("open() + write() + close() new file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": {}, "dir2": new fileSet_1.Symlink("dir") } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir2"), callbackSpy.proxy);
                        const fd = fs.openSync("dir/file", "w+");
                        fs.writeSync(fd, Buffer.from("test"), 0, 4);
                        fs.closeSync(fd);
                        callbackSpy.verify(_ => _("rename", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(2));
                    });
                    it("open() + close() new file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": {}, "dir2": new fileSet_1.Symlink("dir") } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir2"), callbackSpy.proxy);
                        const fd = fs.openSync("dir/file", "w+");
                        fs.closeSync(fd);
                        callbackSpy.verify(_ => _("rename", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("writeFile() new file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": {}, "dir2": new fileSet_1.Symlink("dir") } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir2"), callbackSpy.proxy);
                        fs.writeFileSync("dir/file", "test");
                        callbackSpy.verify(_ => _("rename", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("change", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(2));
                    });
                    it("writeFile() replace file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "" }, "dir2": new fileSet_1.Symlink("dir") } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir2"), callbackSpy.proxy);
                        fs.writeFileSync("dir/file", "test");
                        callbackSpy.verify(_ => _("change", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("truncate() file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "test" }, "dir2": new fileSet_1.Symlink("dir") } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir2"), callbackSpy.proxy);
                        fs.truncateSync(vpath.combine(root, "dir/file"));
                        callbackSpy.verify(_ => _("change", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("rename() file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "test" }, "dir2": new fileSet_1.Symlink("dir") } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir2"), callbackSpy.proxy);
                        fs.renameSync(vpath.combine(root, "dir/file"), vpath.combine(root, "dir/file1"));
                        callbackSpy.verify(_ => _("rename", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _("rename", "file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.exactly(2));
                    });
                    it("link() new file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "test" }, "dir2": new fileSet_1.Symlink("dir") } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir2"), callbackSpy.proxy);
                        fs.linkSync(vpath.combine(root, "dir/file"), vpath.combine(root, "dir/file1"));
                        callbackSpy.verify(_ => _("rename", "file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("symlink() file", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "test" }, "dir2": new fileSet_1.Symlink("dir") } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir2"), callbackSpy.proxy);
                        fs.symlinkSync(vpath.combine(root, "dir/file"), vpath.combine(root, "dir/file1"));
                        callbackSpy.verify(_ => _("rename", "file1"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("unlink() file (single link)", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "" }, "dir2": new fileSet_1.Symlink("dir") } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir2"), callbackSpy.proxy);
                        fs.unlinkSync(vpath.combine(root, "dir/file"));
                        callbackSpy.verify(_ => _("rename", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("unlink() file (multiple links)", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "", "file1": new fileSet_1.Link("file") }, "dir2": new fileSet_1.Symlink("dir") } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir2"), callbackSpy.proxy);
                        fs.unlinkSync(vpath.combine(root, "dir/file"));
                        callbackSpy.verify(_ => _("rename", "file"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("mkdir() new subdirectory", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": {}, "dir2": new fileSet_1.Symlink("dir") } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir2"), callbackSpy.proxy);
                        fs.mkdirSync(vpath.combine(root, "dir/subdir"));
                        callbackSpy.verify(_ => _("rename", "subdir"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("rmdir() subdirectory", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "subdir": {} }, "dir2": new fileSet_1.Symlink("dir") } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir2"), callbackSpy.proxy);
                        fs.rmdirSync(vpath.combine(root, "dir/subdir"));
                        callbackSpy.verify(_ => _("rename", "subdir"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                });
                describe("symlink (file)", () => {
                    it("writeFile() replace", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file1": "", "file2": new fileSet_1.Symlink("file1") } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir/file2"), callbackSpy.proxy);
                        fs.writeFileSync("dir/file1", "test");
                        callbackSpy.verify(_ => _("change", "file2"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                    it("unlink() (single link)", () => {
                        const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file1": "", "file2": new fileSet_1.Symlink("file1") } } } });
                        const callbackSpy = typemock_1.spy();
                        fs.watch(vpath.combine(root, "dir/file2"), callbackSpy.proxy);
                        fs.unlinkSync(vpath.combine(root, "dir/file1"));
                        callbackSpy.verify(_ => _("rename", "file2"), typemock_1.Times.once());
                        callbackSpy.verify(_ => _(typemock_1.Arg.any(), typemock_1.Arg.any()), typemock_1.Times.once());
                    });
                });
                it("fail: invalid path (ENOENT)", () => {
                    const fs = new fileSystem_1.FileSystem(ignoreCase, { files: { [root]: {} } });
                    chai_1.assert.throws(() => fs.watch(vpath.combine(root, "dir")), /ENOENT/);
                });
            });
        });
    }
    describeFileSystem("posix", /*ignoreCase*/ false, /*root*/ "/");
    describeFileSystem("win32", /*ignoreCase*/ true, /*root*/ "c:/");
});

//# sourceMappingURL=fileSystemTests.js.map
