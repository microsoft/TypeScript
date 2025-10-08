import * as ts from "../_namespaces/ts.js";

describe("unittests:: core paths", () => {
    it("normalizeSlashes", () => {
        assert.strictEqual(ts.normalizeSlashes("a"), "a");
        assert.strictEqual(ts.normalizeSlashes("a/b"), "a/b");
        assert.strictEqual(ts.normalizeSlashes("a\\b"), "a/b");
        assert.strictEqual(ts.normalizeSlashes("\\\\server\\path"), "//server/path");
    });
    it("getRootLength", () => {
        assert.strictEqual(ts.getRootLength("a"), 0);
        assert.strictEqual(ts.getRootLength("/"), 1);
        assert.strictEqual(ts.getRootLength("/path"), 1);
        assert.strictEqual(ts.getRootLength("c:"), 2);
        assert.strictEqual(ts.getRootLength("c:d"), 0);
        assert.strictEqual(ts.getRootLength("c:/"), 3);
        assert.strictEqual(ts.getRootLength("c:\\"), 3);
        assert.strictEqual(ts.getRootLength("//server"), 8);
        assert.strictEqual(ts.getRootLength("//server/share"), 9);
        assert.strictEqual(ts.getRootLength("\\\\server"), 8);
        assert.strictEqual(ts.getRootLength("\\\\server\\share"), 9);
        assert.strictEqual(ts.getRootLength("file:///"), 8);
        assert.strictEqual(ts.getRootLength("file:///path"), 8);
        assert.strictEqual(ts.getRootLength("file:///c:"), 10);
        assert.strictEqual(ts.getRootLength("file:///c:d"), 8);
        assert.strictEqual(ts.getRootLength("file:///c:/path"), 11);
        assert.strictEqual(ts.getRootLength("file:///c%3a"), 12);
        assert.strictEqual(ts.getRootLength("file:///c%3ad"), 8);
        assert.strictEqual(ts.getRootLength("file:///c%3a/path"), 13);
        assert.strictEqual(ts.getRootLength("file:///c%3A"), 12);
        assert.strictEqual(ts.getRootLength("file:///c%3Ad"), 8);
        assert.strictEqual(ts.getRootLength("file:///c%3A/path"), 13);
        assert.strictEqual(ts.getRootLength("file://localhost"), 16);
        assert.strictEqual(ts.getRootLength("file://localhost/"), 17);
        assert.strictEqual(ts.getRootLength("file://localhost/path"), 17);
        assert.strictEqual(ts.getRootLength("file://localhost/c:"), 19);
        assert.strictEqual(ts.getRootLength("file://localhost/c:d"), 17);
        assert.strictEqual(ts.getRootLength("file://localhost/c:/path"), 20);
        assert.strictEqual(ts.getRootLength("file://localhost/c%3a"), 21);
        assert.strictEqual(ts.getRootLength("file://localhost/c%3ad"), 17);
        assert.strictEqual(ts.getRootLength("file://localhost/c%3a/path"), 22);
        assert.strictEqual(ts.getRootLength("file://localhost/c%3A"), 21);
        assert.strictEqual(ts.getRootLength("file://localhost/c%3Ad"), 17);
        assert.strictEqual(ts.getRootLength("file://localhost/c%3A/path"), 22);
        assert.strictEqual(ts.getRootLength("file://server"), 13);
        assert.strictEqual(ts.getRootLength("file://server/"), 14);
        assert.strictEqual(ts.getRootLength("file://server/path"), 14);
        assert.strictEqual(ts.getRootLength("file://server/c:"), 14);
        assert.strictEqual(ts.getRootLength("file://server/c:d"), 14);
        assert.strictEqual(ts.getRootLength("file://server/c:/d"), 14);
        assert.strictEqual(ts.getRootLength("file://server/c%3a"), 14);
        assert.strictEqual(ts.getRootLength("file://server/c%3ad"), 14);
        assert.strictEqual(ts.getRootLength("file://server/c%3a/d"), 14);
        assert.strictEqual(ts.getRootLength("file://server/c%3A"), 14);
        assert.strictEqual(ts.getRootLength("file://server/c%3Ad"), 14);
        assert.strictEqual(ts.getRootLength("file://server/c%3A/d"), 14);
        assert.strictEqual(ts.getRootLength("http://server"), 13);
        assert.strictEqual(ts.getRootLength("http://server/path"), 14);
    });
    it("isUrl", () => {
        assert.isFalse(ts.isUrl("a"));
        assert.isFalse(ts.isUrl("/"));
        assert.isFalse(ts.isUrl("c:"));
        assert.isFalse(ts.isUrl("c:d"));
        assert.isFalse(ts.isUrl("c:/"));
        assert.isFalse(ts.isUrl("c:\\"));
        assert.isFalse(ts.isUrl("//server"));
        assert.isFalse(ts.isUrl("//server/share"));
        assert.isFalse(ts.isUrl("\\\\server"));
        assert.isFalse(ts.isUrl("\\\\server\\share"));
        assert.isTrue(ts.isUrl("file:///path"));
        assert.isTrue(ts.isUrl("file:///c:"));
        assert.isTrue(ts.isUrl("file:///c:d"));
        assert.isTrue(ts.isUrl("file:///c:/path"));
        assert.isTrue(ts.isUrl("file://server"));
        assert.isTrue(ts.isUrl("file://server/path"));
        assert.isTrue(ts.isUrl("http://server"));
        assert.isTrue(ts.isUrl("http://server/path"));
    });
    it("isRootedDiskPath", () => {
        assert.isFalse(ts.isRootedDiskPath("a"));
        assert.isTrue(ts.isRootedDiskPath("/"));
        assert.isTrue(ts.isRootedDiskPath("c:"));
        assert.isFalse(ts.isRootedDiskPath("c:d"));
        assert.isTrue(ts.isRootedDiskPath("c:/"));
        assert.isTrue(ts.isRootedDiskPath("c:\\"));
        assert.isTrue(ts.isRootedDiskPath("//server"));
        assert.isTrue(ts.isRootedDiskPath("//server/share"));
        assert.isTrue(ts.isRootedDiskPath("\\\\server"));
        assert.isTrue(ts.isRootedDiskPath("\\\\server\\share"));
        assert.isFalse(ts.isRootedDiskPath("file:///path"));
        assert.isFalse(ts.isRootedDiskPath("file:///c:"));
        assert.isFalse(ts.isRootedDiskPath("file:///c:d"));
        assert.isFalse(ts.isRootedDiskPath("file:///c:/path"));
        assert.isFalse(ts.isRootedDiskPath("file://server"));
        assert.isFalse(ts.isRootedDiskPath("file://server/path"));
        assert.isFalse(ts.isRootedDiskPath("http://server"));
        assert.isFalse(ts.isRootedDiskPath("http://server/path"));
    });
    it("getDirectoryPath", () => {
        assert.strictEqual(ts.getDirectoryPath(""), "");
        assert.strictEqual(ts.getDirectoryPath("a"), "");
        assert.strictEqual(ts.getDirectoryPath("a/b"), "a");
        assert.strictEqual(ts.getDirectoryPath("/"), "/");
        assert.strictEqual(ts.getDirectoryPath("/a"), "/");
        assert.strictEqual(ts.getDirectoryPath("/a/"), "/");
        assert.strictEqual(ts.getDirectoryPath("/a/b"), "/a");
        assert.strictEqual(ts.getDirectoryPath("/a/b/"), "/a");
        assert.strictEqual(ts.getDirectoryPath("c:"), "c:");
        assert.strictEqual(ts.getDirectoryPath("c:d"), "");
        assert.strictEqual(ts.getDirectoryPath("c:/"), "c:/");
        assert.strictEqual(ts.getDirectoryPath("c:/path"), "c:/");
        assert.strictEqual(ts.getDirectoryPath("c:/path/"), "c:/");
        assert.strictEqual(ts.getDirectoryPath("//server"), "//server");
        assert.strictEqual(ts.getDirectoryPath("//server/"), "//server/");
        assert.strictEqual(ts.getDirectoryPath("//server/share"), "//server/");
        assert.strictEqual(ts.getDirectoryPath("//server/share/"), "//server/");
        assert.strictEqual(ts.getDirectoryPath("\\\\server"), "//server");
        assert.strictEqual(ts.getDirectoryPath("\\\\server\\"), "//server/");
        assert.strictEqual(ts.getDirectoryPath("\\\\server\\share"), "//server/");
        assert.strictEqual(ts.getDirectoryPath("\\\\server\\share\\"), "//server/");
        assert.strictEqual(ts.getDirectoryPath("file:///"), "file:///");
        assert.strictEqual(ts.getDirectoryPath("file:///path"), "file:///");
        assert.strictEqual(ts.getDirectoryPath("file:///path/"), "file:///");
        assert.strictEqual(ts.getDirectoryPath("file:///c:"), "file:///c:");
        assert.strictEqual(ts.getDirectoryPath("file:///c:d"), "file:///");
        assert.strictEqual(ts.getDirectoryPath("file:///c:/"), "file:///c:/");
        assert.strictEqual(ts.getDirectoryPath("file:///c:/path"), "file:///c:/");
        assert.strictEqual(ts.getDirectoryPath("file:///c:/path/"), "file:///c:/");
        assert.strictEqual(ts.getDirectoryPath("file://server"), "file://server");
        assert.strictEqual(ts.getDirectoryPath("file://server/"), "file://server/");
        assert.strictEqual(ts.getDirectoryPath("file://server/path"), "file://server/");
        assert.strictEqual(ts.getDirectoryPath("file://server/path/"), "file://server/");
        assert.strictEqual(ts.getDirectoryPath("http://server"), "http://server");
        assert.strictEqual(ts.getDirectoryPath("http://server/"), "http://server/");
        assert.strictEqual(ts.getDirectoryPath("http://server/path"), "http://server/");
        assert.strictEqual(ts.getDirectoryPath("http://server/path/"), "http://server/");
    });
    it("getBaseFileName", () => {
        assert.strictEqual(ts.getBaseFileName(""), "");
        assert.strictEqual(ts.getBaseFileName("a"), "a");
        assert.strictEqual(ts.getBaseFileName("a/"), "a");
        assert.strictEqual(ts.getBaseFileName("/"), "");
        assert.strictEqual(ts.getBaseFileName("/a"), "a");
        assert.strictEqual(ts.getBaseFileName("/a/"), "a");
        assert.strictEqual(ts.getBaseFileName("/a/b"), "b");
        assert.strictEqual(ts.getBaseFileName("c:"), "");
        assert.strictEqual(ts.getBaseFileName("c:d"), "c:d");
        assert.strictEqual(ts.getBaseFileName("c:/"), "");
        assert.strictEqual(ts.getBaseFileName("c:\\"), "");
        assert.strictEqual(ts.getBaseFileName("c:/path"), "path");
        assert.strictEqual(ts.getBaseFileName("c:/path/"), "path");
        assert.strictEqual(ts.getBaseFileName("//server"), "");
        assert.strictEqual(ts.getBaseFileName("//server/"), "");
        assert.strictEqual(ts.getBaseFileName("//server/share"), "share");
        assert.strictEqual(ts.getBaseFileName("//server/share/"), "share");
        assert.strictEqual(ts.getBaseFileName("file:///"), "");
        assert.strictEqual(ts.getBaseFileName("file:///path"), "path");
        assert.strictEqual(ts.getBaseFileName("file:///path/"), "path");
        assert.strictEqual(ts.getBaseFileName("file:///c:"), "");
        assert.strictEqual(ts.getBaseFileName("file:///c:/"), "");
        assert.strictEqual(ts.getBaseFileName("file:///c:d"), "c:d");
        assert.strictEqual(ts.getBaseFileName("file:///c:/d"), "d");
        assert.strictEqual(ts.getBaseFileName("file:///c:/d/"), "d");
        assert.strictEqual(ts.getBaseFileName("http://server"), "");
        assert.strictEqual(ts.getBaseFileName("http://server/"), "");
        assert.strictEqual(ts.getBaseFileName("http://server/a"), "a");
        assert.strictEqual(ts.getBaseFileName("http://server/a/"), "a");
        assert.strictEqual(ts.getBaseFileName("/path/a.ext", ".ext", /*ignoreCase*/ false), "a");
        assert.strictEqual(ts.getBaseFileName("/path/a.ext", ".EXT", /*ignoreCase*/ true), "a");
        assert.strictEqual(ts.getBaseFileName("/path/a.ext", "ext", /*ignoreCase*/ false), "a");
        assert.strictEqual(ts.getBaseFileName("/path/a.b", ".ext", /*ignoreCase*/ false), "a.b");
        assert.strictEqual(ts.getBaseFileName("/path/a.b", [".b", ".c"], /*ignoreCase*/ false), "a");
        assert.strictEqual(ts.getBaseFileName("/path/a.c", [".b", ".c"], /*ignoreCase*/ false), "a");
        assert.strictEqual(ts.getBaseFileName("/path/a.d", [".b", ".c"], /*ignoreCase*/ false), "a.d");
    });
    it("getAnyExtensionFromPath", () => {
        assert.strictEqual(ts.getAnyExtensionFromPath(""), "");
        assert.strictEqual(ts.getAnyExtensionFromPath(".ext"), ".ext");
        assert.strictEqual(ts.getAnyExtensionFromPath("a.ext"), ".ext");
        assert.strictEqual(ts.getAnyExtensionFromPath("/a.ext"), ".ext");
        assert.strictEqual(ts.getAnyExtensionFromPath("a.ext/"), ".ext");
        assert.strictEqual(ts.getAnyExtensionFromPath("a.ext", ".ext", /*ignoreCase*/ false), ".ext");
        assert.strictEqual(ts.getAnyExtensionFromPath("a.ext", ".EXT", /*ignoreCase*/ true), ".ext");
        assert.strictEqual(ts.getAnyExtensionFromPath("a.ext", "ext", /*ignoreCase*/ false), ".ext");
        assert.strictEqual(ts.getAnyExtensionFromPath("a.b", ".ext", /*ignoreCase*/ false), "");
        assert.strictEqual(ts.getAnyExtensionFromPath("a.b", [".b", ".c"], /*ignoreCase*/ false), ".b");
        assert.strictEqual(ts.getAnyExtensionFromPath("a.c", [".b", ".c"], /*ignoreCase*/ false), ".c");
        assert.strictEqual(ts.getAnyExtensionFromPath("a.d", [".b", ".c"], /*ignoreCase*/ false), "");
    });
    it("getPathComponents", () => {
        assert.deepEqual(ts.getPathComponents(""), [""]);
        assert.deepEqual(ts.getPathComponents("a"), ["", "a"]);
        assert.deepEqual(ts.getPathComponents("./a"), ["", ".", "a"]);
        assert.deepEqual(ts.getPathComponents("/"), ["/"]);
        assert.deepEqual(ts.getPathComponents("/a"), ["/", "a"]);
        assert.deepEqual(ts.getPathComponents("/a/"), ["/", "a"]);
        assert.deepEqual(ts.getPathComponents("c:"), ["c:"]);
        assert.deepEqual(ts.getPathComponents("c:d"), ["", "c:d"]);
        assert.deepEqual(ts.getPathComponents("c:/"), ["c:/"]);
        assert.deepEqual(ts.getPathComponents("c:/path"), ["c:/", "path"]);
        assert.deepEqual(ts.getPathComponents("//server"), ["//server"]);
        assert.deepEqual(ts.getPathComponents("//server/"), ["//server/"]);
        assert.deepEqual(ts.getPathComponents("//server/share"), ["//server/", "share"]);
        assert.deepEqual(ts.getPathComponents("file:///"), ["file:///"]);
        assert.deepEqual(ts.getPathComponents("file:///path"), ["file:///", "path"]);
        assert.deepEqual(ts.getPathComponents("file:///c:"), ["file:///c:"]);
        assert.deepEqual(ts.getPathComponents("file:///c:d"), ["file:///", "c:d"]);
        assert.deepEqual(ts.getPathComponents("file:///c:/"), ["file:///c:/"]);
        assert.deepEqual(ts.getPathComponents("file:///c:/path"), ["file:///c:/", "path"]);
        assert.deepEqual(ts.getPathComponents("file://server"), ["file://server"]);
        assert.deepEqual(ts.getPathComponents("file://server/"), ["file://server/"]);
        assert.deepEqual(ts.getPathComponents("file://server/path"), ["file://server/", "path"]);
        assert.deepEqual(ts.getPathComponents("http://server"), ["http://server"]);
        assert.deepEqual(ts.getPathComponents("http://server/"), ["http://server/"]);
        assert.deepEqual(ts.getPathComponents("http://server/path"), ["http://server/", "path"]);
    });
    it("reducePathComponents", () => {
        assert.deepEqual(ts.reducePathComponents([]), []);
        assert.deepEqual(ts.reducePathComponents([""]), [""]);
        assert.deepEqual(ts.reducePathComponents(["", "."]), [""]);
        assert.deepEqual(ts.reducePathComponents(["", ".", "a"]), ["", "a"]);
        assert.deepEqual(ts.reducePathComponents(["", "a", "."]), ["", "a"]);
        assert.deepEqual(ts.reducePathComponents(["", ".."]), ["", ".."]);
        assert.deepEqual(ts.reducePathComponents(["", "..", ".."]), ["", "..", ".."]);
        assert.deepEqual(ts.reducePathComponents(["", "..", ".", ".."]), ["", "..", ".."]);
        assert.deepEqual(ts.reducePathComponents(["", "a", ".."]), [""]);
        assert.deepEqual(ts.reducePathComponents(["", "..", "a"]), ["", "..", "a"]);
        assert.deepEqual(ts.reducePathComponents(["/"]), ["/"]);
        assert.deepEqual(ts.reducePathComponents(["/", "."]), ["/"]);
        assert.deepEqual(ts.reducePathComponents(["/", ".."]), ["/"]);
        assert.deepEqual(ts.reducePathComponents(["/", "a", ".."]), ["/"]);
    });
    it("combinePaths", () => {
        assert.strictEqual(ts.combinePaths("/", "/node_modules/@types"), "/node_modules/@types");
        assert.strictEqual(ts.combinePaths("/a/..", ""), "/a/..");
        assert.strictEqual(ts.combinePaths("/a/..", "b"), "/a/../b");
        assert.strictEqual(ts.combinePaths("/a/..", "b/"), "/a/../b/");
        assert.strictEqual(ts.combinePaths("/a/..", "/"), "/");
        assert.strictEqual(ts.combinePaths("/a/..", "/b"), "/b");
    });
    it("resolvePath", () => {
        assert.strictEqual(ts.resolvePath(""), "");
        assert.strictEqual(ts.resolvePath("."), "");
        assert.strictEqual(ts.resolvePath("./"), "");
        assert.strictEqual(ts.resolvePath(".."), "..");
        assert.strictEqual(ts.resolvePath("../"), "../");
        assert.strictEqual(ts.resolvePath("/"), "/");
        assert.strictEqual(ts.resolvePath("/."), "/");
        assert.strictEqual(ts.resolvePath("/./"), "/");
        assert.strictEqual(ts.resolvePath("/../"), "/");
        assert.strictEqual(ts.resolvePath("/a"), "/a");
        assert.strictEqual(ts.resolvePath("/a/"), "/a/");
        assert.strictEqual(ts.resolvePath("/a/."), "/a");
        assert.strictEqual(ts.resolvePath("/a/./"), "/a/");
        assert.strictEqual(ts.resolvePath("/a/./b"), "/a/b");
        assert.strictEqual(ts.resolvePath("/a/./b/"), "/a/b/");
        assert.strictEqual(ts.resolvePath("/a/.."), "/");
        assert.strictEqual(ts.resolvePath("/a/../"), "/");
        assert.strictEqual(ts.resolvePath("/a/../b"), "/b");
        assert.strictEqual(ts.resolvePath("/a/../b/"), "/b/");
        assert.strictEqual(ts.resolvePath("/a/..", "b"), "/b");
        assert.strictEqual(ts.resolvePath("/a/..", "/"), "/");
        assert.strictEqual(ts.resolvePath("/a/..", "b/"), "/b/");
        assert.strictEqual(ts.resolvePath("/a/..", "/b"), "/b");
        assert.strictEqual(ts.resolvePath("/a/.", "b"), "/a/b");
        assert.strictEqual(ts.resolvePath("/a/.", "."), "/a");
        assert.strictEqual(ts.resolvePath("a", "b", "c"), "a/b/c");
        assert.strictEqual(ts.resolvePath("a", "b", "/c"), "/c");
        assert.strictEqual(ts.resolvePath("a", "b", "../c"), "a/c");
    });
    it("getNormalizedAbsolutePath", () => {
        assert.strictEqual(ts.getNormalizedAbsolutePath("/", ""), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/.", ""), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/./", ""), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/../", ""), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a", ""), "/a");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/", ""), "/a");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/.", ""), "/a");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/foo.", ""), "/a/foo.");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/./", ""), "/a");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/./b", ""), "/a/b");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/./b/", ""), "/a/b");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/..", ""), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/../", ""), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/../", ""), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/../b", ""), "/b");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/../b/", ""), "/b");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/..", ""), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/..", "/"), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/..", "b/"), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/..", "/b"), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/.", "b"), "/a");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/.", "."), "/a");

        // Tests as above, but with backslashes.
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\", ""), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\.", ""), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\.\\", ""), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\..\\", ""), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\a\\.\\", ""), "/a");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\a\\.\\b", ""), "/a/b");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\a\\.\\b\\", ""), "/a/b");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\a\\..", ""), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\a\\..\\", ""), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\a\\..\\", ""), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\a\\..\\b", ""), "/b");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\a\\..\\b\\", ""), "/b");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\a\\..", ""), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\a\\..", "\\"), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\a\\..", "b\\"), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\a\\..", "\\b"), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\a\\.", "b"), "/a");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\a\\.", "."), "/a");

        // Relative paths on an empty currentDirectory.
        assert.strictEqual(ts.getNormalizedAbsolutePath("", ""), "");
        assert.strictEqual(ts.getNormalizedAbsolutePath(".", ""), "");
        assert.strictEqual(ts.getNormalizedAbsolutePath("./", ""), "");
        assert.strictEqual(ts.getNormalizedAbsolutePath("./a", ""), "a");
        // Strangely, these do not normalize to the empty string.
        assert.strictEqual(ts.getNormalizedAbsolutePath("..", ""), "..");
        assert.strictEqual(ts.getNormalizedAbsolutePath("../", ""), "..");
        assert.strictEqual(ts.getNormalizedAbsolutePath("../..", ""), "../..");
        assert.strictEqual(ts.getNormalizedAbsolutePath("../../", ""), "../..");
        assert.strictEqual(ts.getNormalizedAbsolutePath("./..", ""), "..");
        assert.strictEqual(ts.getNormalizedAbsolutePath("../../a/..", ""), "../..");

        // More .. segments
        assert.strictEqual(ts.getNormalizedAbsolutePath("src/ts/foo/../../../bar/bar.ts", ""), "bar/bar.ts");
        assert.strictEqual(ts.getNormalizedAbsolutePath("src/ts/foo/../../..", ""), "");
        // not a real URL root!
        assert.strictEqual(ts.getNormalizedAbsolutePath("file:/Users/matb/projects/san/../../../../../../typings/@epic/Core.d.ts", ""), "../typings/@epic/Core.d.ts");
        // the root is `file://Users/`
        assert.strictEqual(ts.getNormalizedAbsolutePath("file://Users/matb/projects/san/../../../../../../typings/@epic/Core.d.ts", ""), "file://Users/typings/@epic/Core.d.ts");
        // this is real
        assert.strictEqual(ts.getNormalizedAbsolutePath("file:///Users/matb/projects/san/../../../../../../typings/@epic/Core.d.ts", ""), "file:///typings/@epic/Core.d.ts");

        // Interaction between relative paths and currentDirectory.
        assert.strictEqual(ts.getNormalizedAbsolutePath("", "/home"), "/home");
        assert.strictEqual(ts.getNormalizedAbsolutePath(".", "/home"), "/home");
        assert.strictEqual(ts.getNormalizedAbsolutePath("./", "/home"), "/home");
        assert.strictEqual(ts.getNormalizedAbsolutePath("..", "/home"), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("../", "/home"), "/");
        assert.strictEqual(ts.getNormalizedAbsolutePath("a", "b"), "b/a");
        assert.strictEqual(ts.getNormalizedAbsolutePath("a", "b/c"), "b/c/a");

        // Base names starting or ending with a dot do not affect normalization.
        assert.strictEqual(ts.getNormalizedAbsolutePath(".a", ""), ".a");
        assert.strictEqual(ts.getNormalizedAbsolutePath("..a", ""), "..a");
        assert.strictEqual(ts.getNormalizedAbsolutePath("a.", ""), "a.");
        assert.strictEqual(ts.getNormalizedAbsolutePath("a..", ""), "a..");

        assert.strictEqual(ts.getNormalizedAbsolutePath("/base/./.a", ""), "/base/.a");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/base/../.a", ""), "/.a");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/base/./..a", ""), "/base/..a");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/base/../..a", ""), "/..a");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/base/./..a/b", ""), "/base/..a/b");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/base/../..a/b", ""), "/..a/b");

        assert.strictEqual(ts.getNormalizedAbsolutePath("/base/./a.", ""), "/base/a.");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/base/../a.", ""), "/a.");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/base/./a..", ""), "/base/a..");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/base/../a..", ""), "/a..");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/base/./a../b", ""), "/base/a../b");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/base/../a../b", ""), "/a../b");

        // Consecutive intermediate slashes are normalized to a single slash.
        assert.strictEqual(ts.getNormalizedAbsolutePath("a//b", ""), "a/b");
        assert.strictEqual(ts.getNormalizedAbsolutePath("a///b", ""), "a/b");
        assert.strictEqual(ts.getNormalizedAbsolutePath("a/b//c", ""), "a/b/c");
        assert.strictEqual(ts.getNormalizedAbsolutePath("/a/b//c", ""), "/a/b/c");
        assert.strictEqual(ts.getNormalizedAbsolutePath("//a/b//c", ""), "//a/b/c");

        // Backslashes are converted to slashes,
        // and then consecutive intermediate slashes are normalized to a single slash
        assert.strictEqual(ts.getNormalizedAbsolutePath("a\\\\b", ""), "a/b");
        assert.strictEqual(ts.getNormalizedAbsolutePath("a\\\\\\b", ""), "a/b");
        assert.strictEqual(ts.getNormalizedAbsolutePath("a\\b\\\\c", ""), "a/b/c");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\a\\b\\\\c", ""), "/a/b/c");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\\\a\\b\\\\c", ""), "//a/b/c");

        // The same occurs for mixed slashes.
        assert.strictEqual(ts.getNormalizedAbsolutePath("a/\\b", ""), "a/b");
        assert.strictEqual(ts.getNormalizedAbsolutePath("a\\/b", ""), "a/b");
        assert.strictEqual(ts.getNormalizedAbsolutePath("a\\/\\b", ""), "a/b");
        assert.strictEqual(ts.getNormalizedAbsolutePath("a\\b//c", ""), "a/b/c");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\a\\b\\\\c", ""), "/a/b/c");
        assert.strictEqual(ts.getNormalizedAbsolutePath("\\\\a\\b\\\\c", ""), "//a/b/c");
    });
    it("getPathRelativeTo", () => {
        assert.strictEqual(ts.getRelativePathFromDirectory("/", "/", /*ignoreCase*/ false), "");
        assert.strictEqual(ts.getRelativePathFromDirectory("/a", "/a", /*ignoreCase*/ false), "");
        assert.strictEqual(ts.getRelativePathFromDirectory("/a/", "/a", /*ignoreCase*/ false), "");
        assert.strictEqual(ts.getRelativePathFromDirectory("/a", "/", /*ignoreCase*/ false), "..");
        assert.strictEqual(ts.getRelativePathFromDirectory("/a", "/b", /*ignoreCase*/ false), "../b");
        assert.strictEqual(ts.getRelativePathFromDirectory("/a/b", "/b", /*ignoreCase*/ false), "../../b");
        assert.strictEqual(ts.getRelativePathFromDirectory("/a/b/c", "/b", /*ignoreCase*/ false), "../../../b");
        assert.strictEqual(ts.getRelativePathFromDirectory("/a/b/c", "/b/c", /*ignoreCase*/ false), "../../../b/c");
        assert.strictEqual(ts.getRelativePathFromDirectory("/a/b/c", "/a/b", /*ignoreCase*/ false), "..");
        assert.strictEqual(ts.getRelativePathFromDirectory("c:", "d:", /*ignoreCase*/ false), "d:/");
        assert.strictEqual(ts.getRelativePathFromDirectory("file:///", "file:///", /*ignoreCase*/ false), "");
        assert.strictEqual(ts.getRelativePathFromDirectory("file:///a", "file:///a", /*ignoreCase*/ false), "");
        assert.strictEqual(ts.getRelativePathFromDirectory("file:///a/", "file:///a", /*ignoreCase*/ false), "");
        assert.strictEqual(ts.getRelativePathFromDirectory("file:///a", "file:///", /*ignoreCase*/ false), "..");
        assert.strictEqual(ts.getRelativePathFromDirectory("file:///a", "file:///b", /*ignoreCase*/ false), "../b");
        assert.strictEqual(ts.getRelativePathFromDirectory("file:///a/b", "file:///b", /*ignoreCase*/ false), "../../b");
        assert.strictEqual(ts.getRelativePathFromDirectory("file:///a/b/c", "file:///b", /*ignoreCase*/ false), "../../../b");
        assert.strictEqual(ts.getRelativePathFromDirectory("file:///a/b/c", "file:///b/c", /*ignoreCase*/ false), "../../../b/c");
        assert.strictEqual(ts.getRelativePathFromDirectory("file:///a/b/c", "file:///a/b", /*ignoreCase*/ false), "..");
        assert.strictEqual(ts.getRelativePathFromDirectory("file:///c:", "file:///d:", /*ignoreCase*/ false), "file:///d:/");
    });
    it("toFileNameLowerCase", () => {
        assert.strictEqual(
            ts.toFileNameLowerCase("/user/UserName/projects/Project/file.ts"),
            "/user/username/projects/project/file.ts",
        );
        assert.strictEqual(
            ts.toFileNameLowerCase("/user/UserName/projects/projectß/file.ts"),
            "/user/username/projects/projectß/file.ts",
        );
        assert.strictEqual(
            ts.toFileNameLowerCase("/user/UserName/projects/İproject/file.ts"),
            "/user/username/projects/İproject/file.ts",
        );
        assert.strictEqual(
            ts.toFileNameLowerCase("/user/UserName/projects/ı/file.ts"),
            "/user/username/projects/ı/file.ts",
        );
    });
});
