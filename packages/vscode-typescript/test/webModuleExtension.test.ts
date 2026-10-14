import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import { selectWebModuleExtensionUri } from "../src/webModuleExtension";

describe("web module extension", () => {
    test("uses the nightly extension when it contains the WASM payload", async () => {
        assert.strictEqual(
            await selectWebModuleExtensionUri("builtin", "nightly", async uri => uri === "nightly"),
            "nightly",
        );
    });

    test("uses the builtin extension when the nightly does not contain the WASM payload", async () => {
        assert.strictEqual(
            await selectWebModuleExtensionUri("builtin", "nightly", async () => false),
            "builtin",
        );
    });

    test("uses the builtin extension when no nightly is installed", async () => {
        assert.strictEqual(
            await selectWebModuleExtensionUri("builtin", undefined, async () => true),
            "builtin",
        );
    });
});
