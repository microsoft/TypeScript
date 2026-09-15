import assert from "node:assert/strict";
import test from "node:test";
import { shouldUseWorkspaceTsdk } from "../src/workspaceTsdk";

test("uses a configured tsdk in a trusted workspace by default", () => {
    assert.equal(shouldUseWorkspaceTsdk(true, undefined, false), true);
});

test("does not use a configured tsdk in an untrusted workspace", () => {
    assert.equal(shouldUseWorkspaceTsdk(false, undefined, false), false);
    assert.equal(shouldUseWorkspaceTsdk(false, true, false), false);
});

test("respects existing workspace tsdk preferences", () => {
    assert.equal(shouldUseWorkspaceTsdk(true, false, false), false);
    assert.equal(shouldUseWorkspaceTsdk(true, undefined, true), false);
    assert.equal(shouldUseWorkspaceTsdk(true, true, true), true);
});
