import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import { uriToWasmMountPoint } from "../src/webMountPoint";

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
    });
});
