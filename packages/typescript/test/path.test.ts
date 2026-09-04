import { createVirtualFileSystem } from "@typescript/typescript/unstable/fs";
import {
    canonicalize,
    CaseSensitivity,
    isCaseInsensitive,
    isCaseSensitive,
    type PathKey,
    pathKey,
    type RootedDirectoryPath,
    rootedDirectoryPathFromPath,
    type RootedFilePath,
    rootedFilePathFromPath,
    type RootedPath,
    toRootedDirectoryPath,
    toRootedFilePath,
    toRootedPath,
    tryPathKeyFromCanonical,
    tryRootedPathFromNormalized,
} from "@typescript/typescript/unstable/path";
import assert from "node:assert";
import { test } from "node:test";
import { parseNodeHandleFromCompiler } from "../src/api/node/node.ts";
import {
    documentURIToFileName,
    fileNameToDocumentURI,
    getRootLength,
} from "../src/api/path.ts";

type IsAssignable<From, To> = [From] extends [To] ? true : false;
type Assert<T extends true> = T;
type AssertFalse<T extends false> = T;

type _RootedFilePathIsRootedPath = Assert<IsAssignable<RootedFilePath, RootedPath>>;
type _RootedDirectoryPathIsRootedPath = Assert<IsAssignable<RootedDirectoryPath, RootedPath>>;
type _RootedPathIsNotRootedFilePath = AssertFalse<IsAssignable<RootedPath, RootedFilePath>>;
type _RootedPathIsNotRootedDirectoryPath = AssertFalse<IsAssignable<RootedPath, RootedDirectoryPath>>;
type _RootedFilePathIsNotRootedDirectoryPath = AssertFalse<IsAssignable<RootedFilePath, RootedDirectoryPath>>;
type _RootedDirectoryPathIsNotRootedFilePath = AssertFalse<IsAssignable<RootedDirectoryPath, RootedFilePath>>;
type _RootedPathIsNotPathKey = AssertFalse<IsAssignable<RootedPath, PathKey>>;
type _PathKeyIsNotRootedPath = AssertFalse<IsAssignable<PathKey, RootedPath>>;
type _PathKeyIsNotRootedFilePath = AssertFalse<IsAssignable<PathKey, RootedFilePath>>;
type _PathKeyIsNotRootedDirectoryPath = AssertFalse<IsAssignable<PathKey, RootedDirectoryPath>>;

test("path keys are constructed from rooted paths", () => {
    const workspace = toRootedDirectoryPath("/workspace", undefined);
    assert.strictEqual(pathKey(toRootedPath("src/file.ts", workspace), CaseSensitivity.Sensitive), "/workspace/src/file.ts");
    assert.strictEqual(pathKey(toRootedPath("SRC/file.ts", workspace), CaseSensitivity.Insensitive), "/workspace/src/file.ts");
    assert.strictEqual(pathKey(toRootedPath("^/untitled/file.ts", undefined), CaseSensitivity.Sensitive), "^/untitled/file.ts");
    assert.throws(() => toRootedPath("src/file.ts", undefined), /Path is not rooted/);
    const upperDynamic = tryRootedPathFromNormalized(documentURIToFileName("custom:~ts-uri~v2~Foo.ts"));
    const lowerDynamic = tryRootedPathFromNormalized(documentURIToFileName("custom:~ts-uri~v2~foo.ts"));
    assert.ok(upperDynamic);
    assert.ok(lowerDynamic);
    assert.notStrictEqual(
        pathKey(upperDynamic, CaseSensitivity.Insensitive),
        pathKey(lowerDynamic, CaseSensitivity.Insensitive),
    );
    const dynamicRoot = "^/~ts-uri-v2~/custom/authority";
    assert.strictEqual(getRootLength(dynamicRoot), dynamicRoot.length);
    assert.strictEqual(
        pathKey(dynamicRoot as RootedPath, CaseSensitivity.Insensitive),
        pathKey((dynamicRoot + "/") as RootedPath, CaseSensitivity.Insensitive),
    );
});

