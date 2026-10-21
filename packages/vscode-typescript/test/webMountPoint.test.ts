import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import {
    outermostMountPoints,
    uriSegmentToWasmName,
    uriToWasmMountPoint,
    wasmPathToUriText,
} from "../src/webMountPoint";

describe("web WASI mount points", () => {
    test("maps POSIX file workspaces to their absolute paths", () => {
        assert.strictEqual(
            uriToWasmMountPoint({ scheme: "file", authority: "", path: "/work/project" }),
            "/work/project",
        );
    });

    test("maps Windows file workspaces below the WASI root", () => {
        assert.strictEqual(
            uriToWasmMountPoint({ scheme: "file", authority: "", path: "/c:/work/project" }),
            "/c:/work/project",
        );
    });

    test("maps UNC workspaces to UNC paths", () => {
        assert.strictEqual(
            uriToWasmMountPoint({ scheme: "file", authority: "server", path: "/share/project" }),
            "//server/share/project",
        );
    });

    test("maps virtual workspaces to the paths the server derives from document URIs", () => {
        const virtual = (text: string) => uriToWasmMountPoint({ scheme: text.slice(0, text.indexOf(":")), authority: "", path: "", toString: () => text });
        assert.strictEqual(virtual("vscode-test-web://mount/"), "/^/~ts-uri~/vscode-test-web/mount");
        assert.strictEqual(virtual("vscode-vfs://github/microsoft/TypeScript"), "/^/~ts-uri~/vscode-vfs/github/microsoft/TypeScript");
        assert.strictEqual(virtual("memfs:/work/a%5Cb"), "/^/~ts-uri~/memfs/ts-nul-authority/~ts-uri-escape~~/work/a%5Cb");
        assert.strictEqual(virtual("memfs:/work/a\\b/"), "/^/~ts-uri~/memfs/ts-nul-authority/~ts-uri-escape~~/work/~ts-uri-escape~615c62~");
        assert.strictEqual(virtual("memfs:///x"), "/^/~ts-uri~/memfs/~ts-uri-escape~~/x");
        assert.strictEqual(virtual("memfs://c:/work"), "/^/~ts-uri~/memfs/~ts-uri-escape~633a~/work");
        assert.strictEqual(virtual("memfs://x:8080/work"), "/^/~ts-uri~/memfs/x:8080/work");
        assert.strictEqual(virtual("memfs://~ts-uri-escape~fs.example/work"), "/^/~ts-uri~/memfs/~ts-uri-escape~7e74732d7572692d6573636170657e6673~.example/work");
        assert.strictEqual(virtual("memfs://mount/work?ref=main"), "/^/~ts-uri~/memfs/mount/work");
        assert.strictEqual(virtual("memfs://mount/work/#x"), "/^/~ts-uri~/memfs/mount/work");
        assert.strictEqual(virtual("memfs://mount?ref=a/b"), "/^/~ts-uri~/memfs/mount");
        assert.strictEqual(virtual("memfs:/work#a/b"), "/^/~ts-uri~/memfs/ts-nul-authority/~ts-uri-escape~~/work");
    });

    test("maps virtual workspace file names back to their escaped URIs", () => {
        assert.strictEqual(wasmPathToUriText("/^/~ts-uri~/vscode-vfs/github/o/r/a%20b.ts"), "vscode-vfs://github/o/r/a%20b.ts");
        assert.strictEqual(wasmPathToUriText("/^/~ts-uri~/vscode-test-web/mount"), "vscode-test-web://mount/");
        assert.strictEqual(wasmPathToUriText("/^/~ts-uri~/memfs/ts-nul-authority/~ts-uri-escape~~/work/~ts-uri-escape~615c62~.ts"), "memfs:/work/a\\b.ts");
        assert.strictEqual(wasmPathToUriText("/^/~ts-uri~/memfs/~ts-uri-escape~~/x"), "memfs:///x");
        assert.strictEqual(wasmPathToUriText("/^/~ts-uri~/memfs/ts-nul-authority/~ts-uri-escape~~/a\\b"), undefined);
        assert.strictEqual(wasmPathToUriText("/^/~ts-uri~/memfs/ts-nul-authority/~ts-uri-escape~~/~ts-uri-escape~6100713d31~.ts"), undefined);
        assert.strictEqual(wasmPathToUriText("/work/a.ts"), undefined);
    });

    test("drops mounts nested below or equal to another mount", () => {
        const mounts = (...paths: string[]) => outermostMountPoints(paths.map(mountPoint => ({ mountPoint, uri: { scheme: "ts-wasi" } }))).map(mount => mount.mountPoint);
        assert.deepStrictEqual(mounts("/^/~ts-uri~/memfs/host/project/src", "/^/~ts-uri~/memfs/host/project"), ["/^/~ts-uri~/memfs/host/project"]);
        assert.deepStrictEqual(mounts("/^/~ts-uri~/memfs/host/project", "/^/~ts-uri~/memfs/host/project"), ["/^/~ts-uri~/memfs/host/project"]);
        assert.deepStrictEqual(mounts("/work/a", "/work/ab"), ["/work/a", "/work/ab"]);
        assert.deepStrictEqual(mounts("/work", "/"), ["/"]);
        const mixed = outermostMountPoints([{ mountPoint: "/", uri: { scheme: "file" } }, { mountPoint: "/^/~ts-uri~/memfs/host", uri: { scheme: "ts-wasi" } }]);
        assert.strictEqual(mixed.length, 2);
    });

    test("names directory entries as the server names them in document URIs", () => {
        assert.strictEqual(uriSegmentToWasmName("a%20b.ts", true), "a%20b.ts");
        assert.strictEqual(uriSegmentToWasmName("a\\b.d.ts", true), "~ts-uri-escape~615c62~.d.ts");
        assert.strictEqual(uriSegmentToWasmName("a\\b.d", false), "~ts-uri-escape~615c622e64~");
    });
});
