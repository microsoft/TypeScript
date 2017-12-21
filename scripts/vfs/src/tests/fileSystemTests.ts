import * as vpath from "@typescript/vfs-path";
import * as constants from "../constants";
import { spy, Times, Arg } from "typemock";
import { FileSystem, WatchEvent, Link } from "../fileSystem";
import { assert } from "chai";

describe("fileSystem", () => {
    function describeFileSystem(title: string, ignoreCase: boolean, root: string) {
        describe(title, () => {
            describe("accessSync", () => {
                it("ok (user owner)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.umask(0o000);
                    fs.chmodSync("file", 0o700);
                    fs.chownSync("file", 1, 2);
                    fs.setuid(1);
                    fs.setgid(3);
                    fs.accessSync("file", constants.R_OK | constants.W_OK | constants.X_OK);
                });

                it("ok (group owner)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.umask(0o000);
                    fs.chmodSync("file", 0o070);
                    fs.chownSync("file", 1, 2);
                    fs.setuid(3);
                    fs.setgid(2);
                    fs.accessSync("file", constants.R_OK | constants.W_OK | constants.X_OK);
                });

                it("ok (other)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.umask(0o000);
                    fs.chmodSync("file", 0o007);
                    fs.setuid(3);
                    fs.setgid(4);
                    fs.accessSync("file", constants.R_OK | constants.W_OK | constants.X_OK);
                });

                it("ok (none)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.umask(0o000);
                    fs.chmodSync("file", 0o000);
                    fs.setuid(1);
                    fs.setgid(2);
                    fs.accessSync("file", constants.F_OK);
                });

                it("fail (self, EACCES)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.umask(0o000);
                    fs.chmodSync("file", 0o000);
                    fs.setuid(1);
                    fs.setgid(2);
                    assert.throws(() => { fs.accessSync("file", constants.R_OK); }, /EACCES/);
                });

                it("fail (parent, EACCES)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "dir/file": "" } } });
                    fs.umask(0o000);
                    fs.chmodSync("dir", 0o666);
                    fs.setuid(1);
                    fs.setgid(2);
                    assert.throws(() => { fs.accessSync("dir/file", constants.R_OK); }, /EACCES/);
                });
            });

            describe("chmodSync", () => {
                it("ok", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.chmodSync("file", 0o654);
                    assert.strictEqual(fs.statSync("file").mode & 0o777, 0o654);
                });

                it("fail (EPERM)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.setuid(1);
                    assert.throws(() => fs.chmodSync("file", 0o654), /EPERM/);
                });

                it("fail (EROFS)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.makeReadonly();
                    assert.throws(() => fs.chmodSync("file", 0o654), /EROFS/);
                });
            });

            describe("fchmodSync", () => {
                it("ok", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    fs.fchmodSync(fd, 0o654);
                    fs.closeSync(fd);
                    assert.strictEqual(fs.statSync("file").mode & 0o777, 0o654);
                });

                it("fail (EPERM)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.setuid(1);
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    assert.throws(() => fs.fchmodSync(fd, 0o654), /EPERM/);
                });

                it("fail (EROFS)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.makeReadonly();
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    assert.throws(() => fs.fchmodSync(fd, 0o654), /EROFS/);
                });
            });

            describe("chownSync", () => {
                it("ok (uid)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.chownSync("file", 1, -1);
                    const stats = fs.statSync("file");
                    assert.strictEqual(stats.uid, 1);
                    assert.strictEqual(stats.gid, 0);
                });

                it("ok (gid)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.chownSync("file", 1, -1);
                    fs.setuid(1);
                    fs.chownSync("file", -1, 2);
                    const stats = fs.statSync("file");
                    assert.strictEqual(stats.uid, 1);
                    assert.strictEqual(stats.gid, 2);
                });

                it("fail (uid, EPERM)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.setuid(1);
                    assert.throws(() => fs.chownSync("file", 1, -1), /EPERM/);
                });

                it("fail (gid, EPERM)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.setuid(1);
                    assert.throws(() => fs.chownSync("file", -1, 1), /EPERM/);
                });

                it("fail (EROFS)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.makeReadonly();
                    assert.throws(() => fs.chownSync("file", 1, 2), /EROFS/);
                });
            });

            describe("fchownSync", () => {
                it("ok (uid)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    fs.fchownSync(fd, 1, -1);
                    fs.closeSync(fd);
                    const stats = fs.statSync("file");
                    assert.strictEqual(stats.uid, 1);
                    assert.strictEqual(stats.gid, 0);
                });

                it("ok (gid)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    fs.chownSync("file", 1, -1);
                    fs.setuid(1);
                    fs.chownSync("file", -1, 2);
                    const stats = fs.statSync("file");
                    assert.strictEqual(stats.uid, 1);
                    assert.strictEqual(stats.gid, 2);
                });

                it("fail (uid, EPERM)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.setuid(1);
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    assert.throws(() => fs.fchownSync(fd, 1, 2), /EPERM/);
                });

                it("fail (gid, EPERM)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.setuid(1);
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    assert.throws(() => fs.fchownSync(fd, -1, 2), /EPERM/);
                });

                it("fail (EROFS)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.makeReadonly();
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    assert.throws(() => fs.fchownSync(fd, 1, 2), /EROFS/);
                });
            });

            describe("utimesSync", () => {
                it("ok", () => {
                    const fs = new FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "" } } });
                    fs.time(3);
                    fs.utimesSync("file", 1, 2);
                    const stats = fs.statSync("file");
                    assert.strictEqual(stats.atimeMs, 1);
                    assert.strictEqual(stats.mtimeMs, 2);
                    assert.strictEqual(stats.ctimeMs, 3);
                });
            });

            describe("futimesSync", () => {
                it("ok", async () => {
                    const fs = new FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "" } } });
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    fs.time(3);
                    fs.futimesSync(fd, 1, 2);
                    fs.closeSync(fd);
                    const stats2 = fs.statSync("file");
                    assert.strictEqual(stats2.atimeMs, 1);
                    assert.strictEqual(stats2.mtimeMs, 2);
                    assert.strictEqual(stats2.ctimeMs, 3);
                });
            });

            describe("statSync", () => {
                it("ok (file)", () => {
                    const fs = new FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    const stats = fs.statSync("file");
                    assert.isTrue(stats.isFile());
                    assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 7);
                    assert.strictEqual(stats.uid, 1);
                    assert.strictEqual(stats.gid, 2);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 0);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (file, hardlink)", () => {
                    const fs = new FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    fs.linkSync("file", "link");
                    const stats = fs.statSync("link");
                    assert.isTrue(stats.isFile());
                    assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    assert.strictEqual(stats.nlink, 2);
                    assert.strictEqual(stats.size, 7);
                    assert.strictEqual(stats.uid, 1);
                    assert.strictEqual(stats.gid, 2);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 1);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (file, symlink)", () => {
                    const fs = new FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    fs.symlinkSync("file", "symlink");
                    fs.lchmodSync("symlink", 0o456);
                    fs.lchownSync("symlink", 3, 4);
                    const stats = fs.statSync("symlink");
                    assert.isTrue(stats.isFile());
                    assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 7);
                    assert.strictEqual(stats.uid, 1);
                    assert.strictEqual(stats.gid, 2);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 0);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (directory)", () => {
                    const fs = new FileSystem(ignoreCase, { time: 0, files: { [root]: { "dir": {} } } });
                    fs.chmodSync("dir", 0o654);
                    fs.chownSync("dir", 1, 2);
                    fs.time(1);
                    const stats = fs.statSync("dir");
                    assert.isTrue(stats.isDirectory());
                    assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 0);
                    assert.strictEqual(stats.uid, 1);
                    assert.strictEqual(stats.gid, 2);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 0);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (directory, symlink)", () => {
                    const fs = new FileSystem(ignoreCase, { time: 0, files: { [root]: { "dir": {} } } });
                    fs.chmodSync("dir", 0o654);
                    fs.chownSync("dir", 1, 2);
                    fs.time(1);
                    fs.symlinkSync("dir", "symlink");
                    fs.lchmodSync("symlink", 0o456);
                    fs.lchownSync("symlink", 3, 4);
                    const stats = fs.statSync("symlink");
                    assert.isTrue(stats.isDirectory());
                    assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 0);
                    assert.strictEqual(stats.uid, 1);
                    assert.strictEqual(stats.gid, 2);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 0);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });
            });

            describe("lstatSync", () => {
                it("ok (file)", () => {
                    const fs = new FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    const stats = fs.lstatSync("file");
                    assert.isTrue(stats.isFile());
                    assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 7);
                    assert.strictEqual(stats.uid, 1);
                    assert.strictEqual(stats.gid, 2);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 0);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (file, hardlink)", () => {
                    const fs = new FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    fs.linkSync("file", "link");
                    const stats = fs.lstatSync("link");
                    assert.isTrue(stats.isFile());
                    assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    assert.strictEqual(stats.nlink, 2);
                    assert.strictEqual(stats.size, 7);
                    assert.strictEqual(stats.uid, 1);
                    assert.strictEqual(stats.gid, 2);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 1);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (file, symlink)", () => {
                    const fs = new FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    fs.symlinkSync("file", "symlink");
                    fs.lchmodSync("symlink", 0o456);
                    fs.lchownSync("symlink", 3, 4);
                    const stats = fs.lstatSync("symlink");
                    assert.isTrue(stats.isSymbolicLink());
                    assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o456);
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 4);
                    assert.strictEqual(stats.uid, 3);
                    assert.strictEqual(stats.gid, 4);
                    assert.strictEqual(stats.atimeMs, 1);
                    assert.strictEqual(stats.mtimeMs, 1);
                    assert.strictEqual(stats.ctimeMs, 1);
                    assert.strictEqual(stats.birthtimeMs, 1);
                });

                it("ok (directory)", () => {
                    const fs = new FileSystem(ignoreCase, { time: 0, files: { [root]: { "dir": {} } } });
                    fs.chmodSync("dir", 0o654);
                    fs.chownSync("dir", 1, 2);
                    fs.time(1);
                    const stats = fs.lstatSync("dir");
                    assert.isTrue(stats.isDirectory());
                    assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 0);
                    assert.strictEqual(stats.uid, 1);
                    assert.strictEqual(stats.gid, 2);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 0);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (directory, symlink)", () => {
                    const fs = new FileSystem(ignoreCase, { time: 0, files: { [root]: { "dir": {} } } });
                    fs.chmodSync("dir", 0o654);
                    fs.chownSync("dir", 1, 2);
                    fs.time(1);
                    fs.symlinkSync("dir", "symlink");
                    fs.lchmodSync("symlink", 0o456);
                    fs.lchownSync("symlink", 3, 4);
                    const stats = fs.lstatSync("symlink");
                    assert.isTrue(stats.isSymbolicLink());
                    assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o456);
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 3);
                    assert.strictEqual(stats.uid, 3);
                    assert.strictEqual(stats.gid, 4);
                    assert.strictEqual(stats.atimeMs, 1);
                    assert.strictEqual(stats.mtimeMs, 1);
                    assert.strictEqual(stats.ctimeMs, 1);
                    assert.strictEqual(stats.birthtimeMs, 1);
                });
            });

            describe("fstatSync", () => {
                it("ok (file)", () => {
                    const fs = new FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    const fd = fs.openSync("file", constants.O_RDONLY);
                    const stats = fs.fstatSync(fd);
                    fs.closeSync(fd);
                    assert.isTrue(stats.isFile());
                    assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 7);
                    assert.strictEqual(stats.uid, 1);
                    assert.strictEqual(stats.gid, 2);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 0);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (file hardlink)", () => {
                    const fs = new FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    fs.linkSync("file", "link");
                    const fd = fs.openSync("link", constants.O_RDONLY);
                    const stats = fs.fstatSync(fd);
                    fs.closeSync(fd);
                    assert.isTrue(stats.isFile());
                    assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    assert.strictEqual(stats.nlink, 2);
                    assert.strictEqual(stats.size, 7);
                    assert.strictEqual(stats.uid, 1);
                    assert.strictEqual(stats.gid, 2);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 1);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (file symlink)", () => {
                    const fs = new FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.chmodSync("file", 0o654);
                    fs.chownSync("file", 1, 2);
                    fs.time(1);
                    fs.symlinkSync("file", "symlink");
                    fs.lchmodSync("symlink", 0o456);
                    fs.lchownSync("symlink", 3, 4);
                    const fd = fs.openSync("symlink", constants.O_RDONLY);
                    const stats = fs.fstatSync(fd);
                    fs.closeSync(fd);
                    assert.isTrue(stats.isFile());
                    assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 7);
                    assert.strictEqual(stats.uid, 1);
                    assert.strictEqual(stats.gid, 2);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 0);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (directory)", () => {
                    const fs = new FileSystem(ignoreCase, { time: 0, files: { [root]: { "dir": {} } } });
                    fs.chmodSync("dir", 0o654);
                    fs.chownSync("dir", 1, 2);
                    fs.time(1);
                    const fd = fs.openSync("dir", constants.O_RDONLY | constants.O_DIRECTORY);
                    const stats = fs.fstatSync(fd);
                    fs.closeSync(fd);
                    assert.isTrue(stats.isDirectory());
                    assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 0);
                    assert.strictEqual(stats.uid, 1);
                    assert.strictEqual(stats.gid, 2);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 0);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (directory symlink)", () => {
                    const fs = new FileSystem(ignoreCase, { time: 0, files: { [root]: { "dir": {} } } });
                    fs.chmodSync("dir", 0o654);
                    fs.chownSync("dir", 1, 2);
                    fs.time(1);
                    fs.symlinkSync("dir", "symlink");
                    fs.lchmodSync("symlink", 0o456);
                    fs.lchownSync("symlink", 3, 4);
                    const fd = fs.openSync("symlink", constants.O_RDONLY | constants.O_DIRECTORY);
                    const stats = fs.fstatSync(fd);
                    fs.closeSync(fd);
                    assert.isTrue(stats.isDirectory());
                    assert.strictEqual(stats.mode & ~constants.S_IFMT, 0o654);
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 0);
                    assert.strictEqual(stats.uid, 1);
                    assert.strictEqual(stats.gid, 2);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 0);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });
            });

            describe("readdirSync", () => {
                it("ok", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "a": {} } } });
                    const actual = fs.readdirSync(root);
                    assert.deepEqual(actual, ["a"]);
                });
            });

            describe("mkdirSync", () => {
                it("ok", () => {
                    const path = vpath.combine(root, "a");
                    const fs = new FileSystem(ignoreCase, { files: { [root]: {} } });
                    fs.mkdirSync(path);
                    assert.isTrue(fs.statSync(path).isDirectory());
                });
            });

            describe("rmdirSync", () => {
                it("ok", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "a": {} } } });
                    fs.rmdirSync(vpath.combine(root, "a"));
                    const actual = fs.readdirSync(root);
                    assert.deepEqual(actual.length, 0);
                });
            });

            describe("linkSync", () => {
                it("ok", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.linkSync("file", "link");
                    const stats1 = fs.statSync("file");
                    const stats2 = fs.statSync("link");
                    assert.deepEqual(stats2, stats1);
                    assert.strictEqual(stats1.nlink, 2);
                });
            });

            describe("unlinkSync", () => {
                it("ok (nlink = 1)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.unlinkSync("file");
                    assert.throws(() => fs.statSync("file"), /ENOENT/);
                });

                it("ok (nlink > 1)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.linkSync("file", "link");
                    fs.unlinkSync("file");
                    assert.throws(() => fs.statSync("file"), /ENOENT/);
                    const stats = fs.statSync("link");
                    assert.strictEqual(stats.nlink, 1);
                });
            });

            describe("renameSync", () => {
                it("ok", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    const stats1 = fs.statSync("file");
                    fs.renameSync("file", "renamed");
                    assert.throws(() => fs.statSync("file"), /ENOENT/);
                    const stats2 = fs.statSync("renamed");
                    assert.strictEqual(stats2.ino, stats1.ino);
                });
            });

            describe("truncateSync", () => {
                it("length 0", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.truncateSync("file", 0);
                    assert.strictEqual(fs.readFileSync("file", "utf8"), "");
                });

                it("length non-zero and less than size", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.truncateSync("file", 2);
                    assert.strictEqual(fs.readFileSync("file", "utf8"), "te");
                });

                it("length greater than size", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.truncateSync("file", 5);
                    assert.strictEqual(fs.readFileSync("file", "utf8"), "test\u0000");
                });
            });

            describe("ftruncateSync", () => {
                it("length 0", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    const fd = fs.openSync("file", constants.O_WRONLY);
                    fs.ftruncateSync(fd, 0);
                    fs.closeSync(fd);
                    assert.strictEqual(fs.readFileSync("file", "utf8"), "");
                });

                it("length non-zero and less than size", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    const fd = fs.openSync("file", constants.O_WRONLY);
                    fs.ftruncateSync(fd, 2);
                    fs.closeSync(fd);
                    assert.strictEqual(fs.readFileSync("file", "utf8"), "te");
                });

                it("length greater than size", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    const fd = fs.openSync("file", constants.O_WRONLY);
                    fs.ftruncateSync(fd, 5);
                    fs.closeSync(fd);
                    assert.strictEqual(fs.readFileSync("file", "utf8"), "test\u0000");
                });
            });

            describe("symlinkSync", () => {
                it("ok (absolute target)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync(vpath.combine(root, "file"), "symlink");
                    assert.strictEqual(fs.readFileSync("symlink", "utf8"), "test");
                });

                it("ok (relative target)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync("file", "symlink");
                    assert.strictEqual(fs.readFileSync("symlink", "utf8"), "test");
                });

                it("ok (indirect target)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync("file", "symlink1");
                    fs.symlinkSync("symlink1", "symlink2");
                    assert.strictEqual(fs.readFileSync("symlink2", "utf8"), "test");
                });
            });

            describe("readlinkSync", () => {
                it("ok (absolute target)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync(vpath.combine(root, "file"), "symlink");
                    assert.strictEqual(fs.readlinkSync("symlink"), vpath.combine(root, "file"));
                });

                it("ok (relative target)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync("file", "symlink");
                    assert.strictEqual(fs.readlinkSync("symlink"), "file");
                });
            });

            describe("realpathSync", () => {
                it("ok (absolute target)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync(vpath.combine(root, "file"), "symlink");
                    assert.strictEqual(fs.realpathSync("symlink"), vpath.combine(root, "file"));
                });

                it("ok (relative target)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync("file", "symlink");
                    assert.strictEqual(fs.realpathSync("symlink"), vpath.combine(root, "file"));
                });

                it("ok (indirect target)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync("file", "symlink1");
                    fs.symlinkSync("symlink1", "symlink2");
                    assert.strictEqual(fs.realpathSync("symlink2"), vpath.combine(root, "file"));
                });
            });

            describe("openSync", () => {
                it("ok", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    const fd = fs.openSync("file", "r");
                    assert.isTrue(isFinite(fd));
                    assert.isTrue(fd !== 0);
                });
            });

            describe("closeSync", () => {
                it("ok", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    const fd = fs.openSync("file", "r");
                    fs.closeSync(fd);
                    assert.throws(() => fs.fstatSync(fd), /EBADF/);
                });
            });

            describe("readSync", () => {
                it("ok", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    const fd = fs.openSync("file", "r");
                    const buffer = Buffer.alloc(4);
                    const bytesRead = fs.readSync(fd, buffer, 0, buffer.byteLength);
                    assert.strictEqual(bytesRead, buffer.byteLength);
                    assert.strictEqual(buffer.toString("utf8"), "test");
                });
            });

            describe("readFileSync", () => {
                it("ok", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    assert.strictEqual(fs.readFileSync("file", "utf8"), "test");
                });
            });

            describe("writeSync", () => {
                it("ok", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    const fd = fs.openSync("file", "w");
                    const buffer = Buffer.from("replacement", "utf8");
                    const bytesWritten = fs.writeSync(fd, buffer, 0, buffer.byteLength);
                    fs.closeSync(fd);
                    assert.strictEqual(bytesWritten, buffer.byteLength);
                    assert.strictEqual(fs.readFileSync("file", "utf8"), "replacement");
                });
            });

            describe("writeFileSync", () => {
                it("ok", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.writeFileSync("file", "replacement", "utf8");
                    assert.strictEqual(fs.readFileSync("file", "utf8"), "replacement");
                });
            });

            describe("appendFileSync", () => {
                it("ok", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.appendFileSync("file", "addition", "utf8");
                    assert.strictEqual(fs.readFileSync("file", "utf8"), "testaddition");
                });
            });

            // http://man7.org/linux/man-pages/man7/inotify.7.html - Examples
            describe("inotify", () => {
                it("example1", () => {
                    // Suppose an application is watching the directory 'dir' and the file
                    // 'dir/myfile' for all events. The examples below show some events that
                    // will be generated for these two objects.
                    const fs = new FileSystem(ignoreCase, { files: { [root]: {
                        "dir": { "myfile": "test" }
                    } } });
                    const buf = Buffer.alloc(16);
                    const events: WatchEvent[] = [];
                    const inotify_fd = fs["_inotify_init"](event => { events.push(event); });
                    const dir_wd = fs["_inotify_add_watch"](inotify_fd, "dir", constants.IN_ALL_EVENTS);
                    const myfile_wd = fs["_inotify_add_watch"](inotify_fd, "dir/myfile", constants.IN_ALL_EVENTS);

                    // Generates IN_OPEN events for both dir and dir/myfile
                    const fd = fs.openSync("dir/myfile", constants.O_RDWR);
                    assert.strictEqual(events.length, 2);
                    assert.isDefined(findEvent(events, dir_wd, constants.IN_OPEN, "myfile"));
                    assert.isDefined(findEvent(events, myfile_wd, constants.IN_OPEN, "myfile"));
                    events.length = 0;

                    // Generates IN_ACCESS events for both dir and dir/myfile
                    fs.readSync(fd, buf, 0, /*count*/ 4);
                    assert.strictEqual(events.length, 2);
                    assert.isDefined(findEvent(events, dir_wd, constants.IN_ACCESS, "myfile"));
                    assert.isDefined(findEvent(events, myfile_wd, constants.IN_ACCESS, "myfile"));
                    events.length = 0;

                    // Generates IN_MODIFY events for both dir and dir/myfile
                    fs.writeSync(fd, buf, 0, /*count*/ 4);
                    fs.fsyncSync(fd);
                    assert.strictEqual(events.length, 2);
                    assert.isDefined(findEvent(events, dir_wd, constants.IN_MODIFY, "myfile"));
                    assert.isDefined(findEvent(events, myfile_wd, constants.IN_MODIFY, "myfile"));
                    events.length = 0;

                    // Generates IN_ATTRIB events for both dir and dir/myfile
                    fs.fchmodSync(fd, /*mode*/ 0o660);
                    assert.strictEqual(events.length, 2);
                    assert.isDefined(findEvent(events, dir_wd, constants.IN_ATTRIB, "myfile"));
                    assert.isDefined(findEvent(events, myfile_wd, constants.IN_ATTRIB, "myfile"));
                    events.length = 0;

                    // Generates IN_CLOSE_WRITE events for both dir and dir/myfile
                    fs.closeSync(fd);
                    assert.strictEqual(events.length, 2);
                    assert.isDefined(findEvent(events, dir_wd, constants.IN_CLOSE_WRITE, "myfile"));
                    assert.isDefined(findEvent(events, myfile_wd, constants.IN_CLOSE_WRITE, "myfile"));
                    events.length = 0;

                    fs.closeSync(inotify_fd);
                });

                it("example2", () => {
                    // Suppose an application is watching the directories 'dir1' and 'dir2', and
                    // the file 'dir1/myfile'.  The following examples show some events that
                    // may be generated.
                    const fs = new FileSystem(ignoreCase, { files: { [root]: {
                        "dir1": { "myfile": "test" },
                        "dir2": {}
                    } } });
                    const events: WatchEvent[] = [];
                    const inotify_fd = fs["_inotify_init"](event => { events.push(event); });
                    const dir1_wd = fs["_inotify_add_watch"](inotify_fd, "dir1", constants.IN_ALL_EVENTS);
                    const dir2_wd = fs["_inotify_add_watch"](inotify_fd, "dir2", constants.IN_ALL_EVENTS);
                    const myfile_wd = fs["_inotify_add_watch"](inotify_fd, "dir1/myfile", constants.IN_ALL_EVENTS);

                    // Generates an IN_ATTRIB event for 'myfile' and an IN_CREATE event for 'dir2'.
                    fs.linkSync("dir1/myfile", vpath.combine("dir2", "new"));
                    assert.strictEqual(events.length, 2);
                    assert.isDefined(findEvent(events, myfile_wd, constants.IN_ATTRIB, "myfile"));
                    assert.isDefined(findEvent(events, dir2_wd, constants.IN_CREATE, "new"));
                    events.length = 0;

                    // Generates an IN_MOVED_FROM event for dir1, an IN_MOVED_TO
                    // event for dir2, and an IN_MOVE_SELF event for myfile.  The
                    // IN_MOVED_FROM and IN_MOVED_TO events will have the same
                    // cookie value.
                    fs.renameSync("dir1/myfile", vpath.combine("dir2", "myfile"));
                    assert.strictEqual(events.length, 3);
                    const event0 = findEvent(events, dir1_wd, constants.IN_MOVED_FROM, "myfile");
                    assert.isDefined(event0);
                    assert.isDefined(findEvent(events, dir2_wd, constants.IN_MOVED_TO, "myfile", event0!.cookie));
                    assert.isDefined(findEvent(events, myfile_wd, constants.IN_MOVE_SELF, "myfile"));
                    events.length = 0;

                    fs.closeSync(inotify_fd);
                });

                it("example3", () => {
                    // Suppose that 'dir1/xx' and 'dir2/yy' are (the only) links to the same
                    // file, and an application is watching 'dir1', 'dir2', 'dir1/xx', and
                    // 'dir2/yy'. The following examples show some events that may be generated.
                    const fs = new FileSystem(ignoreCase, { files: { [root]: {
                        "dir1": { "xx": "test" },
                        "dir2": { "yy": new Link("../dir1/xx") }
                    } } });
                    const events: WatchEvent[] = [];
                    const inotify_fd = fs["_inotify_init"](event => { events.push(event); });
                    const dir1_wd = fs["_inotify_add_watch"](inotify_fd, "dir1", constants.IN_ALL_EVENTS);
                    const dir2_wd = fs["_inotify_add_watch"](inotify_fd, "dir2", constants.IN_ALL_EVENTS);
                    const xx_wd = fs["_inotify_add_watch"](inotify_fd, "dir1/xx", constants.IN_ALL_EVENTS);
                    const yy_wd = fs["_inotify_add_watch"](inotify_fd, "dir2/yy", constants.IN_ALL_EVENTS);

                    // Generates an IN_ATTRIB event for 'xx' (because its link count changes)
                    // and an IN_DELETE event for 'dir2'
                    fs.unlinkSync("dir2/yy");
                    assert.strictEqual(events.length, 2);
                    assert.isDefined(findEvent(events, xx_wd, constants.IN_ATTRIB, "xx"));
                    assert.isDefined(findEvent(events, dir2_wd, constants.IN_DELETE, "yy"));
                    events.length = 0;

                    // Generates IN_ATTRIB, IN_DELETE_SELF, and IN_IGNORED events for 'xx',
                    // and an IN_DELETE event for 'dir1'
                    fs.unlinkSync("dir1/xx");
                    assert.strictEqual(events.length, 4);
                    assert.isDefined(findEvent(events, xx_wd, constants.IN_ATTRIB, "xx"));
                    assert.isDefined(findEvent(events, xx_wd, constants.IN_DELETE_SELF, "xx"));
                    assert.isDefined(findEvent(events, xx_wd, constants.IN_IGNORED, "xx"));
                    assert.isDefined(findEvent(events, dir1_wd, constants.IN_DELETE, "xx"));
                    events.length = 0;

                    fs.closeSync(inotify_fd);
                });

                it("example4", () => {
                    // Suppose an application is watching the directory dir and (the empty)
                    // directory dir/subdir. The following examples show some events that
                    // may be generated.
                    const fs = new FileSystem(ignoreCase, { files: { [root]: {
                        "dir": { "subdir": {} }
                    } } });
                    const events: WatchEvent[] = [];
                    const inotify_fd = fs["_inotify_init"](event => { events.push(event); });
                    const dir_wd = fs["_inotify_add_watch"](inotify_fd, "dir", constants.IN_ALL_EVENTS);
                    const subdir_wd = fs["_inotify_add_watch"](inotify_fd, "dir/subdir", constants.IN_ALL_EVENTS);

                    // Generates an IN_CREATE | IN_ISDIR event for 'dir'.
                    fs.mkdirSync(vpath.combine("dir", "new"));
                    assert.strictEqual(events.length, 1);
                    assert.isDefined(findEvent(events, dir_wd, constants.IN_CREATE | constants.IN_ISDIR, "new"));
                    events.length = 0;

                    // Generates IN_DELETE_SELF and IN_IGNORED events for 'subdir',
                    // and an IN_DELETE | IN_ISDIR event for 'dir'.
                    fs.rmdirSync("dir/subdir");
                    assert.strictEqual(events.length, 3);
                    assert.isDefined(findEvent(events, subdir_wd, constants.IN_DELETE_SELF, "subdir"));
                    assert.isDefined(findEvent(events, subdir_wd, constants.IN_IGNORED, "subdir"));
                    assert.isDefined(findEvent(events, dir_wd, constants.IN_DELETE | constants.IN_ISDIR, "subdir"));
                    events.length = 0;

                    fs.closeSync(inotify_fd);
                });

                function findEvent(events: WatchEvent[], wd: number, mask: number, name: string, cookie?: number) {
                    return events.find(event => event.wd === wd && event.mask === mask && event.name === name && (cookie === undefined || event.cookie === cookie));
                }
            });

            describe("mount", () => {
                it("ok", () => {
                    const other = new FileSystem(/*ignoreCase*/ false, { files: {
                        "/": {
                            "subdir": {},
                            "file": ""
                        }
                    } });

                    const fs = new FileSystem(ignoreCase, { files: { [root]: {} } });
                    fs.mountSync("/", vpath.combine(root, "dir"), other)

                    const names = fs.readdirSync(vpath.combine(root, "dir"));
                    assert.deepEqual(names, ["file", "subdir"]);
                });
            });

            describe("shadow", () => {
                it("ok", () => {
                    const rootFs = new FileSystem(ignoreCase, { files: { [root]: { } } }).makeReadonly();
                    const shadowFs = rootFs.shadow();
                    assert.strictEqual(shadowFs.shadowRoot, rootFs);
                });

                it("shadow reads from root", () => {
                    const rootFs = new FileSystem(ignoreCase, { files: { [root]: { "dir": {}, "file": "test" } } }).makeReadonly();
                    const shadowFs = rootFs.shadow();
                    assert.deepEqual(shadowFs.readdirSync(root), ["dir", "file"]);
                    assert.strictEqual(shadowFs.readFileSync("file", "utf8"), "test");
                });

                it("shadow write does not affect root", () => {
                    const rootFs = new FileSystem(ignoreCase, { files: { [root]: { "dir": {}, "file": "test" } } }).makeReadonly();
                    const shadowFs = rootFs.shadow();
                    shadowFs.writeFileSync("file", "replacement", "utf8");
                    assert.strictEqual(rootFs.readFileSync("file", "utf8"), "test");
                });
            });

            describe("meta", () => {
                it("ok", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.filemeta("file").set("testKey", "testValue");
                    assert.strictEqual(fs.filemeta("file").get("testKey"), "testValue");
                });

                it("shadow inherits from root", () => {
                    const rootFs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    rootFs.filemeta("file").set("testKey", "testValue");
                    rootFs.makeReadonly();
                    const shadowFs = rootFs.shadow();
                    assert.strictEqual(shadowFs.filemeta("file").get("testKey"), "testValue");
                });

                it("shadow inherits from root with mutation", () => {
                    const rootFs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    rootFs.makeReadonly();
                    const shadowFs = rootFs.shadow();
                    rootFs.filemeta("file").set("testKey", "testValue");
                    assert.strictEqual(shadowFs.filemeta("file").get("testKey"), "testValue");
                });

                it("shadow does not mutate root", () => {
                    const rootFs = new FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    rootFs.filemeta("file").set("testKey", "testValue");
                    rootFs.makeReadonly();
                    const shadowFs = rootFs.shadow();
                    shadowFs.filemeta("file").set("testKey", "newValue");
                    assert.strictEqual(rootFs.filemeta("file").get("testKey"), "testValue");
                });
            });

            describe("watch", () => {
                it("open() new file in directory", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "dir": {} } } });
                    const callbackSpy = spy<(eventType: string, filename: string) => void>();

                    fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                    fs.openSync("dir/file", "w+");

                    callbackSpy.verify(_ => _("rename", "file"), Times.once());
                    callbackSpy.verify(_ => _(Arg.any(), Arg.any()), Times.once());
                });
                it("open() + write() new file in directory", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "dir": {} } } });
                    const callbackSpy = spy<(eventType: string, filename: string) => void>();
                    fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);

                    const fd = fs.openSync("dir/file", "w+");
                    fs.writeSync(fd, Buffer.from("test"), 0, 4);

                    callbackSpy.verify(_ => _("rename", "file"), Times.once());
                    callbackSpy.verify(_ => _(Arg.any(), Arg.any()), Times.once());
                });
                it("open() + write() + close() new file in directory", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "dir": {} } } });
                    const callbackSpy = spy<(eventType: string, filename: string) => void>();
                    fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);

                    const fd = fs.openSync("dir/file", "w+");
                    fs.writeSync(fd, Buffer.from("test"), 0, 4);
                    fs.closeSync(fd);

                    callbackSpy.verify(_ => _("rename", "file"), Times.once());
                    callbackSpy.verify(_ => _("change", "file"), Times.once());
                    callbackSpy.verify(_ => _(Arg.any(), Arg.any()), Times.exactly(2));
                });
                it("open() + close() new file in directory", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "dir": {} } } });
                    const callbackSpy = spy<(eventType: string, filename: string) => void>();
                    fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);

                    const fd = fs.openSync("dir/file", "w+");
                    fs.closeSync(fd);

                    callbackSpy.verify(_ => _("rename", "file"), Times.once());
                    callbackSpy.verify(_ => _(Arg.any(), Arg.any()), Times.once());
                });
                it("writeFile() new file in directory", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "dir": {} } } });
                    const callbackSpy = spy<(eventType: string, filename: string) => void>();

                    fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                    fs.writeFileSync("dir/file", "test");

                    callbackSpy.verify(_ => _("rename", "file"), Times.once());
                    callbackSpy.verify(_ => _("change", "file"), Times.once());
                    callbackSpy.verify(_ => _(Arg.any(), Arg.any()), Times.exactly(2));
                });
                it("writeFile() replace file in directory", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "" } } } });
                    const callbackSpy = spy<(eventType: string, filename: string) => void>();

                    fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                    fs.writeFileSync("dir/file", "test");

                    callbackSpy.verify(_ => _("change", "file"), Times.once());
                    callbackSpy.verify(_ => _(Arg.any(), Arg.any()), Times.once());
                });
                it("truncate() file in directory", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "test" } } } });
                    const callbackSpy = spy<(eventType: string, filename: string) => void>();

                    fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                    fs.truncateSync(vpath.combine(root, "dir/file"));

                    callbackSpy.verify(_ => _("change", "file"), Times.once());
                    callbackSpy.verify(_ => _(Arg.any(), Arg.any()), Times.once());
                });
                it("rename() file in directory", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "test" } } } });
                    const callbackSpy = spy<(eventType: string, filename: string) => void>();

                    fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                    fs.renameSync(vpath.combine(root, "dir/file"), vpath.combine(root, "dir/file1"));

                    callbackSpy.verify(_ => _("rename", "file"), Times.once());
                    callbackSpy.verify(_ => _("rename", "file1"), Times.once());
                    callbackSpy.verify(_ => _(Arg.any(), Arg.any()), Times.exactly(2));
                });
                it("link() new file in directory", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "test" } } } });
                    const callbackSpy = spy<(eventType: string, filename: string) => void>();

                    fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                    fs.linkSync(vpath.combine(root, "dir/file"), vpath.combine(root, "dir/file1"));

                    callbackSpy.verify(_ => _("rename", "file1"), Times.once());
                    callbackSpy.verify(_ => _(Arg.any(), Arg.any()), Times.once());
                });
                it("symlink() file in directory", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "test" } } } });
                    const callbackSpy = spy<(eventType: string, filename: string) => void>();

                    fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                    fs.symlinkSync(vpath.combine(root, "dir/file"), vpath.combine(root, "dir/file1"));

                    callbackSpy.verify(_ => _("rename", "file1"), Times.once());
                    callbackSpy.verify(_ => _(Arg.any(), Arg.any()), Times.once());
                });
                it("unlink() file in directory (single link)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "" } } } });
                    const callbackSpy = spy<(eventType: string, filename: string) => void>();

                    fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                    fs.unlinkSync(vpath.combine(root, "dir/file"));

                    callbackSpy.verify(_ => _("rename", "file"), Times.once());
                    callbackSpy.verify(_ => _(Arg.any(), Arg.any()), Times.once());
                });
                it("unlink() file in directory (multiple links)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "", "file1": new Link("file") } } } });
                    const callbackSpy = spy<(eventType: string, filename: string) => void>();

                    fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                    fs.unlinkSync(vpath.combine(root, "dir/file"));

                    callbackSpy.verify(_ => _("rename", "file"), Times.once());
                    callbackSpy.verify(_ => _(Arg.any(), Arg.any()), Times.once());
                });
                it("mkdir() new subdirectory in directory", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "dir": { } } } });
                    const callbackSpy = spy<(eventType: string, filename: string) => void>();

                    fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                    fs.mkdirSync(vpath.combine(root, "dir/subdir"));

                    callbackSpy.verify(_ => _("rename", "subdir"), Times.once());
                    callbackSpy.verify(_ => _(Arg.any(), Arg.any()), Times.once());
                });
                it("rmdir() subdirectory in directory", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "dir": { "subdir": {} } } } });
                    const callbackSpy = spy<(eventType: string, filename: string) => void>();

                    fs.watch(vpath.combine(root, "dir"), callbackSpy.proxy);
                    fs.rmdirSync(vpath.combine(root, "dir/subdir"));

                    callbackSpy.verify(_ => _("rename", "subdir"), Times.once());
                    callbackSpy.verify(_ => _(Arg.any(), Arg.any()), Times.once());
                });
                it("writeFile() replace file", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "" } } } });
                    const callbackSpy = spy<(eventType: string, filename: string) => void>();

                    fs.watch(vpath.combine(root, "dir/file"), callbackSpy.proxy);
                    fs.writeFileSync("dir/file", "test");

                    callbackSpy.verify(_ => _("change", "file"), Times.once());
                    callbackSpy.verify(_ => _(Arg.any(), Arg.any()), Times.once());
                });
                it("unlink() file (single link)", () => {
                    const fs = new FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "" } } } });
                    const callbackSpy = spy<(eventType: string, filename: string) => void>();

                    fs.watch(vpath.combine(root, "dir/file"), callbackSpy.proxy);
                    fs.unlinkSync(vpath.combine(root, "dir/file"));

                    callbackSpy.verify(_ => _("rename", "file"), Times.once());
                    callbackSpy.verify(_ => _(Arg.any(), Arg.any()), Times.once());
                });
            });
        });
    }

    describeFileSystem("posix", /*ignoreCase*/ false, /*root*/ "/");
    describeFileSystem("win32", /*ignoreCase*/ true, /*root*/ "c:/");
});