test("tryRootedPathFromNormalized validates without transforming", () => {
    for (
        const path of [
            "/workspace/src/file.ts",
            "c:/",
            "//server/",
            "file://server/",
            "^/",
            "^/untitled/file.ts",
        ]
    ) {
        assert.strictEqual(tryRootedPathFromNormalized(path), path);
    }
    for (
        const path of [
            "",
            "src/file.ts",
            "/workspace/../src/file.ts",
            "/workspace/",
            String.raw`/workspace\src\file.ts`,
            "/workspace//src/file.ts",
            "c:",
            "//server",
            "file://server",
        ]
    ) {
        assert.strictEqual(tryRootedPathFromNormalized(path), undefined);
    }
});

test("local file URL roots are identified case-insensitively", () => {
    assert.strictEqual(toRootedPath("FILE:///C:/../x.ts", undefined), "FILE:///C:/x.ts");
    assert.strictEqual(
        toRootedPath("file://LOCALHOST/C%3A/../x.ts", undefined),
        "file://LOCALHOST/C%3A/x.ts",
    );
});

test("non-file URIs round-trip through normalized file names", () => {
    assert.strictEqual(
        documentURIToFileName(String.raw`custom:folder/../~ts-uri~/café\file.ts`),
        "^/~ts-uri-v2~/custom/ts-nul-authority/folder/~ts-uri~v2~2e2e~/~ts-uri~/~ts-uri~v2~636166c3a95c66696c65~.ts",
    );
    assert.strictEqual(
        documentURIToFileName("custom:.git/file.ts"),
        "^/~ts-uri-v2~/custom/ts-nul-authority/.git/file.ts",
    );
    assert.strictEqual(
        documentURIToFileName("custom:~ts-uri~v2~dir.js/file.ts?x=1"),
        "^/~ts-uri-v2~/custom/ts-nul-authority/~ts-uri~v2~7e74732d7572697e76327e6469722e6a73~/~ts-uri~v2~66696c65003f783d31~.ts",
    );
    assert.strictEqual(
        documentURIToFileName("custom:c:/dir/file.ts?x=1").substring(
            0,
            documentURIToFileName("custom:c:/dir/file.ts?x=1").lastIndexOf("/"),
        ),
        documentURIToFileName("custom:c:/dir/other.ts").substring(
            0,
            documentURIToFileName("custom:c:/dir/other.ts").lastIndexOf("/"),
        ),
    );

    for (
        const uri of [
            "untitled:folder/../file.ts",
            "vscode-vfs://github/path//file.ts",
            "custom:/path/./file.ts/",
            "custom:",
            "custom:///path",
            "custom://authority",
            "custom://authority/",
            "custom:path/file.ts?rev=a/b#frag/c",
            "custom://authority/path/file.ts#frag/a",
            String.raw`custom:path\file.ts`,
            "custom:.git/file.ts",
            "custom:..hidden/file.ts",
            "custom://~ts-uri~/path",
            "custom://ts-nul-authority/path",
            "custom:~ts-uri-v1~file.ts",
            "custom:~ts-uri~v1~file.ts",
            "custom:~ts-uri~v1~no-path",
            "custom:~ts-uri~v2~file.ts",
            "custom:~ts-uri~v2~no-path",
            "custom://authority/~ts-uri-no-path~v2~~",
            "custom:~ts-uri-spec~v2~666f6f~/file.ts?x=1",
            String.raw`custom:folder/../~ts-uri~/café\file.ts`,
            "custom:name.ts\\",
            "custom:name..ts",
        ]
    ) {
        const fileName = documentURIToFileName(uri);
        assert.strictEqual(tryRootedPathFromNormalized(fileName), fileName);
        assert.strictEqual(fileNameToDocumentURI(fileName), uri);
    }

    for (
        const uri of [
            String.raw`custom:path\file.ts`,
            "custom:~ts-uri~file.ts",
            "custom:~ts-uri-v1~file.ts",
            "custom:~ts-uri~v1~file.ts",
            "custom:~ts-uri~v2~file.ts",
        ]
    ) {
        assert.strictEqual(documentURIToFileName(uri).endsWith(".ts"), true);
    }
    for (const extension of [".d.ts", ".d.mts", ".d.css.ts"]) {
        assert.strictEqual(
            documentURIToFileName("custom:~ts-uri~v2~types" + extension).endsWith(extension),
            true,
        );
    }

    const exceptionalSibling = documentURIToFileName(String.raw`custom:folder/main\file.ts`);
    const ordinarySibling = documentURIToFileName("custom:folder/dep.ts");
    assert.strictEqual(
        exceptionalSibling.substring(0, exceptionalSibling.lastIndexOf("/")),
        ordinarySibling.substring(0, ordinarySibling.lastIndexOf("/")),
    );
    const queryFile = documentURIToFileName("custom:path/file.ts?rev=a/b");
    assert.strictEqual(queryFile.endsWith(".ts"), true);
    assert.strictEqual(
        queryFile.substring(0, queryFile.lastIndexOf("/")),
        documentURIToFileName("custom:path/other.ts").substring(
            0,
            documentURIToFileName("custom:path/other.ts").lastIndexOf("/"),
        ),
    );
    assert.strictEqual(
        fileNameToDocumentURI("^/custom/ts-nul-authority/~ts-uri~2e2e"),
        "custom:~ts-uri~2e2e",
    );
    assert.strictEqual(
        fileNameToDocumentURI("^/custom/ts-nul-authority/~ts-uri~v1~466f6f~.ts"),
        "custom:~ts-uri~v1~466f6f~.ts",
    );
    assert.strictEqual(
        fileNameToDocumentURI("^/~ts-uri-v2~/custom/ts-nul-authority/~ts-uri~v2~ff~"),
        "custom:~ts-uri~v2~ff~",
    );
    assert.notStrictEqual(
        documentURIToFileName("custom:name.ts\\"),
        documentURIToFileName("custom:name..ts"),
    );
});

