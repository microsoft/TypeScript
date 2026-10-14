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

    test("maps virtual workspaces to the path used by DocumentUri.FileName", () => {
        assert.strictEqual(
            uriToWasmMountPoint({ scheme: "vscode-test-web", authority: "mount", path: "/" }),
            "/^/vscode-test-web/mount/",
        );
    });
});
