// tslint:disable:object-literal-key-quotes
describe("vfs", () => {
    function describeFileSystem(title: string, ignoreCase: boolean, root: string) {
        describe(title, () => {
            describe("statSync", () => {
                it("ok (file)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.time(1);
                    const stats = fs.statSync("file");
                    assert.isTrue(stats.isFile());
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 7);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 0);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (file, hardlink)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.time(1);
                    fs.linkSync("file", "link");
                    const stats = fs.statSync("link");
                    assert.isTrue(stats.isFile());
                    assert.strictEqual(stats.nlink, 2);
                    assert.strictEqual(stats.size, 7);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 1);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (file, symlink)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.time(1);
                    fs.symlinkSync("file", "symlink");
                    const stats = fs.statSync("symlink");
                    assert.isTrue(stats.isFile());
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 7);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 0);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (directory)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { time: 0, files: { [root]: { "dir": {} } } });
                    fs.time(1);
                    const stats = fs.statSync("dir");
                    assert.isTrue(stats.isDirectory());
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 0);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 0);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (directory, symlink)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { time: 0, files: { [root]: { "dir": {} } } });
                    fs.time(1);
                    fs.symlinkSync("dir", "symlink");
                    const stats = fs.statSync("symlink");
                    assert.isTrue(stats.isDirectory());
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 0);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 0);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });
            });

            describe("lstatSync", () => {
                it("ok (file)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.time(1);
                    const stats = fs.lstatSync("file");
                    assert.isTrue(stats.isFile());
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 7);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 0);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (file, hardlink)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.time(1);
                    fs.linkSync("file", "link");
                    const stats = fs.lstatSync("link");
                    assert.isTrue(stats.isFile());
                    assert.strictEqual(stats.nlink, 2);
                    assert.strictEqual(stats.size, 7);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 1);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (file, symlink)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { time: 0, files: { [root]: { "file": "testing" } } });
                    fs.time(1);
                    fs.symlinkSync("file", "symlink");
                    const stats = fs.lstatSync("symlink");
                    assert.isTrue(stats.isSymbolicLink());
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 4);
                    assert.strictEqual(stats.atimeMs, 1);
                    assert.strictEqual(stats.mtimeMs, 1);
                    assert.strictEqual(stats.ctimeMs, 1);
                    assert.strictEqual(stats.birthtimeMs, 1);
                });

                it("ok (directory)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { time: 0, files: { [root]: { "dir": {} } } });
                    fs.time(1);
                    const stats = fs.lstatSync("dir");
                    assert.isTrue(stats.isDirectory());
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 0);
                    assert.strictEqual(stats.atimeMs, 0);
                    assert.strictEqual(stats.mtimeMs, 0);
                    assert.strictEqual(stats.ctimeMs, 0);
                    assert.strictEqual(stats.birthtimeMs, 0);
                });

                it("ok (directory, symlink)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { time: 0, files: { [root]: { "dir": {} } } });
                    fs.time(1);
                    fs.symlinkSync("dir", "symlink");
                    const stats = fs.lstatSync("symlink");
                    assert.isTrue(stats.isSymbolicLink());
                    assert.strictEqual(stats.nlink, 1);
                    assert.strictEqual(stats.size, 3);
                    assert.strictEqual(stats.atimeMs, 1);
                    assert.strictEqual(stats.mtimeMs, 1);
                    assert.strictEqual(stats.ctimeMs, 1);
                    assert.strictEqual(stats.birthtimeMs, 1);
                });
            });

            describe("readdirSync", () => {
                it("ok", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "a": {} } } });
                    const actual = fs.readdirSync(root);
                    assert.deepEqual(actual, ["a"]);
                });
            });

            describe("mkdirSync", () => {
                it("ok", () => {
                    const path = vpath.combine(root, "a");
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: {} } });
                    fs.mkdirSync(path);
                    assert.isTrue(fs.statSync(path).isDirectory());
                });
            });

            describe("rmdirSync", () => {
                it("ok", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "a": {} } } });
                    fs.rmdirSync(vpath.combine(root, "a"));
                    const actual = fs.readdirSync(root);
                    assert.deepEqual(actual.length, 0);
                });
            });

            describe("linkSync", () => {
                it("ok", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.linkSync("file", "link");
                    const stats1 = fs.statSync("file");
                    const stats2 = fs.statSync("link");
                    assert.deepEqual(stats2, stats1);
                    assert.strictEqual(stats1.nlink, 2);
                });
            });

            describe("unlinkSync", () => {
                it("ok (nlink = 1)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.unlinkSync("file");
                    assert.throws(() => fs.statSync("file"), /ENOENT/);
                });

                it("ok (nlink > 1)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.linkSync("file", "link");
                    fs.unlinkSync("file");
                    assert.throws(() => fs.statSync("file"), /ENOENT/);
                    const stats = fs.statSync("link");
                    assert.strictEqual(stats.nlink, 1);
                });
            });

            describe("renameSync", () => {
                it("ok", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    const stats1 = fs.statSync("file");
                    fs.renameSync("file", "renamed");
                    assert.throws(() => fs.statSync("file"), /ENOENT/);
                    const stats2 = fs.statSync("renamed");
                    assert.strictEqual(stats2.ino, stats1.ino);
                });
            });

            describe("symlinkSync", () => {
                it("ok (absolute target)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync(vpath.combine(root, "file"), "symlink");
                    assert.strictEqual(fs.readFileSync("symlink", "utf8"), "test");
                });

                it("ok (relative target)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync("file", "symlink");
                    assert.strictEqual(fs.readFileSync("symlink", "utf8"), "test");
                });

                it("ok (indirect target)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync("file", "symlink1");
                    fs.symlinkSync("symlink1", "symlink2");
                    assert.strictEqual(fs.readFileSync("symlink2", "utf8"), "test");
                });
            });

            describe("realpathSync", () => {
                it("ok (absolute target)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync(vpath.combine(root, "file"), "symlink");
                    assert.strictEqual(fs.realpathSync("symlink"), vpath.combine(root, "file"));
                });

                it("ok (relative target)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync("file", "symlink");
                    assert.strictEqual(fs.realpathSync("symlink"), vpath.combine(root, "file"));
                });

                it("ok (indirect target)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.symlinkSync("file", "symlink1");
                    fs.symlinkSync("symlink1", "symlink2");
                    assert.strictEqual(fs.realpathSync("symlink2"), vpath.combine(root, "file"));
                });
            });

            describe("readFileSync", () => {
                it("ok", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    assert.strictEqual(fs.readFileSync("file", "utf8"), "test");
                });
            });

            describe("writeFileSync", () => {
                it("ok", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "file": "test" } } });
                    fs.writeFileSync("file", "replacement", "utf8");
                    assert.strictEqual(fs.readFileSync("file", "utf8"), "replacement");
                });
            });

            describe("mount", () => {
                it("ok", () => {
                    const other = new vfs.FileSystem(/*ignoreCase*/ false, { files: {
                        "/": {
                            "subdir": {},
                            "file": ""
                        }
                    } });

                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: {} } });
                    fs.mountSync("/", vpath.combine(root, "dir"), other);

                    const names = fs.readdirSync(vpath.combine(root, "dir"));
                    assert.deepEqual(names, ["file", "subdir"]);
                });
            });

            describe("shadow", () => {
                it("ok", () => {
                    const rootFs = new vfs.FileSystem(ignoreCase, { files: { [root]: { } } }).makeReadonly();
                    const shadowFs = rootFs.shadow();
                    assert.strictEqual(shadowFs.shadowRoot, rootFs);
                });

                it("shadow reads from root", () => {
                    const rootFs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "dir": {}, "file": "test" } } }).makeReadonly();
                    const shadowFs = rootFs.shadow();
                    assert.deepEqual(shadowFs.readdirSync(root), ["dir", "file"]);
                    assert.strictEqual(shadowFs.readFileSync("file", "utf8"), "test");
                });

                it("shadow write does not affect root", () => {
                    const rootFs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "dir": {}, "file": "test" } } }).makeReadonly();
                    const shadowFs = rootFs.shadow();
                    shadowFs.writeFileSync("file", "replacement", "utf8");
                    assert.strictEqual(rootFs.readFileSync("file", "utf8"), "test");
                });
            });

            describe("meta", () => {
                it("ok", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    fs.filemeta("file").set("testKey", "testValue");
                    assert.strictEqual(fs.filemeta("file").get("testKey"), "testValue");
                });

                it("shadow inherits from root", () => {
                    const rootFs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    rootFs.filemeta("file").set("testKey", "testValue");
                    rootFs.makeReadonly();
                    const shadowFs = rootFs.shadow();
                    assert.strictEqual(shadowFs.filemeta("file").get("testKey"), "testValue");
                });

                it("shadow inherits from root with mutation", () => {
                    const rootFs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    rootFs.makeReadonly();
                    const shadowFs = rootFs.shadow();
                    rootFs.filemeta("file").set("testKey", "testValue");
                    assert.strictEqual(shadowFs.filemeta("file").get("testKey"), "testValue");
                });

                it("shadow does not mutate root", () => {
                    const rootFs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "file": "" } } });
                    rootFs.filemeta("file").set("testKey", "testValue");
                    rootFs.makeReadonly();
                    const shadowFs = rootFs.shadow();
                    shadowFs.filemeta("file").set("testKey", "newValue");
                    assert.strictEqual(rootFs.filemeta("file").get("testKey"), "testValue");
                });
            });

            describe("watch", () => {
                it("writeFile() new file in directory", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "dir": {} } } });
                    const invocations: [string, string][] = [];
                    const callback = (eventType: string, filename: string) => { invocations.push([eventType, filename]); };

                    fs.watch(vpath.combine(root, "dir"), callback);
                    fs.writeFileSync("dir/file", "test");

                    assert.deepEqual(invocations, [
                        ["rename", "file"],
                        ["change", "file"]
                    ]);
                });
                it("writeFile() replace file in directory", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "" } } } });
                    const invocations: [string, string][] = [];
                    const callback = (eventType: string, filename: string) => { invocations.push([eventType, filename]); };

                    fs.watch(vpath.combine(root, "dir"), callback);
                    fs.writeFileSync("dir/file", "test");

                    assert.deepEqual(invocations, [
                        ["change", "file"]
                    ]);
                });
                it("rename() file in directory", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "test" } } } });
                    const invocations: [string, string][] = [];
                    const callback = (eventType: string, filename: string) => { invocations.push([eventType, filename]); };

                    fs.watch(vpath.combine(root, "dir"), callback);
                    fs.renameSync(vpath.combine(root, "dir/file"), vpath.combine(root, "dir/file1"));

                    assert.deepEqual(invocations, [
                        ["rename", "file"],
                        ["rename", "file1"]
                    ]);
                });
                it("link() new file in directory", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "test" } } } });
                    const invocations: [string, string][] = [];
                    const callback = (eventType: string, filename: string) => { invocations.push([eventType, filename]); };

                    fs.watch(vpath.combine(root, "dir"), callback);
                    fs.linkSync(vpath.combine(root, "dir/file"), vpath.combine(root, "dir/file1"));

                    assert.deepEqual(invocations, [
                        ["rename", "file1"]
                    ]);
                });
                it("symlink() file in directory", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "test" } } } });
                    const invocations: [string, string][] = [];
                    const callback = (eventType: string, filename: string) => { invocations.push([eventType, filename]); };

                    fs.watch(vpath.combine(root, "dir"), callback);
                    fs.symlinkSync(vpath.combine(root, "dir/file"), vpath.combine(root, "dir/file1"));

                    assert.deepEqual(invocations, [
                        ["rename", "file1"]
                    ]);
                });
                it("unlink() file in directory (single link)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "" } } } });
                    const invocations: [string, string][] = [];
                    const callback = (eventType: string, filename: string) => { invocations.push([eventType, filename]); };

                    fs.watch(vpath.combine(root, "dir"), callback);
                    fs.unlinkSync(vpath.combine(root, "dir/file"));

                    assert.deepEqual(invocations, [
                        ["rename", "file"]
                    ]);
                });
                it("unlink() file in directory (multiple links)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "", "file1": new vfs.Link("file") } } } });
                    const invocations: [string, string][] = [];
                    const callback = (eventType: string, filename: string) => { invocations.push([eventType, filename]); };

                    fs.watch(vpath.combine(root, "dir"), callback);
                    fs.unlinkSync(vpath.combine(root, "dir/file"));

                    assert.deepEqual(invocations, [
                        ["rename", "file"]
                    ]);
                });
                it("mkdir() new subdirectory in directory", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "dir": { } } } });
                    const invocations: [string, string][] = [];
                    const callback = (eventType: string, filename: string) => { invocations.push([eventType, filename]); };

                    fs.watch(vpath.combine(root, "dir"), callback);
                    fs.mkdirSync(vpath.combine(root, "dir/subdir"));

                    assert.deepEqual(invocations, [
                        ["rename", "subdir"]
                    ]);
                });
                it("rmdir() subdirectory in directory", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "dir": { "subdir": {} } } } });
                    const invocations: [string, string][] = [];
                    const callback = (eventType: string, filename: string) => { invocations.push([eventType, filename]); };

                    fs.watch(vpath.combine(root, "dir"), callback);
                    fs.rmdirSync(vpath.combine(root, "dir/subdir"));

                    assert.deepEqual(invocations, [
                        ["rename", "subdir"]
                    ]);
                });
                it("writeFile() replace file", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "" } } } });
                    const invocations: [string, string][] = [];
                    const callback = (eventType: string, filename: string) => { invocations.push([eventType, filename]); };

                    fs.watch(vpath.combine(root, "dir/file"), callback);
                    fs.writeFileSync("dir/file", "test");

                    assert.deepEqual(invocations, [
                        ["change", "file"]
                    ]);
                });
                it("unlink() file (single link)", () => {
                    const fs = new vfs.FileSystem(ignoreCase, { files: { [root]: { "dir": { "file": "" } } } });
                    const invocations: [string, string][] = [];
                    const callback = (eventType: string, filename: string) => { invocations.push([eventType, filename]); };

                    fs.watch(vpath.combine(root, "dir/file"), callback);
                    fs.unlinkSync(vpath.combine(root, "dir/file"));

                    assert.deepEqual(invocations, [
                        ["rename", "file"]
                    ]);
                });
            });
        });
    }

    describeFileSystem("posix", /*ignoreCase*/ false, /*root*/ "/");
    describeFileSystem("win32", /*ignoreCase*/ true, /*root*/ "c:/");
});
// tslint:enable:object-literal-key-quotes