test("CaseSensitivity exposes explicit checks", () => {
    assert.strictEqual(canonicalize("SRC/file.ts", CaseSensitivity.Sensitive), "SRC/file.ts");
    assert.strictEqual(canonicalize("SRC/file.ts", CaseSensitivity.Insensitive), "src/file.ts");
    assert.strictEqual(canonicalize("/repo/\u0130project/file.ts", CaseSensitivity.Insensitive), "/repo/\u0130project/file.ts");
    assert.strictEqual(canonicalize("/repo/\u212A/file.ts", CaseSensitivity.Insensitive), "/repo/k/file.ts");
    assert.strictEqual(canonicalize("/repo/\u039F\u03A3.ts", CaseSensitivity.Insensitive), "/repo/\u03BF\u03C3.ts");
    assert.strictEqual(isCaseSensitive(CaseSensitivity.Sensitive), true);
    assert.strictEqual(isCaseSensitive(CaseSensitivity.Insensitive), false);
    assert.strictEqual(isCaseInsensitive(CaseSensitivity.Insensitive), true);
    assert.strictEqual(isCaseInsensitive(CaseSensitivity.Sensitive), false);
});

test("rooted path constructors enforce the type lattice", () => {
    const workspace = toRootedDirectoryPath("/workspace", undefined);
    const rootedPath = toRootedPath("src/file.ts", workspace);
    const filePath = toRootedFilePath("src/file.ts", workspace);
    const directoryPath = toRootedDirectoryPath("src", workspace);

    assert.strictEqual(rootedPath, "/workspace/src/file.ts");
    assert.strictEqual(filePath, rootedPath);
    assert.strictEqual(directoryPath, "/workspace/src");
    assert.strictEqual(rootedFilePathFromPath(rootedPath), rootedPath);
    assert.strictEqual(rootedDirectoryPathFromPath(rootedPath), rootedPath);
    assert.strictEqual(pathKey(filePath, CaseSensitivity.Sensitive), filePath);
    assert.strictEqual(toRootedFilePath("^/untitled/file.ts", undefined), "^/untitled/file.ts");
    assert.strictEqual(toRootedFilePath("^/untitled/file.ts", workspace), "^/untitled/file.ts");
    assert.throws(() => toRootedPath("", workspace), /must not be empty/);
    assert.throws(() => toRootedFilePath("", workspace), /must not be empty/);
    assert.throws(() => toRootedDirectoryPath("", workspace), /must not be empty/);
    assert.throws(() => toRootedFilePath("src/file.ts", undefined), /Path is not rooted/);
    for (
        const [input, expected] of [
            ["c:", "c:/"],
            ["//server", "//server/"],
            ["file://server", "file://server/"],
            ["^/~ts-uri-v2~/custom/ts-nul-authority", "^/~ts-uri-v2~/custom/ts-nul-authority/"],
            ["^/~ts-uri-v2~/custom/authority?query", "^/~ts-uri-v2~/custom/authority?query/"],
        ] as const
    ) {
        assert.strictEqual(toRootedPath(input, undefined), expected);
        assert.strictEqual(toRootedFilePath(input, undefined), expected);
        assert.strictEqual(toRootedDirectoryPath(input, undefined), expected);
        assert.strictEqual(tryRootedPathFromNormalized(input), undefined);
        assert.strictEqual(tryRootedPathFromNormalized(expected), expected);
    }
    for (
        const input of [
            "http://server?query#fragment",
            "http://server?x/../y",
            "file:///c:?query/path",
            "http://server/?query/",
        ]
    ) {
        assert.throws(() => toRootedPath(input, undefined), /must not contain a URL query or fragment/);
        assert.strictEqual(tryRootedPathFromNormalized(input), undefined);
    }
    const diskWithSchemeText = toRootedPath("/a://b?x/../y", undefined);
    assert.strictEqual(diskWithSchemeText, "/a:/y");
    assert.strictEqual(tryRootedPathFromNormalized(diskWithSchemeText), diskWithSchemeText);
    const urlDirectory = toRootedDirectoryPath("http://server/base", undefined);
    assert.throws(() => toRootedPath("file.ts?query", urlDirectory), /query or fragment|Path is not rooted/);
    assert.throws(() => toRootedPath("file.ts?query/..", urlDirectory), /must not contain a query or fragment/);
});

test("parseNodeHandleFromCompiler validates serialized fields", () => {
    assert.deepStrictEqual(parseNodeHandleFromCompiler("12.80./workspace/src/file.ts"), {
        index: 12,
        kind: 80,
        path: "/workspace/src/file.ts",
    });

    for (
        const handle of [
            "x.80./workspace/src/file.ts",
            "12.x./workspace/src/file.ts",
            "12.80.",
            "12.80./workspace/../src/file.ts",
        ]
    ) {
        assert.throws(() => parseNodeHandleFromCompiler(handle), /Invalid node handle/);
    }
});

test("tryPathKeyFromCanonical preserves producer canonicalization", () => {
    assert.strictEqual(tryPathKeyFromCanonical("/Workspace/src/File.ts"), "/Workspace/src/File.ts");
    assert.strictEqual(tryPathKeyFromCanonical("/workspace/../src/file.ts"), undefined);
});

test("createVirtualFileSystem normalizes raw input keys once", () => {
    const fs = createVirtualFileSystem({
        "/workspace/src/../file.ts": "content",
    });
    assert.strictEqual(fs.readFile(toRootedFilePath("/workspace/file.ts", undefined)), "content");
    assert.throws(() => createVirtualFileSystem({ "workspace/file.ts": "content" }), /Path is not rooted/);
});
